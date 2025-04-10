'use client'; // Mark as client component because of Typewriter

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect'; // Import Typewriter
import HeroShape from './HeroShape'; // Import the 3D shape

const Hero: React.FC = () => {
  return (
    // Added id="home" here for navigation
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/30 to-black/60 opacity-70"></div>
      {/* Optional second layer for more depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/10 to-transparent opacity-50"></div> */}
      
      {/* Add the 3D Shape Component */}
      <HeroShape />

      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-4 font-mono text-gradient-heading inline-block" // Gradient and inline-block for hover
          whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 250, damping: 10 } }} // Hover effect
        >
          Le Nguyen Gia Hung
        </motion.h1>

      {/* Typewriter Subtitle */}
      <div className="text-xl md:text-2xl text-purple-400 font-mono min-h-[32px] mb-8"> {/* Adjusted margins */}
        <Typewriter
          options={{
            strings: [
              'AI Student',
              'Aspiring Developer',
              'Problem Solver',
              'Machine Learning Enthusiast',
              'Web Innovator',
              'Creative Thinker',
              'Tech Explorer',
              'AI Visionary',
              'Data Wrangler',
              'Software Architect'
            ], 
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
            wrapperClassName: "inline-block", 
            cursorClassName: "text-gray-300",
          }}
        />
      </div>


        {/* Optional: Keep the intro paragraph if desired, or remove */}
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Exploring the intersection of artificial intelligence and human potential. 
          Building intelligent solutions for tomorrow's challenges.
        </motion.p>
      </div>

      {/* Decorative elements - Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Animated Mouse Icon */}
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center items-start pt-1.5">
          <motion.div 
            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{ y: [0, 8, 0] }} // Animate y position
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 