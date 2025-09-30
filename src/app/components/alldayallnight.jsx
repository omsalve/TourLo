"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function AllDay() {
  const [isDay, setIsDay] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Example: switch text every 5 seconds
      const currentTime = Math.floor(video.currentTime);
      if (currentTime % 10 < 5) {
        setIsDay(true);
      } else {
        setIsDay(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full flex justify-center"
    >
      <div className="relative w-full max-w-[1300px] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
        {/* Text overlay */}
        <div className="absolute top-0 left-0 z-10 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl lg:text-7xl font-bold text-left leading-tight">
            We can do this{" "}
            <span className="relative inline-flex overflow-hidden align-baseline pb-1">
              <AnimatePresence mode="wait">
                {isDay ? (
                  <motion.span
                    key="day"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent"
                  >
                    all day.
                  </motion.span>
                ) : (
                  <motion.span
                    key="night"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent"
                  >
                    all night.
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src="/videos/daynight.mp4"
          poster="/images/video-poster.jpg"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </motion.div>
  );
}
