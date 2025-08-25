"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The total duration of the video
const TOTAL_DURATION = 15;
// The duration of each section
const SECTION_DURATION = 5;
// Number of sections
const NUM_SECTIONS = TOTAL_DURATION / SECTION_DURATION;

export default function ScrollSplash({ onComplete }) {
  // Ref for the video element to control it programmatically
  const videoRef = useRef(null);

  // State to track which section has been completed (starts at 0, goes to 3)
  const [completedSections, setCompletedSections] = useState(0);

  // State to handle the exit animation
  const [isExiting, setIsExiting] = useState(false);

  // State to throttle scroll events and prevent spamming
  const [isAnimating, setIsAnimating] = useState(false);

  // This effect handles the video play/pause logic when the section changes
  useEffect(() => {
    const video = videoRef.current;
    // Don't do anything on the initial render or if there's no video
    if (!video || completedSections === 0) return;

    // The time in the video where the current section ends
    const targetTime = completedSections * SECTION_DURATION;

    const handleTimeUpdate = () => {
      // When the video's current time reaches or passes the target, pause it
      if (video.currentTime >= targetTime) {
        video.pause();
        video.removeEventListener("timeupdate", handleTimeUpdate);
        setIsAnimating(false); // Re-enable scrolling for the next section

        // If this was the final section, trigger the exit sequence
        if (completedSections === NUM_SECTIONS) {
          setTimeout(() => {
            setIsExiting(true);
            if (onComplete) onComplete(); // Notify parent component
          }, 500); // A brief pause before exiting
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.play(); // Play the video to the next section

    // Cleanup function to remove the event listener if the component unmounts
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [completedSections, onComplete]);


  // This effect handles the scroll/wheel hijacking
  useEffect(() => {
    const handleWheel = (e) => {
      // If we're already playing a section, ignore this scroll event
      if (isAnimating) return;

      // Check for a downward scroll
      if (e.deltaY > 0) {
        // If we haven't completed all sections, advance to the next one
        if (completedSections < NUM_SECTIONS) {
          setIsAnimating(true); // Disable further scrolls until this section is done
          setCompletedSections((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isAnimating, completedSections]);
  
  // Handler for the "Skip Intro" button
  const handleSkip = () => {
    setIsExiting(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          {/* Main Video Player */}
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src="/videos/your-splash-video.mp4" // IMPORTANT: Replace with your video path
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
            />
          </div>

          {/* UI Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
            {/* Skip Button (Accessibility) */}
            <div className="w-full flex justify-end">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-white bg-black/30 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                Skip Intro
              </button>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="flex space-x-3">
              {Array.from({ length: NUM_SECTIONS }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    completedSections > index ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
