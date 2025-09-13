import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { drivers, buses } from "../data/dummydata";

export default function DriverPage() {
  const navigate = useNavigate();
  const driverId = localStorage.getItem("driverId");
  const driverInfo = drivers.find((d) => d.driverId.toString() === driverId);
  const myBus = buses.find((b) => b.id === driverInfo?.busId);

  // ====== State placeholders ======
  const [status, setStatus] = useState("Not Started"); // Trip status
  const [stops, setStops] = useState([]); // Upcoming stops
  const [alerts, setAlerts] = useState([]); // Traffic / system alerts
  const [location, setLocation] = useState({ lat: null, lng: null }); // Bus GPS
  const [time, setTime] = useState(new Date()); // Live clock

  // ====== Redirect if unauthorized ======
  useEffect(() => {
    if (!driverInfo || !myBus) navigate("/");
  }, [driverInfo, myBus, navigate]);

  // ====== Live clock ======
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ====== Fetch upcoming stops (dummy API) ======
  useEffect(() => {
    async function fetchStops() {
      // Replace this with your backend API later
      const data = await new Promise((res) =>
        setTimeout(() => res(["Main Street", "Central Park", "Downtown"]), 500)
      );
      setStops(data);
    }
    if (myBus) fetchStops();
  }, [myBus]);

  // ====== Fetch alerts (dummy API / websocket later) ======
  useEffect(() => {
    async function fetchAlerts() {
      // Replace this with WebSocket or backend polling later
      const data = await new Promise((res) =>
        setTimeout(
          () =>
            res([
              { type: "traffic", message: "Delay on Main Street" },
              { type: "weather", message: "Heavy rain expected" },
            ]),
          500
        )
      );
      setAlerts(data);
    }
    fetchAlerts();
  }, []);

  // ====== Update driver location (placeholder) ======
  useEffect(() => {
    let locationInterval;
    if (status === "On Trip") {
      locationInterval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            // Here you would POST to backend: /driver/:driverId/location
          });
        }
      }, 5000); // every 5 seconds
    }
    return () => clearInterval(locationInterval);
  }, [status]);

  // ====== Trip control functions ======
  const handleStartTrip = async () => {
    setStatus("On Trip");
    // TODO: send POST /driver/:driverId/start-trip to backend
  };

  const handleEndTrip = async () => {
    setStatus("Completed");
    // TODO: send POST /driver/:driverId/end-trip to backend
  };

  const handleLogout = () => {
    localStorage.removeItem("driverId");
    navigate("/");
  };

  if (!driverInfo || !myBus) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center text-2xl">
            👨‍✈️
          </div>
          <div>
            <h1 className="text-xl font-bold">{driverInfo.name}</h1>
            <p className="text-gray-600">Assigned Bus: {myBus.route}</p>
          </div>
        </div>

        {/* Trip Status + Clock */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === "On Trip"
                ? "bg-green-100 text-green-700"
                : status === "Completed"
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status}
          </span>
          <span className="text-gray-500 text-sm">{time.toLocaleTimeString()}</span>
        </div>

        {/* Start / End Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleStartTrip}
            disabled={status === "On Trip"}
            className={`flex-1 px-4 py-2 rounded text-white ${
              status === "On Trip"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            ▶ Start Trip
          </button>
          <button
            onClick={handleEndTrip}
            disabled={status === "Completed" || status === "Not Started"}
            className={`flex-1 px-4 py-2 rounded text-white ${
              status === "Completed" || status === "Not Started"
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            ⏹ End Trip
          </button>
        </div>

        {/* Upcoming Stops */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Upcoming Stops</h2>
          <ul className="space-y-1 text-gray-600 text-sm list-disc pl-5">
            {stops.map((stop, idx) => (
              <li key={idx}>{stop}</li>
            ))}
          </ul>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-700 mb-6">
            {alerts.map((alert, idx) => (
              <div key={idx}>⚠️ {alert.message}</div>
            ))}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
