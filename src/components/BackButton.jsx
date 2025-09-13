import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackButton({ to = "/", className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-lg">←</span>
      <span className="text-sm font-medium">Back</span>
    </motion.button>
  );
}
