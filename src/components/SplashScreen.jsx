import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  const [showSafar, setShowSafar] = useState(false);

  useEffect(() => {
    // Loop the beacon for a moment, then reveal "Safar" and finish
    const revealTimer = setTimeout(() => setShowSafar(true), 1400);
    const finishTimer = setTimeout(() => onFinish && onFinish(), 2400);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50">
      <div className="relative flex items-center justify-center">
        {/* Central wordmark: Safar slides in from right, then X → SafarX */}
        <div className="flex items-center">
          <AnimatePresence>
            {showSafar && (
              <motion.span
                key="safar"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mr-2 text-5xl font-extrabold tracking-tight text-gray-900"
              >
                Safar
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            <motion.span
              key="x"
              layoutId="brand-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-7xl font-extrabold tracking-tight text-gray-900"
            >
              X
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
