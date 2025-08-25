"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AllDay() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full flex justify-center"
    >
      <div className="relative w-full max-w-[80vw] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
        <div className="absolute top-0 left-0 z-10 p-6 md:p-8">
          <h1 className="text-3xl min-h-[300px] font-bold text-left leading-tight md:text-4xl lg:text-5xl">
            We can do this{" "}
            <span className="relative inline-flex overflow-hidden align-baseline pb-2"> {/* <-- THE FIX */}
              <AnimatePresence mode="wait">
                {isDay ? (
                  <motion.span
                    key="day"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block"
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
                    className="inline-block"
                  >
                    all night.
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </div>

        <video
          src="/videos/your-video.mp4"
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