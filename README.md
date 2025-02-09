# Artist Recommendation System Based on Venue Data

This application provides a comprehensive system for concert venues to recommend, analyze, and book artists based on venue size, audience preferences, and historical performance data. It also includes powerful tools for event forecasting, pricing optimization, and marketing integration.

---

## Important Resources

- Google Drive: <https://drive.google.com/drive/folders/1MpyLWpM4JhKMNEjcDjwFERCpVFMemt2g?usp=sharing>
- Documentation Site: <https://dhu2022-dev.github.io/RLM-Booking>

---

## Starting the Site Locally (React + Django):
1. Ensure you have django installed in your python environment
2. Decide if you want to run the React frontend in production environment, or for development
3. If for production: run ```npm run build``` in the frontend folder. This builds the React site.
4. If for development: run ```npm start``` if you want to see instant changes in React. This can be accessed at localhost:3000
5. Run ```python manage.py runserver``` in the RLM-Booking folder. This hosts the backend at localhost:8000


## Features

### 1. Artist Recommendation System Based on Venue Data

- **Artist Match to Venue Size**: Recommends artists whose follower count or past concert attendance fits the venue's capacity.
- **Genre Fit**: Matches artists to genres popular with the venue’s typical audience or demographic.
- **Audience Reach Analysis**: Projects ticket sales based on Spotify followers, social media engagement, and past performance data.
- **Venue Budget Matching**: Recommends artists that fit within the venue's budget by estimating performance fees or ticket sales potential.

### 2. Historical Concert Performance and Analytics

- **Ticket Sales History**: Displays past ticket sales data for similar venues or events where the artist performed.
- **Profitability Forecast**: Provides estimated revenue and profitability based on ticket price, expected sales, and artist popularity.
- **Event Demand Metrics**: Incorporates data like search volume or fan engagement to gauge demand for an artist in the local area.

### 3. Artist Popularity and Trend Monitoring

- **Trend Analysis**: Tracks whether an artist's popularity is rising or falling based on streaming numbers, social media followers, or other metrics.
- **Local vs. Global Popularity**: Highlights whether an artist is more popular locally or globally to help determine their fit for your venue.
- **Up-and-Coming Artists**: Identifies emerging artists growing in popularity who have yet to reach superstar status, helping venues book talent before prices rise.

### 4. Event Success Predictions

- **Ticket Sale Predictions**: Predicts how many tickets an artist is likely to sell based on historical data and current popularity.
- **Fan Engagement Data**: Leverages fan interaction metrics like Spotify listening data, social media engagement, or concert reviews to estimate the energy or success of the event.
- **Competition Analysis**: Shows if other venues in the region are booking similar artists around the same date, which could affect ticket sales.

### 5. Ticket Price Optimization

- **Dynamic Pricing Suggestions**: Suggests optimal ticket pricing based on artist demand, historical sales, and the artist's drawing power at different price points.
- **Price-to-Sales Correlation**: Displays historical trends showing how different ticket prices affected sales for similar artists or events.

### 6. Artist Availability and Scheduling

- **Tour Dates Integration**: Displays available time slots when the artist is not on tour or performing near your region, facilitating booking planning.
- **Booking Management**: Provides a booking calendar to schedule events and manage booking offers directly from the app.

### 7. Marketing and Promotion Tools

- **Audience Segmentation**: Provides insights into which audience segments (age, location, music preferences) are most likely to attend events featuring the artist, helping target the right demographics.
- **Social Media Integration**: Allows venues to post directly to social media channels to promote upcoming events and artist announcements.
- **Email and SMS Campaign Suggestions**: Generates email and text marketing campaigns based on artist and target audience data, recommending when to start promotion and what messages to use.

### 8. Event Dashboard and Reports

- **Live Event Dashboard**: Offers a real-time dashboard showing ticket sales, projected revenue, marketing campaign performance, and other key metrics leading up to the event.
- **Post-Event Reports**: Provides detailed post-event reports summarizing sales, audience demographics, social media engagement, and other success metrics.
- **Fan Feedback**: Incorporates post-event surveys or reviews from attendees to assess how successful the artist’s performance was and improve future bookings.

### 9. Collaboration with Other Venues

- **Artist Sharing Network**: Shares booking insights with other medium-sized venues to discover how well an artist performed and exchange talent recommendations.
- **Artist Availability Alerts**: Sends notifications when an artist popular with your audience becomes available for booking in your region.

### 10. Integration with Ticketing Platforms

- **Ticketmaster and Eventbrite Integration**: Syncs the app with popular ticketing platforms to automatically pull in ticket sales data and post new events.
- **Ticket Sale Progress Monitoring**: Allows venues to monitor ticket sales from within the app, indicating when it's time to boost marketing or adjust pricing.

---

## To-Dos

- **Safety Checks**: Implement AWS safety checks with proper permissions, table limiting, and access key protection via security manager.
- **Live Location**: Add live location support using GeoLocation.
- **UI Enhancements**: Add more UI elements like loading buttons, 'load more' options, and additional styling.

---

## Tools and Libraries

- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn, Plotly
- **Machine Learning**: Scikit-Learn, XGBoost, LightGBM, TensorFlow, Keras, PyTorch
- **Deployment**: Flask, FastAPI, Docker, AWS Lambda
