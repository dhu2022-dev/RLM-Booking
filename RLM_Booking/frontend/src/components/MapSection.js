import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapSection() {
    return (
        <div style={{ height: "400px", marginTop: "20px" }}>
            <MapContainer center={[42.3601, -71.0589]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </div>
    );
}

export default MapSection;
