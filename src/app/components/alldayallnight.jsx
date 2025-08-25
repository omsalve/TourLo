"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AllDay() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full flex justify-center"
    >
      {/* Smaller container with fixed max width, still 16:9 */}
      <div className="relative w-full max-w-[1200px] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
        <div className="absolute top-0 left-0 z-10 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-left leading-tight">
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
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent"
                  >
                    all night.
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </div>

        <video
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
