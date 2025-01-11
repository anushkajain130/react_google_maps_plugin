import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const App = () => {
  const API_KEY = "AIzaSyAFZxcmv6EjDvF5QIxHjqqLNo6q2Di9T0k"
  
  // Sample coordinates
  const coordinates = [
    { id: 1, latitude: 40.73061, longitude: -73.935242 }, // NYC
    { id: 2, latitude: 34.052235, longitude: -118.243683 }, // LA
  ];

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({});

  // Fetch city and state info
  const fetchCityState = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const city = addressComponents.find((comp) =>
        comp.types.includes("locality")
      )?.long_name;
      const state = addressComponents.find((comp) =>
        comp.types.includes("administrative_area_level_1")
      )?.long_name;

      setMarkerInfo({ city, state });
    }
  };

  // Handle marker click
  const handleMarkerClick = (marker) => {
    fetchCityState(marker.latitude, marker.longitude);
    setSelectedMarker(marker);
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: 39.8283, lng: -98.5795 }} // Center of USA
        zoom={4}
      >
        {coordinates.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && markerInfo.city && markerInfo.state && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{markerInfo.city}, {markerInfo.state}</h3>
              <p>Latitude: {selectedMarker.latitude}</p>
              <p>Longitude: {selectedMarker.longitude}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;
