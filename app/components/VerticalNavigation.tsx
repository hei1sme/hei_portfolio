'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaUser, FaBriefcase, FaCog, FaEnvelope, FaUniversity, FaMoon, FaSun, FaFeatherAlt } from 'react-icons/fa';
import Link from 'next/link';

// Define section icons and labels
const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome />, path: '/' },
  { id: 'about', label: 'About', icon: <FaUser />, path: '/#about' },
  { id: 'education', label: 'Education', icon: <FaUniversity />, path: '/#education' },
  { id: 'projects', label: 'Projects', icon: <FaBriefcase />, path: '/#projects' },
  { id: 'skills', label: 'Skills', icon: <FaCog />, path: '/#skills' },
  { id: 'blog', label: 'Blog', icon: <FaFeatherAlt />, path: '/blog' },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope />, path: '/#contact' },
];

const VerticalNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = navItems.map(item => item.id);
    
    const handleScroll = () => {
      let currentSection = 'home'; // Default to home
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if its top is within the top ~60% of the viewport
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = sectionId;
            break; // Found the primary active section
          }
          // If no section is actively in the middle, check if one is near the top
          if (rect.top <= 100 && rect.top >= -100) { // Adjust threshold as needed
             currentSection = sectionId;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Manually set active section on click for immediate feedback
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 h-full w-20 bg-black/50 backdrop-blur-lg border-r border-gray-700/50 z-50 flex flex-col items-center justify-between py-8 shadow-lg"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Top Section (Logo/Brand) */}
      <Link href="/" passHref>
        <motion.div
          className="text-3xl font-mono cursor-pointer text-purple-400"
          whileHover={{ scale: 1.15, rotate: 10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
          whileTap={{ scale: 0.9, rotate: -5, transition: { type: "spring", stiffness: 400, damping: 15 } }}
          onClick={() => setActiveSection('home')}
          aria-label="Home"
        >
          h.
        </motion.div>
      </Link>

      {/* Middle Section (Navigation Items) */}
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => {
          // Determine if it's an internal scroll or page link
          const isPageLink = item.path.startsWith('/');
          const clickHandler = isPageLink ? () => setActiveSection(item.id) : () => scrollToSection(item.id);
          const ButtonComponent = isPageLink ? Link : 'button';

          return item.id !== 'home' && (
            <motion.div
              key={item.id}
              layoutId={isPageLink ? undefined : `nav-item-${item.id}`}
            >
              <ButtonComponent 
                href={isPageLink ? item.path : undefined} 
                onClick={clickHandler}
                title={item.label}
                className={`relative group w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${ 
                  activeSection === item.id 
                    ? 'bg-purple-600/30 text-purple-300' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-purple-300'
                }`}
              >
                <motion.span 
                  className="text-xl block"
                  whileHover={{ scale: 1.2, transition: { type: "spring", stiffness: 300, damping: 10 } }} 
                  whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                >
                  {item.icon}
                </motion.span>

                <span 
                  className="absolute left-full ml-3 px-3 py-1.5 whitespace-nowrap bg-gray-800 text-white text-xs font-mono rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none scale-90 group-hover:scale-100 origin-left"
                >
                  {item.label}
                </span>

                {activeSection === item.id && (
                  <motion.div 
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-500 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </ButtonComponent>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Section (Theme Toggle) */}
      <motion.button
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-blue-400/20 text-blue-300 hover:bg-blue-400/30'}`}
        whileHover={{ scale: 1.15, rotate: isDarkMode ? -25 : 25, transition: { type: "spring", stiffness: 300, damping: 10 } }}
        whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400, damping: 15 } }}
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </motion.button>
    </motion.nav>
  );
};

export default VerticalNavigation; 