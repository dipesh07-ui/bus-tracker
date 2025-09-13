import React, { useEffect, useState } from "react";

export default function LocationToggle() {
  const [city, setCity] = useState("Detecting...");
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true); // ⬅️ track on/off

  const fetchCity = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "MyBusApp/1.0 (your-email@example.com)", // required by Nominatim
          },
        }
      );
      const data = await res.json();

      if (data?.address) {
        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Unknown"
        );
      } else {
        setCity("Unknown");
      }
    } catch (err) {
      console.error(err);
      setCity("Error");
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setCity("Not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchCity(latitude, longitude);
        setLoading(false);
      },
      () => {
        setCity("Location Off");
        setLoading(false);
      }
    );
  };

  const handleToggle = () => {
    if (enabled) {
      // turn off
      setEnabled(false);
      setCity("Location Off");
    } else {
      // turn on
      setEnabled(true);
      detectLocation();
    }
  };

  useEffect(() => {
    if (enabled) detectLocation();
  }, [enabled]);

  return (
    <button
      onClick={handleToggle}
      className="bg-yellow-200 text-gray-800 
                 px-3 py-1 rounded-lg shadow text-sm font-medium 
                 hover:bg-yellow-300 transition"
    >
      📍 {loading ? "..." : city}
    </button>
  );
}
