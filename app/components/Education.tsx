'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const Education: React.FC = () => {
  return (
    <section className="py-24 text-white" id="education">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center font-mono relative bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          Education
          {/* Underline removed/commented as it might interfere with gradient */}
          {/* <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-1 w-20 bg-purple-500"></span> */}
        </h2>

        <motion.div 
          className="max-w-2xl mx-auto bg-gray-900/30 border border-gray-800/50 rounded-lg p-8 shadow-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <FaGraduationCap className="text-purple-400" size={40} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-100 mb-2 font-mono">FPT University</h3>
          <p className="text-purple-300 font-medium mb-1">Ho Chi Minh City Campus</p>
          <p className="text-gray-400 text-sm mb-4">Bachelor of Science in Artificial Intelligence</p>
          <p className="text-gray-500 text-xs font-mono tracking-widest">2023 – 2027 (Expected)</p>
          {/* Add relevant coursework or specialization here if desired */}
        </motion.div>
      </div>
    </section>
  );
};

export default Education; 