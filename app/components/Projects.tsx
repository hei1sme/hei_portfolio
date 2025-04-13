'use client';

import React, { useState, useRef } from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

// --- IMPORTANT: Replace with your REAL project data and SLUGS --- 
const projects: ProjectItem[] = [
  {
    title: "Employee Attrition Predictor",
    slug: "employee-attrition-predictor",
    description: "Developed a Logistic Regression model to predict employee attrition using demographic, financial, and job-related features. Includes data preprocessing techniques for normalization, encoding, and balancing.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SciPy"],
    image: "/images/placeholder-project.png",
    githubUrl: "https://github.com/hei1sme/EmployeeAttritionPredictor"
  },
  {
    title: "NLP Sentiment Analysis",
    slug: "nlp-sentiment-analysis",
    description: "Built an NLP application for sentiment analysis on text data, utilizing techniques like TF-IDF and machine learning classifiers.",
    technologies: ["Python", "NLTK", "Scikit-learn", "Flask"],
    image: "/images/placeholder-project.png",
    githubUrl: "https://github.com/",
  },
  {
    title: "Recommendation Engine",
    slug: "recommendation-engine",
    description: "Designed a content-based recommendation system suggesting items based on user preferences and historical interaction data.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Surprise"],
    image: "/images/placeholder-project.png",
    githubUrl: "https://github.com/",
    liveUrl: "#"
  },
  // Add more projects...
];
// ----------------------------------------------------

const Projects: React.FC = () => {
  const router = useRouter();

  // State to track drag vs click (using time and distance)
  const interactionState = useRef({
      isMouseDown: false,
      startX: 0,
      startY: 0,
      startTime: 0
  });
  const dragThreshold = 10; // Pixels threshold
  const clickTimeThreshold = 250; // Milliseconds threshold

  const settings = {
    dots: true,
    infinite: projects.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    className: "project-full-slider",
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "-50px", width: "100%" }}> 
        <ul style={{ margin: "0 auto", padding: "0" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2.5 h-2.5 bg-gray-600 rounded-full transition-colors duration-300 hover:bg-purple-400 focus:outline-none slick-active:bg-purple-500 cursor-pointer">
      </div>
    )
  };

  // Event Handlers for Drag/Click Detection
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    interactionState.current = {
        isMouseDown: true,
        startX: e.clientX,
        startY: e.clientY,
        startTime: Date.now()
    };
  };

  // onClick will now act as our primary check after mouse up
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    if (!interactionState.current.isMouseDown) {
        // Should not happen if logic is correct, but safety check
        return; 
    }

    const { startX, startY, startTime } = interactionState.current;
    const endX = e.clientX;
    const endY = e.clientY;
    const endTime = Date.now();

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const timeDiff = endTime - startTime;

    // Reset mouse down state immediately after processing
    interactionState.current.isMouseDown = false;

    // Check if it qualifies as a click (short time AND short distance)
    if (timeDiff < clickTimeThreshold && distance < dragThreshold) {
      // It's a click, navigate!
      router.push(`/projects/${slug}`);
    } else {
      // It was likely a drag, do nothing for navigation.
      // console.log(`Drag detected: Distance=${distance.toFixed(2)}, Time=${timeDiff}ms`);
    }
  };

  // Optional: Add onMouseLeave to reset state if mouse leaves while down
  const handleMouseLeave = () => {
     if (interactionState.current.isMouseDown) {
        interactionState.current.isMouseDown = false;
     }
  };

  return (
    <section className="py-24 text-white overflow-hidden" id="projects">
        <div className="container mx-auto px-4"> 
          <motion.h2 
            className="text-4xl font-bold mb-16 text-left font-mono relative pl-4 border-l-4 border-purple-500 text-purple-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Featured Projects
          </motion.h2>
        </div>

        <motion.div
          className="project-slider-wrapper mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Slider {...settings}>
            {projects.map((project) => (
              <div key={project.slug} className="px-4 md:px-8 outline-none focus:outline-none">
                <div 
                  className="block bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[450px] md:min-h-[400px] group transition-all duration-300 hover:border-purple-500/70 hover:shadow-purple-500/20 cursor-pointer"
                  onMouseDown={handleMouseDown}
                  onClick={(e) => handleClick(e, project.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="md:w-2/5 h-64 md:h-auto bg-gray-700 flex items-center justify-center overflow-hidden pointer-events-none">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                      draggable="false"
                    />
                  </div>
                
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col pointer-events-none">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 font-mono text-purple-300 group-hover:text-purple-200 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-300 mb-5 text-sm md:text-base leading-relaxed max-w-xl flex-grow">{project.description}</p>
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
                  
                <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center justify-start gap-4">
                  {project.githubUrl && (
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaGithub /> Code
                    </span>
                  )}
                  {project.liveUrl && (
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaExternalLinkAlt /> Live Demo
                    </span>
                  )}
                </div>
                </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
    </section>
  );
};

export default Projects; 