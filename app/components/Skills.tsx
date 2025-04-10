'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Import icons for technologies
import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas,
  SiNumpy, SiReact, SiNextdotjs, SiJavascript, SiGit, SiDocker, SiPostgresql
} from "react-icons/si";
import { FaDatabase, FaBrain, FaCode, FaUsers } from 'react-icons/fa'; // Generic icons

// --- Data Structures ---
interface BroadSkill {
  name: string;
  level: number; // Percentage
  icon?: React.ReactElement; // Optional icon for broad skill
}

interface Technology {
  name: string;
  icon: React.ReactElement;
}

// --- Example Data (Customize this!) ---
const broadSkills: BroadSkill[] = [
  { name: "Programming", level: 90, icon: <FaCode className="mr-2" /> },
  { name: "Machine Learning", level: 85, icon: <FaBrain className="mr-2" /> },
  { name: "Deep Learning", level: 80, icon: <FaBrain className="mr-2 opacity-70" /> }, // Slightly different icon/style
  { name: "Data Analysis", level: 88, icon: <FaDatabase className="mr-2 text-teal-400" /> },
  { name: "Problem Solving", level: 95, icon: <FaUsers className="mr-2" /> }, // Example
  { name: "Communication", level: 85, icon: <FaUsers className="mr-2 opacity-70" /> },
];

const technologies: Technology[] = [
  { name: "Python", icon: <SiPython size={28} className="text-blue-400" /> },
  { name: "JavaScript", icon: <SiJavascript size={28} className="text-yellow-400"/> },
  { name: "TensorFlow", icon: <SiTensorflow size={28} className="text-orange-500"/> },
  { name: "PyTorch", icon: <SiPytorch size={28} className="text-red-500"/> },
  { name: "Scikit-learn", icon: <SiScikitlearn size={28} className="text-orange-400"/> },
  { name: "Pandas", icon: <SiPandas size={28} className="text-indigo-400"/> },
  { name: "NumPy", icon: <SiNumpy size={28} className="text-blue-500"/> },
  { name: "React", icon: <SiReact size={28} className="text-cyan-400"/> },
  { name: "Next.js", icon: <SiNextdotjs size={28} className="text-white"/> }, // Use specific color or default
  { name: "SQL", icon: <FaDatabase size={28} className="text-teal-400"/> }, 
  { name: "Git", icon: <SiGit size={28} className="text-red-600"/> },
  { name: "Docker", icon: <SiDocker size={28} className="text-blue-600"/> },
];

const skillItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const techItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05, // Faster stagger for icons
      duration: 0.4,
    },
  }),
};


const Skills: React.FC = () => {
  return (
    <section className="py-24 text-white" id="skills">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <h2 className="text-4xl font-bold mb-16 text-center font-mono relative bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          Skills & Technologies
        </h2>
        
        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* Column 1: Broad Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold font-mono text-purple-400 mb-6">Core Skills</h3>
            {broadSkills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="space-y-2"
                variants={skillItemVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-medium text-lg text-gray-100 flex items-center">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-purple-400 font-mono text-sm font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2: Technologies */}
          <div className="space-y-6">
             <h3 className="text-2xl font-semibold font-mono text-purple-400 mb-6">Technologies</h3>
             <div className="flex flex-wrap gap-x-6 gap-y-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/40 border border-gray-700/60 w-24 h-24 justify-center shadow-sm"
                    variants={techItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={index}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ y: -5, scale: 1.05, shadow: 'lg', borderColor: '#a855f7' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {tech.icon} 
                    <span className="text-xs font-mono text-gray-300 mt-1">{tech.name}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 