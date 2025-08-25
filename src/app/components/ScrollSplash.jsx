"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Timecodes (MM:SS → seconds):
 * 1:40 → 100
 * 4:08 → 248
 * 6:30 → 390
 */
const CUE_POINTS = [100, 248, 390];
const EPS = 0.02; // tolerance for clamping

export default function ScrollSplash({ onComplete }) {
  const videoRef = useRef(null);
  const rafRef = useRef(0);

  const bodyOverflowRef = useRef("");
  const htmlOverflowRef = useRef("");

  // how many cues have been reached (0..CUE_POINTS.length)
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const isActive = !isExiting;

  // Lock page scroll while splash is up
  useEffect(() => {
    bodyOverflowRef.current = document.body.style.overflowY || "";
    htmlOverflowRef.current = document.documentElement.style.overflowY || "";
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = bodyOverflowRef.current || "auto";
      document.documentElement.style.overflowY =
        htmlOverflowRef.current || "auto";
    };
  }, []);

  // Also unlock immediately when exiting starts
  useEffect(() => {
    if (isExiting) {
      document.body.style.overflowY = bodyOverflowRef.current || "auto";
      document.documentElement.style.overflowY =
        htmlOverflowRef.current || "auto";
    }
  }, [isExiting]);

  // Cancel any in-flight RAF
  const cancelRAF = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  // Drive the video to a target time and pause/clamp there
  const playTo = (targetSeconds) => {
    const v = videoRef.current;
    if (!v) return;

    cancelRAF();

    // Ensure playback starts (no autoplay attr on <video>)
    v.play().catch(() => {});

    const tick = () => {
      if (!v) return;
      if (v.currentTime + EPS >= targetSeconds) {
        try {
          v.pause();
          v.currentTime = targetSeconds; // clamp EXACTLY
        } catch {}
        cancelRAF();
        setSegmentIndex((i) => i + 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  // Start the auto segment: 0 → 1:40
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const start = () => {
      try {
        v.currentTime = 0;
      } catch {}
      playTo(CUE_POINTS[0]);
    };

    if (v.readyState >= 1) {
      start();
    } else {
      v.addEventListener("loadedmetadata", start, { once: true });
      return () => v.removeEventListener("loadedmetadata", start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel to advance (only while active)
  useEffect(() => {
    if (!isActive) return;

    const onWheel = (e) => {
      // prevent the page from scrolling while splash is active
      e.preventDefault();

      // still have cues to play?
      if (segmentIndex < CUE_POINTS.length) {
        playTo(CUE_POINTS[segmentIndex]);
        return;
      }

      // no more cues -> exit on next scroll
      if (!isExiting) {
        setIsExiting(true);
        // optional: notify parent after fade
        setTimeout(() => onComplete && onComplete(), 1000);
      }
    };

    // Non-passive so preventDefault works
    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("wheel", onWheel);
    };
  }, [isActive, segmentIndex, isExiting, onComplete]);

  // Touch (mobile) to advance (only while active)
  useEffect(() => {
    if (!isActive) return;

    let startY = null;

    const onTouchStart = (e) => {
      startY = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (startY == null) return;
      const dy = (e.touches?.[0]?.clientY ?? startY) - startY;
      if (dy < -18) {
        e.preventDefault();
        if (segmentIndex < CUE_POINTS.length) {
          playTo(CUE_POINTS[segmentIndex]);
        } else if (!isExiting) {
          setIsExiting(true);
          setTimeout(() => onComplete && onComplete(), 1000);
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isActive, segmentIndex, isExiting, onComplete]);

  // Fallback: if the video ends for any reason, exit
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      setIsExiting(true);
      setTimeout(() => onComplete && onComplete(), 1000);
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [onComplete]);

  // Cleanup RAF on unmount
  useEffect(() => cancelRAF, []);

  const handleSkip = () => {
    cancelRAF();
    setIsExiting(true);
    setTimeout(() => onComplete && onComplete(), 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          // during fade-out, let page receive events
          style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
          {/* Video */}
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src="/videos/splashscreen.mp4"  // <-- your path
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              // NOTE: no 'autoPlay' attribute; we drive it manually
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

            {/* Progress dots for 1:40, 4:08, 6:30 */}
            <div className="flex space-x-3">
              {CUE_POINTS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx < segmentIndex ? "bg-white" : "bg-white/30"
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