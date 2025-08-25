"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Timecodes in SECONDS: auto (0→1.40), then scrolls to 2.25, then 5.00, then fade out
// If your times are mm:ss, convert to seconds (e.g., 1:40 → 100, 2:25 → 145, 5:00 → 300)
const CUE_POINTS = [1.4, 2.25, 5.0];
const EPS = 0.03; // float tolerance

export default function ScrollSplash({ onComplete }) {
  const videoRef = useRef(null);

  // How many cue points have been completed (0..CUE_POINTS.length)
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // blocks extra scrolls while advancing
  const [isExiting, setIsExiting] = useState(false);

  // Lock body scroll while splash is visible
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  // Kick off the auto segment (0 → 1.40)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const startAuto = () => {
      try {
        v.currentTime = 0;
      } catch {}
      setIsAnimating(true);
      v.play().catch(() => {});
    };

    if (v.readyState >= 1) {
      startAuto();
    } else {
      v.addEventListener("loadedmetadata", startAuto, { once: true });
      return () => v.removeEventListener("loadedmetadata", startAuto);
    }
  }, []);

  // Advance toward next cue while animating
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTimeUpdate = () => {
      if (segmentIndex >= CUE_POINTS.length) return; // finished all cues
      const target = CUE_POINTS[segmentIndex];
      if (v.currentTime + EPS >= target) {
        v.pause();
        setIsAnimating(false);
        setSegmentIndex((i) => i + 1); // mark cue as completed
      }
    };

    if (isAnimating && segmentIndex < CUE_POINTS.length) {
      v.play().catch(() => {});
      v.addEventListener("timeupdate", onTimeUpdate);
    }

    return () => v.removeEventListener("timeupdate", onTimeUpdate);
  }, [isAnimating, segmentIndex]);

  // Wheel to advance: 2 plays + 1 exit
  useEffect(() => {
    const onWheel = (e) => {
      if (isAnimating) return;
      if (e.deltaY <= 0) return; // only respond to downward scroll

      // Still have cues to play?
      if (segmentIndex < CUE_POINTS.length) {
        setIsAnimating(true);
        videoRef.current?.play()?.catch(() => {});
        return;
      }

      // No more cues -> next scroll exits
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // match exit duration
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isAnimating, segmentIndex, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          {/* Video */}
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src="/videos/splashscreen.mp4" /* replace with your path */
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              autoPlay
            />
          </div>

          {/* Overlay UI */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
            {/* Skip */}
            <div className="w-full flex justify-end">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-white bg-black/30 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                Skip Intro
              </button>
            </div>

            {/* Progress dots: 3 total (for 1.40, 2.25, 5.00) */}
            <div className="flex space-x-3">
              {CUE_POINTS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    segmentIndex > idx ? "bg-white" : "bg-white/30"
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