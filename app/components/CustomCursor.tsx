'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  
  // Main cursor dot position (instant)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHoveringInteractive(true);
    const handleMouseLeave = () => setIsHoveringInteractive(false);

    window.addEventListener('mousemove', handleMouseMove);

    // Add/Remove listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [data-interactive]'
    );
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  const mainCursorSize = isHoveringInteractive ? 32 : 16;
  const trailCursorSize = isHoveringInteractive ? 0 : 12; // Trail disappears when main is big
  const trailOpacity = isHoveringInteractive ? 0 : 0.5;  // Trail disappears when main is big

  // Simple transition for the trail to lag slightly
  const trailTransition = {
    type: "spring",
    damping: 20,
    stiffness: 150,
    mass: 0.5
  };

  return (
    <>
      {/* Trailing Dot - Re-added with simple transition */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full bg-purple-500 mix-blend-difference"
        style={{
          translateX: cursorX, // Follows main cursor value
          translateY: cursorY,
          left: -trailCursorSize / 2, 
          top: -trailCursorSize / 2,
          // Animate size and opacity directly
        }}
        animate={{
          width: trailCursorSize,
          height: trailCursorSize,
          opacity: trailOpacity
        }}
        transition={trailTransition} // Apply the lagging transition
      />
      
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-in-out"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -mainCursorSize / 2, // Use main cursor size
          top: -mainCursorSize / 2,
        }}
        animate={{
          width: mainCursorSize,
          height: mainCursorSize,
        }}
      />
    </>
  );
};

export default CustomCursor; 