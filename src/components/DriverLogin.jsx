import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { drivers } from "../data/dummydata";
import BackButton from "./BackButton";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
      {/* Header with back button */}
      <div className="p-4 sm:p-6">
        <BackButton to="/" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl sm:text-3xl">👮</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Driver Login</h2>
            <p className="text-gray-600 text-sm sm:text-base">Enter your credentials to access driver dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver ID
              </label>
              <input
                type="text"
                placeholder="Enter your Driver ID"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors text-sm sm:text-base"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 sm:py-4 px-4 rounded-lg transition-colors text-sm sm:text-base shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚌 Login to Dashboard
            </motion.button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2 font-medium">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Driver ID: D01, PIN: 1111</p>
              <p>Driver ID: D02, PIN: 2222</p>
              <p>Driver ID: D03, PIN: 3333</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
