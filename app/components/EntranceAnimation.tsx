'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntranceAnimationProps {
  onAnimationComplete: () => void;
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({ onAnimationComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Start fade out slightly after loading bar finishes
      const visibilityTimer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete(); // Notify parent component
      }, 500); // Delay before fade-out starts
      return () => clearTimeout(visibilityTimer);
    }, 2000); // Simulate loading time

    return () => clearTimeout(loadingTimer);
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4 font-mono">hei.</h1>
          {isLoading && (
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 animate-loading"></div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceAnimation; 