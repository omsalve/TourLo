"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Optimization: Define variants outside the component ---
// This prevents them from being re-created on every render.
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      className="
        relative w-full min-h-screen overflow-hidden 
        bg-black text-white
        flex flex-col items-center justify-center
        px-6 md:px-12
      "
    >
      {/* Visual Enhancement: Subtle background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,153,255,.15),rgba(255,255,255,0))]"></div>
      </div>
      
      {/* ======= Header ======= */}
      {/* Note: Padding is inherited from the parent section for consistency */}
      <header
        className="
          absolute top-0 left-0 right-0 z-20
          w-full flex items-center justify-between
          py-6
        "
      >
        {/* Logo */}
        <h1
          className="
            text-3xl lg:text-4xl font-bold tracking-wider 
            cursor-default
          "
        >
          TOUR-LO
        </h1>

        {/* Semantic CTA: Use <a> for navigation */}
        <a
          href="#contact-us"
          className="
            cursor-pointer rounded-full
            border border-white/20 hover:border-white/50
            px-5 py-2.5 text-sm font-medium
            text-white/80 hover:text-white 
            transition-colors duration-300
          "
        >
          CONTACT US
        </a>
      </header>

      {/* ======= Hero Content ======= */}
      <motion.div
  className="
    relative z-10 w-full max-w-5xl
    flex flex-col items-center text-center space-y-6
  "
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
>
  {/* Title */}
  <motion.h1
    className="
      font-extrabold leading-tight
      text-[clamp(2.5rem,7vw,4.5rem)]
    "
    variants={fadeInUp}
  >
    Let&apos;s Think <br /> Beyond the Brochure.
  </motion.h1>

  {/* Description */}
  <motion.p
    className="
      max-w-xl text-gray-300
      text-lg lg:text-xl leading-relaxed
    "
    variants={fadeInUp}
  >
    Tour-Lo helps you sell smarter, close faster. Built to turn brochures
    into immersive experiences. A simple tool that makes selling
    unforgettable.
  </motion.p>

  {/* CTA Button */}
  <motion.button
    href="#video"
    className="
      mt-4 inline-block rounded-full
      bg-gradient-to-r from-cyan-400 to-blue-500
      px-8 py-4
      text-base font-semibold text-white
      shadow-lg shadow-cyan-500/20
    "
    variants={fadeInUp}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
  >
    Watch The Video →
  </motion.button>
</motion.div>

    </section>
  );
}