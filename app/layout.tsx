'use client'; // Layout now needs to be client for ParallaxProvider

// Remove Metadata type import if no longer needed here
// import type { Metadata } from 'next'; 
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { ParallaxProvider } from 'react-scroll-parallax'; // Import ParallaxProvider
// Import slick-carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ['latin'] });

// Remove metadata export from here
// export const metadata: Metadata = { ... };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <ParallaxProvider> {/* Wrap with ParallaxProvider */}
            {/* <ParticleBackground /> */}
            {children} {/* Main content should render on top */}
          </ParallaxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 