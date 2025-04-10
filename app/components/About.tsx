'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import { Parallax } from 'react-scroll-parallax';

const About: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Stagger delay for each paragraph
        duration: 0.6,
      },
    }),
  };

  return (
    <section className="py-24 text-white overflow-hidden" id="about">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center font-mono relative bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500"
          initial={{ opacity: 0, y: -20, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          About Me
          {/* Optional: Keep or remove the underline span based on preference */}
          {/* <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-1 w-20 bg-gradient-to-r from-purple-500 to-purple-700"></span> */}
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 md:gap-16">
          <Parallax speed={-10} className="flex-shrink-0 flex items-center">
            <motion.div 
              className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden border-4 border-purple-600 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-gray-900/50 flex items-center justify-center">
                {/* Placeholder SVG Icon */}
                <svg className="w-1/2 h-1/2 text-purple-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
            </motion.div>
          </Parallax>

          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-3xl mx-auto w-full text-center md:text-left">
              <motion.p 
                className="text-lg mb-6 text-gray-300 leading-relaxed"
                custom={0}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                I'm an undergraduate student at FPT University, Ho Chi Minh City, specializing in Artificial Intelligence. 
                My passion lies in developing intelligent systems and exploring the potential of AI to solve real-world problems.
              </motion.p>
              <motion.p 
                className="text-lg mb-8 text-gray-300 leading-relaxed"
                custom={1}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                With a strong foundation in machine learning, deep learning, and software development, 
                I'm constantly seeking new challenges and opportunities to grow in the field of AI.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                custom={2}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Enhanced Buttons with Shine */}
                <motion.button 
                  className="btn-shine flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-purple-800 hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                  // onClick={() => window.open('/path/to/your/cv.pdf', '_blank')} // Add actual CV link
                >
                  <FaDownload />
                  Download CV
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-purple-500 text-purple-400 font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-500/10 hover:text-purple-300 hover:shadow-md"
                  whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 300, damping: 10 } }}
                  whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} // Scrolls to contact section
                >
                  <FaEnvelope />
                  Contact Me
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 