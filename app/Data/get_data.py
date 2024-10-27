import os
import base64
import requests
import csv
import logging
import time
from dotenv import load_dotenv
from typing import List, Dict, Any

# Configure logging for your script
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Suppress requests and urllib3 internal logging below WARNING level
logging.getLogger('requests').setLevel(logging.WARNING)
logging.getLogger('urllib3').setLevel(logging.WARNING)

class SpotifyDataManager:
    def __init__(self, client_id: str, client_secret: str):
        logging.debug("Initializing SpotifyDataManager")
        
        self.client_id = client_id
        self.client_secret = client_secret
        self.base_url = 'https://api.spotify.com/v1'
        
        try:
            # Attempt to get the access token
            self.access_token = self.get_access_token()
            self.headers = {
                'Authorization': f'Bearer {self.access_token}'
            }
            logging.debug("SpotifyDataManager initialized successfully")
        
        except Exception as e:
            # Handle initialization failure due to token retrieval issues
            logging.error(f"Failed to initialize SpotifyDataManager: {e}")
            self.access_token = None
            self.headers = {}

    def get_access_token(self) -> str:
        """
        Retrieves access token for Spotify API
        """
        logging.debug("Getting access token")
        
        auth_str = f'{self.client_id}:{self.client_secret}'
        b64_auth_str = base64.b64encode(auth_str.encode()).decode()
        url = 'https://accounts.spotify.com/api/token'
        headers = {'Authorization': f'Basic {b64_auth_str}'}
        data = {'grant_type': 'client_credentials'}
        
        try:
            response = requests.post(url, headers=headers, data=data)
            response.raise_for_status()
            
            token_info = response.json()
            access_token = token_info.get('access_token')
            
            if not access_token:
                raise KeyError("Access token not found in the response")

            logging.debug("Access token retrieved successfully")
            return access_token

        except (requests.RequestException, KeyError) as e:
            logging.error(f"Failed to retrieve access token: {e}")
            raise Exception(f"Access token retrieval failed: {e}")

        except Exception as e:
            logging.error(f"Unexpected error: {e}")
            raise

    def refresh_access_token(self):
        """
        Refreshes the access token when it has expired or is invalid.
        """
        logging.info("Refreshing access token")
        self.access_token = self.get_access_token()  # Get a new access token
        self.headers = {
            'Authorization': f'Bearer {self.access_token}'
        }

    def make_request(self, url: str) -> Dict[str, Any]:
        """
        Helper method to make API requests to Spotify, handle token expiration,
        rate limits, and catch common exceptions.
        
        Args:
            url (str): The URL for the Spotify API request.
        
        Returns:
            dict: The JSON response from the API if successful, otherwise an empty dictionary.
        """
        try:
            response = requests.get(url, headers=self.headers)
            
            # If the token has expired, refresh the token and retry the request
            if response.status_code == 401:
                logging.info("Token expired or invalid, refreshing access token...")
                self.refresh_access_token()
                response = requests.get(url, headers=self.headers)  # Retry with new token
            
            # If rate-limited, handle 429 Too Many Requests response
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 1))  # Get retry delay from headers
                logging.warning(f"Rate limit hit. Retrying after {retry_after} seconds.")
                time.sleep(retry_after)
                return self.make_request(url)  # Retry request after waiting
            
            response.raise_for_status()  # Raise for bad HTTP responses
            
            return response.json()  # Return the JSON response
        
        except requests.RequestException as e:
            logging.error(f"Request failed: {e}")
            return {}
        
        except ValueError:
            logging.error("Failed to decode JSON response.")
            return {}
        
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            return {}

    def get_categories(self) -> List[Dict[str, Any]]:
        """
        Fetches Spotify categories (genres) from the API.
        
        Returns:
            A list of category dictionaries, or an empty list if the request fails or no categories are found.
        """
        logging.debug("Fetching categories from Spotify API")
        url = f'{self.base_url}/browse/categories'
        
        # Use the centralized request method to handle the API call
        json_response = self.make_request(url)
        
        # Extract categories from the response
        categories = json_response.get('categories', {}).get('items', [])
        
        if not categories:
            logging.warning("No categories found in the API response")
        
        logging.debug(f"Categories retrieved: {categories}")
        return categories

    def get_playlists_in_category(self, category_id: str) -> List[Dict[str, Any]]:
        """
        Fetches playlists for a given Spotify category.
        
        Args:
            category_id (str): The Spotify ID of the category.
        
        Returns:
            A list of playlist dictionaries, or an empty list if the request fails or no playlists are found.
        """
        logging.debug(f"Fetching playlists for category {category_id}")
        url = f'{self.base_url}/browse/categories/{category_id}/playlists'
        
        # Make the request using the centralized helper
        json_response = self.make_request(url)
        
        playlists = json_response.get('playlists', {}).get('items', [])
        
        if not playlists:
            logging.warning(f"No playlists found for category {category_id}")
        
        return playlists



    def get_tracks_from_playlist(self, playlist_id: str) -> List[str]:
        """
        Fetches tracks from a given Spotify playlist and extracts the unique artist IDs.
        
        Args:
            playlist_id (str): The Spotify ID of the playlist.
        
        Returns:
            A list of unique artist IDs from the playlist.
        """
        logging.debug(f"Fetching tracks for playlist {playlist_id}")
        url = f'{self.base_url}/playlists/{playlist_id}/tracks'
        
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            
            # Extract artist IDs from the track list
            tracks = response.json().get('items', [])
            artist_ids = []
            
            if not tracks:
                logging.warning(f"No tracks found for playlist {playlist_id}.")
                return []
            
            for track in tracks:
                # Each track can have multiple artists; get all artist IDs
                artists = track.get('track', {}).get('artists', [])
                for artist in artists:
                    artist_id = artist.get('id')
                    if artist_id and artist_id not in artist_ids:
                        artist_ids.append(artist_id)
            
            logging.debug(f"Artist IDs extracted from playlist {playlist_id}: {artist_ids}")
            return artist_ids
        
        except requests.RequestException as e:
            logging.error(f"Error fetching tracks from playlist {playlist_id}: {e}")
            return []
        
    def get_artist_details(self, artist_id: str) -> Dict[str, Any]:
        """
        Fetches detailed information for a given artist by their Spotify ID.
        
        Args:
            artist_id (str): The Spotify ID of the artist.
        
        Returns:
            A dictionary with artist details (for CSV), or an empty dictionary if the request fails.
        """
        logging.debug(f"Fetching details for artist {artist_id}")
        artist_details_url = f'{self.base_url}/artists/{artist_id}'
        
        # Use the centralized request method to handle the API call
        artist_data = self.make_request(artist_details_url)
        
        if not artist_data:
            logging.warning(f"No artist data found for {artist_id}.")
            return {}
        
        # Parse artist details
        artist_details = {
            'artist_name': artist_data.get('name', 'Unknown Artist'),
            'genre': ', '.join(artist_data.get('genres', [])),
            'popularity': artist_data.get('popularity', 0),
            'followers': artist_data.get('followers', {}).get('total', 0),
            'external_url': artist_data.get('external_urls', {}).get('spotify', '')
        }
        
        logging.debug(f"Artist details retrieved for {artist_id}: {artist_details}")
        return artist_details

        
    def get_playlist_artists(self, playlist_id: str) -> List[Dict[str, Any]]:
        """
        Fetches artists from a given Spotify playlist by first retrieving tracks,
        and then gathering artist details for each track.
        
        Args:
            playlist_id (str): The Spotify ID of the playlist.
        
        Returns:
            A list of artist dictionaries, or an empty list if the request fails or no artists are found.
        """
        logging.debug(f"Fetching artists for playlist {playlist_id}")
        url = f'{self.base_url}/playlists/{playlist_id}/tracks'
        
        # Make the request using the centralized helper
        json_response = self.make_request(url)
        
        tracks = json_response.get('items', [])
        
        if not tracks:
            logging.warning(f"No tracks found for playlist {playlist_id}.")
            return []
        
        artists = []
        for track in tracks:
            artist = track.get('track', {}).get('artists', [{}])[0]
            artist_id = artist.get('id')
            if artist_id:
                artist_details = self.get_artist_details(artist_id)
                if artist_details:
                    artists.append(artist_details)
        
        return artists


    def read_existing_entries(self, filename: str) -> set:
        """
        Read existing entries from the CSV file to avoid duplicates.
        
        Args:
            filename (str): Name of the CSV file.
        
        Returns:
            set: Set of existing entries, where each entry is a tuple of (artist_name, genre, popularity, followers, external_url).
        """
        logging.debug(f"Reading existing entries from {filename}")
        existing_entries = set()
        
        try:
            with open(filename, mode='r', newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                # Check if all expected columns are present in the CSV
                expected_columns = {'artist_name', 'genre', 'popularity', 'followers', 'external_url'}
                
                if not expected_columns.issubset(reader.fieldnames):
                    logging.error(f"Missing columns in the CSV file. Expected columns: {expected_columns}")
                    return existing_entries
                
                # Read and store existing entries
                for row in reader:
                    try:
                        entry = (
                            row['artist_name'],
                            row['genre'],
                            row['popularity'],
                            row['followers'],
                            row['external_url']
                        )
                        existing_entries.add(entry)
                    except KeyError as e:
                        logging.warning(f"Missing expected field {e} in a row. Skipping row: {row}")
                
                logging.debug(f"Successfully read {len(existing_entries)} existing entries from {filename}")
        
        except FileNotFoundError:
            logging.info(f"File {filename} not found. A new file will be created.")
        
        except Exception as e:
            logging.error(f"Error reading existing entries from CSV: {e}")
        
        return existing_entries

    def fetch_and_save_spotify_data(self, output_file='spotify_data.csv', data_point_limit=10000):
        """
        Fetches data from Spotify, checks for duplicates, and saves artist data to a CSV incrementally.
        Stops automatically after collecting the specified number of data points.
        
        Args:
            output_file (str): Name of the output CSV file.
            data_point_limit (int): The maximum number of data points to collect.
        """
        logging.debug("Starting fetch_and_save_spotify_data")
        
        try:
            # Fetch all categories
            categories = self.get_categories()
            
            # Define the CSV headers
            headers = ['artist_name', 'genre', 'popularity', 'followers', 'external_url']
            
            # Read existing entries to avoid duplicates
            existing_entries = self.read_existing_entries(output_file)
            
            # Open CSV file in append mode
            with open(output_file, mode='a', newline='', encoding='utf-8') as file:
                writer = csv.DictWriter(file, fieldnames=headers)
                
                # Write headers if the file is empty
                if file.tell() == 0:
                    writer.writeheader()
                
                data_points_collected = len(existing_entries)
                
                # Loop through categories
                for category in categories:
                    category_id = category.get('id')
                    category_name = category.get('name')
                    
                    if not category_id or not category_name:
                        logging.warning("Category ID or name is missing, skipping.")
                        continue
                    
                    # Fetch playlists in the category
                    playlists = self.get_playlists_in_category(category_id)
                    
                    for playlist in playlists:
                        playlist_id = playlist.get('id')
                        playlist_name = playlist.get('name')
                        
                        if not playlist_id or not playlist_name:
                            logging.warning(f"Playlist ID or name is missing for playlist in category {category_name}, skipping.")
                            continue
                        
                        # Fetch artists from the playlist
                        artists = self.get_playlist_artists(playlist_id)
                        
                        for artist in artists:
                            if not artist:
                                logging.warning(f"Encountered None artist in playlist {playlist_name}, skipping.")
                                continue
                            
                            artist_data = {
                                'artist_name': artist.get('artist_name', 'Unknown Artist'),
                                'genre': artist.get('genre', ''),
                                'popularity': artist.get('popularity', 0),
                                'followers': artist.get('followers', 0),
                                'external_url': artist.get('external_url', '')
                            }
                            
                            # Create a tuple to represent the artist entry
                            entry = (artist_data['artist_name'], artist_data['genre'], artist_data['popularity'], artist_data['followers'], artist_data['external_url'])
                            
                            # Check for duplicates and write the artist to the CSV if it's new
                            if entry not in existing_entries:
                                writer.writerow(artist_data)
                                existing_entries.add(entry)
                                data_points_collected += 1
                                logging.info(f"Artist {artist_data['artist_name']} written to CSV.")
                                
                                # Add a delay to avoid rate limits
                                time.sleep(0.3)  # 300 milliseconds delay
                                
                                # Stop collecting if the data point limit is reached
                                if data_points_collected >= data_point_limit:
                                    logging.info(f"Data point limit of {data_point_limit} reached. Stopping data collection.")
                                    return
                            else:
                                logging.info(f"Duplicate entry for artist {artist_data['artist_name']} skipped.")
        
        except Exception as e:
            logging.error(f"An error occurred during data collection: {e}")

# Package everything and run script directly (for testing)
def main():
    # get credentials from .env file
    load_dotenv()
    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
    
    logging.debug(f"Client ID: {client_id}")
    logging.debug(f"Client Secret: {client_secret}")

    # Initialize the SpotifyDataManager
    spotify_manager = SpotifyDataManager(client_id=client_id, client_secret=client_secret)
    
    # Fetch and save data to a CSV file
    spotify_manager.fetch_and_save_spotify_data()

if __name__ == "__main__":
    main()