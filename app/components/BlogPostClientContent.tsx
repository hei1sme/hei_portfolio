'use client'; // Mark as Client Component

import React from 'react';
import { motion } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote';

interface BlogPostClientContentProps {
  title: string;
  date: string;
  imageUrl?: string; // Optional image URL
  mdxSource: any; // Serialized MDX source
}

const BlogPostClientContent: React.FC<BlogPostClientContentProps> = ({
  title,
  date,
  imageUrl,
  mdxSource,
}) => {
  return (
    <>
      {/* Post Header with motion */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500">
          {title}
        </h1>
        <p className="text-lg text-gray-400 text-center">{date}</p>
        {/* Optionally display image here if needed */}
        {/* {imageUrl && <img src={imageUrl} alt={title} className="rounded-lg my-6 shadow-md"/>} */}
      </motion.div>

      {/* Post Content - Render MDX within motion.article */}
      <motion.article
        className="prose prose-invert lg:prose-xl mx-auto prose-headings:text-purple-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-purple-200 prose-blockquote:border-l-purple-400 prose-code:text-pink-400 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Render the serialized MDX content */}
        {/* @ts-ignore - MDXRemote props might cause temporary TS issues */}
        <MDXRemote {...mdxSource} />
      </motion.article>
    </>
  );
};

export default BlogPostClientContent;