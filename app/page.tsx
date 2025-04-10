'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import VerticalNavigation from './components/VerticalNavigation';
import Footer from './components/Footer';

// Define metadata values
const pageTitle = 'Le Nguyen Gia Hung - Portfolio';
const pageDescription = 'Personal portfolio of Le Nguyen Gia Hung, an undergraduate AI student.';

export default function Home() {
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);

  // Set metadata on component mount
  useEffect(() => {
    document.title = pageTitle;
    
    // Set description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', pageDescription);

    // Cleanup function (optional but good practice)
    return () => {
      // Optionally reset title or description on unmount if needed
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Restore simple scroll handler for nav links
  const handleNavAction = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="cursor-none relative bg-black">
      <CustomCursor />
      <EntranceAnimation onAnimationComplete={() => setIsEntranceComplete(true)} />
      
      {/* Conditionally render main content */}
      {isEntranceComplete && (
        <>
          <VerticalNavigation />
          {/* Main content wrapper with padding to avoid navbar */}
          <div className="pl-20">
            {/* Hero section - full width within the padded area */}
            <motion.div
              id="home"
              className="pr-4" // Right padding
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Hero />
            </motion.div>

            {/* About Section - Constrained and Centered */}
            <motion.div
              id="about"
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" // Centering classes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <About />
            </motion.div>
            
            {/* Education Section - Constrained and Centered */}
            <motion.div
              id="education"
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" // Centering classes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Education />
            </motion.div>

            {/* Projects Section - Constrained and Centered */}
            <motion.div
              id="projects"
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" // Centering classes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Projects />
            </motion.div>

            {/* Skills Section - Constrained and Centered */}
            <motion.div
              id="skills"
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" // Centering classes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Skills />
            </motion.div>

            {/* Contact Section - Constrained and Centered */}
            <motion.div
              id="contact"
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" // Centering classes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Contact />
            </motion.div>
            
            {/* Footer - full width within the padded area */}
            <div className="pr-4"> {/* Right padding */} 
               <Footer />
            </div>
          </div> 
        </>
      )}
    </main>
  );
} 