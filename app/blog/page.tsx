// Remove the 'use client' directive to make this a Server Component

import React from 'react';
import Footer from '../components/Footer'; // Reuse footer
import VerticalNavigation from '../components/VerticalNavigation'; // Reuse nav
import { getSortedPostsData } from '../../lib/posts'; // Use relative path
// Corrected alias/path for BlogListClient - ensure this resolves correctly after server restart!
import BlogListClient from '@/app/components/BlogListClient'; // Keep alias for now, but could change if needed

// BlogPostCard component definition has been moved to BlogListClient.tsx

// Page remains an async Server Component
export default async function BlogPage() {
  const blogPosts = getSortedPostsData(); // Fetch data on the server

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 relative">
      <VerticalNavigation />

      {/* Render the client component, passing the fetched data */}
      <BlogListClient posts={blogPosts} />

      {/* Footer */} 
      <div className="container mx-auto px-4 mt-24 max-w-full">
        <Footer /> 
      </div>
    </main>
  );
} 