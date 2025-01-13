import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect } from "react";
const App = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//  console.log(API_KEY)
  const [coordinates, setCoordinates] = useState([
    { id: 1, latitude: 34.052235, longitude: -118.243683 }, // LA
    { id: 2, latitude: 41.8781, longitude: -87.6298 },      // Chicago
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({});
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");

  useEffect(() => {
    console.log("Updated coordinates:", coordinates);
  }, [coordinates]);
  

  const fetchCityState = async (latitude, longitude) => {
  
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((comp) => comp.types.includes("locality"))?.long_name;
        const state = addressComponents.find((comp) => comp.types.includes("administrative_area_level_1"))?.long_name;

        setMarkerInfo({ city, state });
      } else {
        setMarkerInfo({ city: "Unknown", state: "Unknown" });
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      setMarkerInfo({ city: "Error", state: "Error" });
    }
  };

  const handleMarkerClick = (marker) => {
    fetchCityState(marker.latitude, marker.longitude);
    setSelectedMarker(marker);
  };

  const handleAddCoordinate = () => {
    if (!newLat || !newLng || isNaN(parseFloat(newLat)) || isNaN(parseFloat(newLng))) {
      alert("Please enter valid numeric values for latitude and longitude.");
      return;
    }
  
    // Safely update the state
    setCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      {
        id: prevCoordinates.length + 1,
        latitude: parseFloat(newLat),
        longitude: parseFloat(newLng),
      },
    ]);
  
    // Reset inputs and close modal
    setNewLat("");
    setNewLng("");
    setOpenModal(false);
    // console.log(coordinates)
    // console.log(coordinates)
  };
  

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          key = {coordinates.length}
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 39.8283, lng: -98.5795 }}
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

      <div>
        <button onClick={() => setOpenModal(true)}>Add Coordinate</button>
        {openModal && (
          <div style={{ padding: "10px", backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}>
            <input
              type="text"
              placeholder="Latitude"
              value={newLat}
              onChange={(e) => setNewLat(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={newLng}
              onChange={(e) => setNewLng(e.target.value)}
            />
            <button onClick={handleAddCoordinate}>Add</button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
