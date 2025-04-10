'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // Using react-icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="py-8 text-gray-400 mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <motion.a
            href="https://linkedin.com/in/le-nguyen-gia-hung/" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/hei1sme" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/hei.isme/" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram size={24} />
          </motion.a>
        </div>
        <p className="text-sm font-mono">
          &copy; {currentYear} Le Nguyen Gia Hung (hei). All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js, TailwindCSS, and Framer Motion.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer; 