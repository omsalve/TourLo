"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ScrollSplash from "./components/ScrollSplash";
import ScrollBrightText from "./components/RevealTex";
import CTA from "./components/CTA";
import Footer from "./components/footer";
import BentoGrid, { BentoGridItem } from './components/bento-grid';
import GridWrapper from "./components/GridWrapper";
import { BackgroundRippleEffect } from "@/cellgrid/ui/background-ripple-effect";
import AllDay from "./components/alldayallnight";
import { BentoGridSecondDemo } from "./components/2colgrid";

// Client-only load to avoid SSR observer/scroll issues

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Use a ref to access the video element in the DOM
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play the video when 100% of the element is in view
          videoElement.play().catch(error => {
            // Catch and ignore the common "The play() request was interrupted" error
            // This happens when the browser's autoplay policies interfere
            console.error("Video play failed:", error);
          });
        } else {
          // Pause the video when any part of it leaves the view
          videoElement.pause();
        }
      },
      {
        // The callback will be fired when 100% of the element is visible
        threshold: 1.0,
      }
    );

    observer.observe(videoElement);

    // Clean up the observer when the component unmounts
    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden scroll-smooth">
      {/* GLOBAL BACKGROUND – replaced DotGrid with BackgroundRippleEffect */}
      <ScrollProgressBar></ScrollProgressBar>
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {/* Same footprint; pointerEvents remain disabled to avoid intercepting UI clicks */}
        <BackgroundRippleEffect
          hoverfillAlpha={0.28}
          hoverBorderAlpha={0.6}
          hoverBrightness={1.8}
          rows={8}
          cols={27}
          cellSize={56}
        />
      </div>

      {/* Optional readability veil above the grid */}
      <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />

      {/* Added the ScrollSplash component here */}
      <ScrollSplash />

      {/* PAGE CONTENT */}
      <div className="relative z-10">
       {/* Hero Section */}
{/* Hero Section */}
<section className="relative flex min-h-[85svh] w-full flex-col items-center justify-center px-4 sm:px-6 text-white text-center">
  {/* Logo */}
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="absolute left-4 sm:left-8 top-2 sm:top-4"
  >
    <Image
      src="/images/logos/logo.png"
      alt="Logo"
      width={120}
      height={160}
      className="w-24 sm:w-36 lg:w-44 h-auto"
      priority
    />
  </motion.div>

  {/* Contact Button */}
  <motion.a
    href="#contact-us"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="absolute right-4 sm:right-6 top-3 sm:top-4 cursor-pointer rounded-lg bg-transparent px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white/70 transition hover:text-white"
  >
    CONTACT US
  </motion.a>

  {/* Hero Content */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="max-w-3xl flex flex-col items-center justify-center text-center"
  >
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
      Let’s Think <br /> Beyond the Brochure.
    </h1>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-8 rounded-md bg-sky-500 px-7 py-3 text-base sm:text-lg font-semibold text-white shadow-lg transition hover:bg-sky-600"
    >
      Watch Video →
    </motion.button>

    <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-300">
      Tour-Lo helps you sell smarter, close faster. <br />
      Built to turn brochures into immersive experiences. <br />
      A simple tool that makes selling unforgettable.
    </p>
  </motion.div>
</section>

        {/* Video Card Section */}
        <section id="promo" className="relative w-full py-12" >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full px-6 flex justify-center"
          >
            {/* Card */}
            <div className="relative w-full max-w-[80vw] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden y-translate-[-200px]">
              <video
  // Add the ref to the video element
  ref={videoRef}
  src="/videos/promo.mp4"
  poster="/images/video-poster.jpg"
  className="w-full h-full object-cover"
  // Add the controls attribute to show the play button
  controls
  muted
  // Remove the loop attribute
  playsInline
  preload="metadata"
/>
            </div>
          </motion.div>
        </section>

        {/* What We Do (aligned to Hero text) */}
<motion.section
  className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-white text-center"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, y: 50 },
  }}
>
  <div className="mx-auto w-full max-w-5xl px-6">
    <motion.h1
      // Reduced the base font size slightly to ensure the longest line fits on all phones.
      className="mb-6 font-bold leading-tight text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-center"
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
    >
      {/* Line 1: Wrapped in a span to prevent it from breaking */}
      <span className="whitespace-nowrap">We&apos;re Redefining</span>

      {/* This <br> only appears on mobile, creating the two-line layout */}
      <br className="sm:hidden" />
      {' '}

      {/* Line 2: The colored text, also prevented from breaking */}
      <span className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">
        Real Estate Sales.
      </span>
    </motion.h1>

    <div className="w-full max-w-3xl mx-auto">
      <ScrollBrightText sentence="From interactive walkthroughs to unit-level interaction—Tour-Lo helps buyers decide faster, and developers close quicker." />
    </div>
  </div>
</motion.section>

        <section className="relative z-20 w-full my-50 -translate-y-[120px] md:-translate-y-[150px] lg:-translate-y-[230px]">
          <div
            id="grid-wrapper-container"
            className="relative mx-auto max-w-7xl px-6 -translate-y-10 md:-translate-y-16 lg:-translate-y-24"
          >
            {/* The GridWrapper component is now used here */}
            <BentoGridSecondDemo />
          </div>
        </section>

        {/* Apple Type Section - Added negative margin to reduce space */}
        <section className="-mt-24 md:-mt-32 lg:-mt-48">
          <GridWrapper />
        </section>

        {/* All Day All Night Section - Added margin-top for spacing */}
        <section className="relative z-10 flex items-center justify-center min-h-screen px-6 text-white mt-12 md:mt-16 lg:mt-20">
          <AllDay />
        </section>

        {/* Contact Us Section */}
        <motion.section
          id="contact-us"
          className="relative flex min-h-screen w-full items-center justify-center px-6 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-5xl">
            <CTA />
          </div>
        </motion.section>
      </div>

      <section>
        <Footer />
      </section>
      {/* Footer */}

      {/* ScrollStack scrollbar hide */}
      <style jsx global>{`
        /* Hide scrollbar but keep scrolling, scoped to ScrollStack area */
        #scrollstack,
        #scrollstack * {
          -ms-overflow-style: none; /* IE/old Edge */
          scrollbar-width: none; /* Firefox */
        }
        #scrollstack::-webkit-scrollbar,
        #scrollstack *::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Edge/Opera */
        }
      `}</style>
    </div>
  );
}
