import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

// ScrollProgressBar Component
// This component renders a progress bar at the top of the screen
// that visually indicates the user's scroll position on the page.
const ScrollProgressBar = () => {
  // State to store the current scroll progress percentage.
  const [scrollProgress, setScrollProgress] = useState(0);

  // useEffect hook to add and remove the scroll event listener.
  useEffect(() => {
    // Function to calculate and update the scroll progress.
    const updateScrollProgress = () => {
      // Calculate the total scrollable height of the document.
      // document.documentElement.scrollHeight is the total height of the content.
      // window.innerHeight is the visible height of the viewport.
      // We subtract window.innerHeight because the scroll position maxes out
      // when the bottom of the viewport reaches the bottom of the document.
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Calculate the current scroll position from the top of the document.
      const scrolled = window.scrollY;

      // Calculate the progress percentage.
      // Ensure scrollHeight is not zero to prevent division by zero errors.
      if (scrollHeight > 0) {
        setScrollProgress((scrolled / scrollHeight) * 100);
      } else {
        // If the page is not scrollable, progress is 100%.
        setScrollProgress(100);
      }
    };

    // Add the event listener for 'scroll' events.
    window.addEventListener('scroll', updateScrollProgress);

    // Call it once on mount to set initial progress (e.g., if page reloads mid-scroll).
    updateScrollProgress();

    // Clean up function to remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount.

  return (
    // The main container for the progress bar.
    // Fixed at the top (top-0), full width (w-full), and above other content (z-50).
    // The background is a darker gray for the track.
    <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-500 dark:bg-gray-800 z-50 overflow-hidden">
      {/* The actual progress indicator, now using Framer Motion's motion.div. */}
      {/* 'initial' sets the starting state (width 0). */}
      {/* 'animate' updates the width based on 'scrollProgress',
          with Framer Motion handling the smooth interpolation. */}
      <motion.div
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        // Framer Motion handles the animation, so the Tailwind transition classes are removed.
        // You can customize the transition further with the 'transition' prop if needed, e.g.:
        // transition={{ duration: 0.1, ease: "easeOut" }}
      ></motion.div>
    </div>
  );
};

export default ScrollProgressBar;
