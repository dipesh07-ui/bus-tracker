import React from "react";
import { motion } from "framer-motion";
import LocationToggle from "../components/LocationToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-yellow-100 via-white to-yellow-50 shadow-md">
      {/* Left side: logo + app name */}
      <div className="flex items-center">
        <motion.div
          layoutId="bus-logo"
          className="text-3xl bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        >
          🚌
        </motion.div>
        <h1 className="ml-3 font-bold text-gray-800 text-lg tracking-wide">
          MyBusApp
        </h1>
      </div>

      {/* Right side: location toggle */}
     <div className="flex-shrink-0">
  <LocationToggle />
</div>

    </nav>
  );
}
