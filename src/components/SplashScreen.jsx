import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-400">
      <AnimatePresence>
        <motion.div
          layoutId="bus-logo"   // 🔑 shared id
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl"
        >
          🚌
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
