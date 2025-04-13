'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 text-white overflow-hidden w-full flex justify-center min-h-screen" id="about">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-left font-mono relative bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500 pl-4 border-l-4 border-purple-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          ./AboutMe.tsx
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 bg-gray-900/30 border border-gray-800/50 rounded-lg p-6 md:p-8 shadow-lg">
          <motion.div 
            className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden border-2 border-purple-700 shadow-md flex-shrink-0 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/profile.png" 
              alt="Profile Icon" 
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          <motion.div 
            className="flex-1 font-mono text-sm md:text-base leading-relaxed text-gray-300 space-y-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={lineVariants} className="text-gray-500">{ '// hei.isme/bio' }</motion.p> 
            <motion.p variants={lineVariants}>&nbsp;</motion.p>
            
            <motion.p variants={lineVariants}><span className="text-purple-400">const</span> <span className="text-teal-400">currentStatus</span> = <span className="text-gray-100">{'{'}</span></motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">university</span>: <span className="text-orange-400">"FPT University HCMC"</span>,</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">major</span>: <span className="text-orange-400">"Artificial Intelligence"</span>,</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">passion</span>: <span className="text-orange-400">"Solving real-world challenges with intelligent systems"</span></motion.p>
            <motion.p variants={lineVariants}><span className="text-gray-100">{'}'};</span></motion.p>
            <motion.p variants={lineVariants}>&nbsp;</motion.p>

            <motion.p variants={lineVariants} className="text-gray-500">{ '// Key focus areas and tools' }</motion.p>
            <motion.p variants={lineVariants}><span className="text-purple-400">const</span> <span className="text-teal-400">techStack</span> = <span className="text-gray-100">{'{'}</span></motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">coreConcepts</span>: [<span className="text-orange-400">"Computer Vision"</span>, <span className="text-orange-400">"AIoT"</span>, <span className="text-orange-400">"Reinforcement Learning"</span>],</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">languages</span>: [<span className="text-orange-400">"Python"</span>, <span className="text-orange-400">"JavaScript"</span>],</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">mlLibs</span>: [<span className="text-orange-400">"TensorFlow"</span>, <span className="text-orange-400">"PyTorch"</span>, <span className="text-orange-400">"Scikit-learn"</span>]</motion.p>
            <motion.p variants={lineVariants}><span className="text-gray-100">{'}'};</span></motion.p>
            <motion.p variants={lineVariants}>&nbsp;</motion.p>

            <motion.p variants={lineVariants} className="text-gray-500">{ '// Ambition and approach' }</motion.p>
            <motion.p variants={lineVariants}><span className="text-purple-400">const</span> <span className="text-teal-400">philosophy</span> = <span className="text-gray-100">{'{'}</span></motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">commitment</span>: <span className="text-orange-400">"Continuous learning & growth"</span>,</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">goal</span>: <span className="text-orange-400">"Contribute to impactful AI research"</span>,</motion.p>
            <motion.p variants={lineVariants} className="pl-4"><span className="text-teal-500">method</span>: <span className="text-orange-400">"Tackle diverse challenges through technology"</span></motion.p>
            <motion.p variants={lineVariants}><span className="text-gray-100">{'}'};</span></motion.p>
            <motion.p variants={lineVariants}>&nbsp;</motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600/80 hover:bg-purple-500/80 text-gray-100 font-mono rounded-md shadow-md transition-colors duration-200"
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open('/HungLNG_Resume.pdf', '_blank')}
              >
                <span className="text-purple-300">$&gt;</span> get_resume.sh <FaDownload className="ml-1" />
              </motion.button>
              <motion.button 
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-purple-500 hover:bg-purple-500/10 text-purple-300 font-mono rounded-md transition-colors duration-200"
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                 <span className="text-purple-300">$&gt;</span> open_contact_form <FaEnvelope className="ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 