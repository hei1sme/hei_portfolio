'use client';

import React, { useRef } from 'react'; // Added useRef
import { motion, useScroll, useTransform } from 'framer-motion'; // Added scroll hooks
import Image from 'next/image';
import { FaBriefcase } from 'react-icons/fa';

// Placeholder data
const experienceData = [
  { id: 1, role: "Software Engineer Intern", company: "Tech Example Inc.", date: "Summer 2023", description: ["Developed feature X using React & Node.js.", "Wrote unit tests, increasing coverage by 15%.", "Participated in daily stand-ups and sprint reviews."], image: "/images/placeholder-company-1.png" },
  { id: 2, role: "AI Research Assistant (Project)", company: "University Project", date: "Spring 2023", description: ["Implemented data augmentation pipeline.", "Trained CNN models for image classification.", "Achieved 92% accuracy on test dataset."], image: "/images/placeholder-company-2.png" },
  { id: 3, role: "Freelance Web Developer", company: "Self-Employed", date: "2024", description: ["Built responsive portfolio sites for clients.", "Optimized site performance (Lighthouse score >90).", "Managed hosting and deployment."], image: "/images/placeholder-company-3.png" },
  { id: 4, role: "Open Source Contributor", company: "Various Projects", date: "Ongoing (2024)", description: ["Contributed bug fixes to popular library X.", "Improved documentation for component Y.", "Submitted pull requests."], image: "/images/placeholder-company-4.png" }
];

// Define getYear function BEFORE it's used
const getYear = (dateString: string): string => {
  const match = dateString.match(/\d{4}/); // Find the first 4-digit number
  return match ? match[0] : dateString; // Return year or original string if no year found
};

// Create the sorted array separately - NOW getYear is defined
const sortedExperienceData = [...experienceData].sort((a, b) => {
    const yearA = parseInt(getYear(a.date)); // OK now
    const yearB = parseInt(getYear(b.date)); // OK now

    // Primary sort: Year descending
    const yearComparison = yearB - yearA;
    if (yearComparison !== 0) {
        return yearComparison;
    }
    // Secondary sort: Original index
    return experienceData.indexOf(a) - experienceData.indexOf(b);
});

// Component for individual experience item - easier to manage refs and scroll logic
const ExperienceItem = ({ item }: { item: typeof experienceData[0] }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"] // Track as item moves across the viewport
  });

  // Opacity: Full (1) in middle 40% of viewport passage, fade to 0.4 at edges
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], // Points where opacity changes
    [0.4, 1, 1, 0.4]  // Corresponding opacity values
  );
  // Scale: Full (1) in middle 40%, scale down to 0.9 at edges
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9]
  );

  return (
     <motion.div 
      ref={itemRef} // Attach ref here
      key={item.id}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center relative" // Added relative positioning for potential line connection points
      style={{ opacity, scale }} // Apply dynamic styles
    >
      {/* Left Column: Animated Year */}
      <div className="flex justify-center items-center md:col-span-1 order-first md:order-none"> {/* Ensure year is visually distinct */} 
        <motion.span 
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-mono text-purple-600/40 select-none"
          initial={{ opacity: 0.5, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ amount: 0.3, once: true }}
        >
          {getYear(item.date)} 
        </motion.span>
      </div>

      {/* Right Column: Info and Image */}
      <div className="md:col-span-2 order-last"> {/* Ensure info is visually distinct */} 
         <motion.div 
            className="bg-gray-800/40 border border-gray-700/50 rounded-lg shadow-xl p-6 md:p-8 backdrop-blur-sm"
            initial={{ opacity: 0.5, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ amount: 0.3, once: true }}
         >
           {/* Card Content */}
           <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-5">
               <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
                 <Image 
                   src={item.image}
                   alt={`${item.company} logo placeholder`}
                   layout="fill"
                   objectFit="contain"
                 />
               </div>
               <div className="flex-1">
                 <h3 className="text-xl md:text-2xl font-semibold font-mono text-purple-300 mb-1">{item.role}</h3>
                 <p className="text-lg text-teal-400 mb-1 font-mono">{item.company}</p>
                 <p className="text-sm text-gray-500 font-mono">{item.date}</p> {/* Display full date */}
               </div>
           </div>
           <ul className="list-disc list-outside pl-5 space-y-1.5 text-base text-gray-300">
             {item.description.map((point, i) => (
               <li key={i}>{point}</li>
             ))}
           </ul>
         </motion.div>
      </div>
     </motion.div>
  );
}

const Experience: React.FC = () => {
  return (
    <section className="py-24 text-white overflow-hidden relative" id="experience"> {/* Add relative for the bar */}
      <div className="container mx-auto px-4">
         <motion.h2 
            className="text-4xl font-bold mb-20 text-left font-mono relative pl-4 border-l-4 border-purple-500 text-purple-300" // Keep consistent title
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Experience {/* Updated title */}
          </motion.h2>

          {/* Container for timeline items and the connecting bar */}
          <div className="relative"> 
              {/* Vertical Connecting Bar */}
              {/* Positioned slightly left of center, adjust left-[calc(...)] as needed */} 
              <div className="absolute top-10 bottom-10 left-[calc(33%-1rem)] md:left-[calc(33%-1rem)] w-1 bg-gradient-to-b from-purple-700/20 via-purple-600/30 to-purple-700/20 rounded-full -z-10"></div>

              {/* Vertical stack of experience items */}
              <div className="space-y-40 md:space-y-48"> {/* Increased vertical spacing */} 
                {sortedExperienceData.map((item) => (
                  <ExperienceItem key={item.id} item={item} />
                ))}
              </div>
          </div>
      </div>
    </section>
  );
};

export default Experience; 