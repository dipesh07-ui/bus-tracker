import React, { useState } from "react";

export default function LocationToggle() {
  const [city, setCity] = useState("Click to detect");
  const [loading, setLoading] = useState(false);

  const fetchCity = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "BusTracker/1.0 (contact@bustracker.com)", // required by Nominatim
          },
        }
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      if (data?.address) {
        const cityName = data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          "Unknown";
        setCity(cityName);
      } else {
        setCity("Unknown location");
      }
    } catch (err) {
      console.error("Location fetch error:", err);
      setCity("Network error");
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setCity("Not supported");
      setLoading(false);
      return;
    }

    setLoading(true);
    setCity("Detecting...");
    
    // Clear any previous location data
    setCity("Detecting...");
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(`Location detected: ${latitude}, ${longitude}`);
        fetchCity(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Location error";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Request timeout";
            break;
          default:
            errorMessage = "Location error";
            break;
        }
        
        setCity(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 0 // Always get fresh location
      }
    );
  };

  const handleClick = () => {
    // Always detect location on every click
    if (loading) return; // Prevent multiple simultaneous requests
    detectLocation();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-200 text-gray-800 
                 px-2 sm:px-3 py-1 rounded-lg shadow text-xs sm:text-sm font-medium 
                 hover:bg-yellow-300 transition-colors disabled:opacity-50"
      disabled={loading}
      title="Click to detect location"
    >
      <span className="hidden sm:inline">📍 </span>
      <span className="sm:hidden">📍</span>
      {loading ? "Detecting..." : city}
    </button>
  );
}
