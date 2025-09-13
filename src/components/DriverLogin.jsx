import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { drivers } from "../data/dummydata";

export default function DriverLogin() {
  const [driverId, setDriverId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // convert inputs to string for safe comparison
    const driver = drivers.find(
      (d) => d.driverId.toString() === driverId.trim() && d.pin.toString() === pin.trim()
    );

    if (driver) {
      // save login info
      localStorage.setItem("driverId", driver.driverId);
      navigate("/driver");
    } else {
      setError("Invalid Driver ID or PIN");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Driver Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
