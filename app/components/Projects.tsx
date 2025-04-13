'use client';

import React from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Parallax } from 'react-scroll-parallax';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string; // Use a real or good placeholder image path (e.g., /images/project1.png)
  githubUrl?: string;
  liveUrl?: string;
}

// --- IMPORTANT: Replace with your REAL project data --- 
const projects: Project[] = [
  {
    title: "Employee Attrition Predictor",
    description: "Developed a Logistic Regression model to predict employee attrition using demographic, financial, and job-related features. Includes data preprocessing techniques for normalization, encoding, and balancing.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SciPy"],
    image: "/images/placeholder-project.png", // Replace!
    githubUrl: "https://github.com/hei1sme/EmployeeAttritionPredictor"
  },
  {
    title: "NLP Sentiment Analysis",
    description: "Built an NLP application for sentiment analysis on text data, utilizing techniques like TF-IDF and machine learning classifiers.",
    technologies: ["Python", "NLTK", "Scikit-learn", "Flask"],
    image: "/images/placeholder-project.png", // Replace!
    githubUrl: "https://github.com/", // Replace!
  },
  {
    title: "Recommendation Engine",
    description: "Designed a content-based recommendation system suggesting items based on user preferences and historical interaction data.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Surprise"],
    image: "/images/placeholder-project.png", // Replace!
    githubUrl: "https://github.com/", // Replace!
    liveUrl: "#" // Replace with live link if available
  },
  // Add more projects...
];
// ----------------------------------------------------

const Projects: React.FC = () => {
  const settings = {
    dots: true,
    infinite: projects.length > 1, // Only infinite if more than 1 slide
    speed: 600, // Slightly slower speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Longer pause
    pauseOnHover: true,
    arrows: false, 
    className: "project-full-slider", // New class for styling
    // centerMode: true, // Enable for peek effect
    // centerPadding: "10%", // Adjust padding if centerMode is true
    appendDots: (dots: React.ReactNode) => (
      // Keep dots positioning or adjust as needed
      <div style={{ position: "absolute", bottom: "-50px", width: "100%" }}> 
        <ul style={{ margin: "0 auto", padding: "0" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2.5 h-2.5 bg-gray-600 rounded-full transition-colors duration-300 hover:bg-purple-400 focus:outline-none slick-active:bg-purple-500">
        {/* Dot appearance */}
      </div>
    )
  };

  return (
    // Section takes full width within the page's padding boundaries
    <section className="py-24 text-white overflow-hidden" id="projects">
       {/* Remove container mx-auto px-4 if you want edge-to-edge slider */}
      {/* <div className="container mx-auto px-4"> */}
        <div className="container mx-auto px-4"> {/* Keep container for title only */} 
          <motion.h2 
            // Apply the same style as About.tsx title
            className="text-4xl font-bold mb-16 text-left font-mono relative pl-4 border-l-4 border-purple-500 text-purple-300" // Removed gradient, added text color
            initial={{ opacity: 0, y: -20 }} // Removed rotate
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Featured Projects
          </motion.h2>
        </div>

        {/* Slider container - remove max-width to make it wider */} 
        <motion.div
          className="project-slider-wrapper mx-auto" // Use margin auto if needed, but no max-width
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Slider {...settings}>
            {projects.map((project, index) => (
              // Each slide - adjust internal padding if needed
              <div key={index} className="px-4 md:px-8 outline-none focus:outline-none"> 
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[450px] md:min-h-[400px]"> {/* Set min height */} 
                  {/* Image Section (Consider Parallax here again later) */}
                   {/* <Parallax speed={5} className="md:w-2/5 h-64 md:h-auto bg-gray-700 flex items-center justify-center overflow-hidden"> */}
                    <div className="md:w-2/5 h-64 md:h-auto bg-gray-700 flex items-center justify-center overflow-hidden group"> {/* Added group for hover */} 
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                    </div>
                   {/* </Parallax> */} 
                  
                  {/* Content Section */}
                  <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center"> {/* Adjusted padding and centering */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3 font-mono text-purple-300">{project.title}</h3>
                      <p className="text-gray-300 mb-5 text-sm md:text-base leading-relaxed max-w-xl">{project.description}</p> {/* Added max-width */} 
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Links Section */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-700/50">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      {/* </div> */}
    </section>
  );
};

export default Projects; 