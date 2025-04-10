// Remove 'use client' if present, this should be a Server Component
import React from 'react';
import { notFound } from 'next/navigation'; // Import notFound
import { getPostData } from '../../../lib/posts'; // Correct relative path (3 levels up)
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../../components/Footer';
import VerticalNavigation from '../../components/VerticalNavigation';
// Import the new client component for rendering content
import BlogPostClientContent from '../../components/BlogPostClientContent'; // Using relative path again

// Make the page component async
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug); // Fetch data using the new function

  if (!post) {
    notFound(); // Use Next.js notFound function
  }

  // Destructure data to pass to client component
  const { title, date, imageUrl, mdxSource } = post;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <VerticalNavigation />

      {/* Content Area */}
      <div className="w-full max-w-3xl px-4 md:px-8 lg:px-12 mt-20 z-10">
        {/* Back to Blog Link */}
        <Link href="/blog" className="mb-8 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>

        {/* Render the client component for header and MDX content */}
        <BlogPostClientContent 
          title={title} 
          date={date} 
          imageUrl={imageUrl}
          mdxSource={mdxSource} 
        />
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-24 max-w-3xl">
        <Footer />
      </div>
    </main>
  );
} 