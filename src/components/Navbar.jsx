import React from "react";
import { motion } from "framer-motion";
import LocationToggle from "../components/LocationToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-100 via-white to-yellow-50 shadow-md">
      {/* Left side: brand text with shared layout from splash */}
      <div className="flex items-center">
        <motion.span
          layoutId="brand-logo"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900"
        >
          SafarX
        </motion.span>
      </div>

      {/* Right side: location toggle */}
      <div className="flex-shrink-0">
        <LocationToggle />
      </div>
    </nav>
  );
}
