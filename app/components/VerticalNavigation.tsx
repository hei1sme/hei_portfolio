'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaUser, FaBriefcase, FaCog, FaEnvelope, FaUniversity, FaMoon, FaSun, FaFeatherAlt, FaBars, FaTimes, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define section icons and labels
const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome />, path: '/' },
  { id: 'about', label: 'About', icon: <FaUser />, path: '#about' },
  { id: 'projects', label: 'Projects', icon: <FaBriefcase />, path: '#projects' },
  { id: 'skills', label: 'Skills', icon: <FaCog />, path: '#skills' },
  { id: 'experience', label: 'Experience', icon: <FaHistory />, path: '#experience' },
  { id: 'education', label: 'Education', icon: <FaUniversity />, path: '#education' },
  { id: 'blog', label: 'Blog', icon: <FaFeatherAlt />, path: '/blog' },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope />, path: '#contact' },
];

const VerticalNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    let scrollListener: (() => void) | null = null;
    if (isHomePage) {
        const sections = navItems.filter(item => item.path.startsWith('#')).map(item => item.id);
        const handleScroll = () => {
          let currentSectionId = 'home'; 
          let minTop = Infinity;

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
              if (rect.top < viewportHeight * 0.55 && rect.bottom > viewportHeight * 0.35) {
                currentSectionId = sectionId;
                minTop = rect.top;
                break;
              }
              
              if (rect.top >= 0 && rect.top < minTop) {
                minTop = rect.top;
                currentSectionId = sectionId;
              }
            }
          }
          
          if (minTop === Infinity && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 150) {
             const contactElement = document.getElementById('contact');
             if (contactElement) currentSectionId = 'contact';
          }

          if (currentSectionId !== activeSection) {
            setActiveSection(currentSectionId);
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        scrollListener = handleScroll;
        handleScroll();
    } else {
        const currentNavItem = navItems.find(item => item.path === pathname || (item.id === 'blog' && pathname.startsWith('/blog')));
        setActiveSection(currentNavItem ? currentNavItem.id : 'home');
    }

    return () => {
      if (scrollListener) window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, isHomePage, activeSection]);

  const handleNavLinkClick = (e: React.MouseEvent, itemPath: string, itemId: string) => {
      setIsMobileMenuOpen(false);
      setActiveSection(itemId);
      
      if (itemPath.startsWith('#') && isHomePage) {
          e.preventDefault();
          const element = document.getElementById(itemId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      } 
  };

  const getHref = (itemPath: string): string => {
      if (itemPath.startsWith('#') && !isHomePage) {
          return `/${itemPath}`;
      }
      return itemPath;
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      <motion.div 
        className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-md border-b border-gray-700/50 z-50 flex items-center justify-between px-5 shadow-lg"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Link href="/" passHref onClick={(e) => handleNavLinkClick(e, '/', 'home')}>
            <motion.div
                className="text-2xl font-mono cursor-pointer text-purple-400"
                whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300 } }}
            >
                h.
            </motion.div>
        </Link>

        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-purple-400 text-2xl z-50"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 pt-16"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navItems.map((item) => {
                const href = getHref(item.path);
                return (
                    <Link 
                        key={`mobile-${item.id}`} 
                        href={href} 
                        passHref
                        onClick={(e) => handleNavLinkClick(e, item.path, item.id)}
                    >
                        <motion.span
                            className={`text-2xl font-mono ${activeSection === item.id ? 'text-purple-400' : 'text-gray-400'} hover:text-purple-300 transition-colors duration-200 flex items-center gap-3 cursor-pointer`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                        {item.icon}
                        <span>{item.label}</span>
                        </motion.span>
                    </Link>
                );
            })}
            <motion.button
                className={`mt-8 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-blue-400/20 text-blue-300 hover:bg-blue-400/30'}`}
                whileHover={{ scale: 1.15, rotate: isDarkMode ? -25 : 25 }} 
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className="hidden md:flex fixed top-0 left-0 h-full w-20 bg-black/50 backdrop-blur-lg border-r border-gray-700/50 z-50 flex-col items-center justify-between py-8 shadow-lg"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Link href="/" passHref onClick={(e) => handleNavLinkClick(e, '/', 'home')}>
          <motion.div
            className="text-3xl font-mono cursor-pointer text-purple-400"
            whileHover={{ scale: 1.15, rotate: 10, transition: { type: "spring", stiffness: 300, damping: 10 } }}
            whileTap={{ scale: 0.9, rotate: -5, transition: { type: "spring", stiffness: 400, damping: 15 } }}
            aria-label="Home"
          >
            h.
          </motion.div>
        </Link>

        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item) => {
            if (item.id === 'home') return null;

            const href = getHref(item.path);
            
            return (
                <Link 
                    href={href} 
                    key={`desktop-${item.id}`} 
                    passHref
                    legacyBehavior={false}
                    onClick={(e) => handleNavLinkClick(e, item.path, item.id)}                    
                    title={item.label}
                    className={`relative group w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${ 
                      activeSection === item.id 
                        ? 'bg-purple-600/30 text-purple-300' 
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-purple-300'
                    }`}
                >
                    <motion.span 
                        className="text-xl block" 
                        whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300 } }} 
                        whileTap={{ scale: 0.9 }}
                    >
                        {item.icon}
                    </motion.span>
                    <span 
                        className="absolute left-full ml-3 px-3 py-1.5 whitespace-nowrap bg-gray-800 text-white text-xs font-mono rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none scale-90 group-hover:scale-100 origin-left z-10"
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
                </Link>
            );
          })}
        </div>

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
    </>
  );
};

export default VerticalNavigation; 