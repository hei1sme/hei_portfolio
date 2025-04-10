'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000); // Clear status after 3s
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000); // Clear status after 3s
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center font-mono relative bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          Get In Touch
          {/* Underline removed/commented */}
          {/* <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-1 w-20 bg-purple-500"></span> */}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Info & Socials */}
          <motion.div 
            className="lg:w-1/3 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-mono text-purple-400">Contact Information</h3>
            <p className="text-gray-300">
              Feel free to reach out via email or connect with me on social media. I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-purple-500" size={20} />
                <span className="text-gray-300">heiontheway@gmail.com</span> {/* Replace */}
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-500" size={20} />
                <span className="text-gray-300">Ho Chi Minh City, Vietnam</span> {/* Replace */}
              </div>
            </div>
            <div className="flex space-x-6 pt-4">
              <motion.a href="https://linkedin.com/in/le-nguyen-gia-hung/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors" whileHover={{ y: -3 }}><FaLinkedin size={28} /></motion.a>
              <motion.a href="https://github.com/hei1sme/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors" whileHover={{ y: -3 }}><FaGithub size={28} /></motion.a>
              <motion.a href="https://www.instagram.com/hei.isme/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors" whileHover={{ y: -3 }}><FaInstagram size={28} /></motion.a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/30 p-8 rounded-lg border border-gray-800 shadow-lg">
              {/* Form Fields (Name, Email, Message) - Adjusted styling */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-1 font-mono">
                  Name
                </label>
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white transition-colors"
                  placeholder="What should I call you?"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1 font-mono">
                  Email
                </label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white transition-colors"
                  placeholder="Where can I reach you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-1 font-mono">
                  Message
                </label>
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white transition-colors"
                  placeholder="What's on your mind?"
                ></textarea>
              </div>
              
              {/* Submit Button & Status */}
              <div className="flex items-center justify-between gap-4">
                <motion.button
                  type="submit" disabled={isSubmitting}
                  className={`px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-purple-800 hover:shadow-lg'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                   ) : 'Send Message'}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-400 text-sm font-mono">
                      Sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400 text-sm font-mono">
                      Error sending.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 