"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

import ScrollProgressBar from "./components/ScrollProgressBar";
import ScrollSplash from "./components/ScrollSplash";
import ScrollBrightText from "./components/RevealTex";
import CTA from "./components/CTA";
import Footer from "./components/footer";
import GridWrapper from "./components/GridWrapper";
import { BackgroundRippleEffect } from "@/cellgrid/ui/background-ripple-effect";
import AllDay from "./components/alldayallnight";
import { BentoGridSecondDemo } from "./components/2colgrid";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Hero() {
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement
            .play()
            .catch((error) =>
              console.error("Video play failed:", error)
            );
        } else {
          videoElement.pause();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden scroll-smooth">
      {/* Background */}
      <ScrollProgressBar />
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <BackgroundRippleEffect
          hoverfillAlpha={0.28}
          hoverBorderAlpha={0.6}
          hoverBrightness={1.8}
          rows={8}
          cols={27}
          cellSize={56}
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />

      <ScrollSplash />

      {/* MAIN PAGE CONTENT */}
      <div className="relative z-10">
        {/* ---------------- HERO SECTION ---------------- */}
        <section className="relative flex min-h-[85svh] w-full flex-col items-center justify-center px-4 sm:px-6 text-white text-center md:items-start md:text-left md:pl-[150px]">
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
            className="max-w-3xl flex flex-col justify-center items-center text-center md:items-start md:text-left"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Let’s Think <br className="block md:hidden" /> Beyond the
              Brochure.
            </h1>

            {/* Watch Video Button */}
            <motion.button
              onClick={scrollToVideo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 rounded-md bg-sky-500 px-7 py-3 text-base sm:text-lg font-semibold text-white shadow-lg transition hover:bg-sky-600 md:self-start"
            >
              Watch Video →
            </motion.button>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-gray-300">
              Tour-Lo helps you sell smarter, close faster. <br className="block md:hidden" />
              Built to turn brochures into immersive experiences. <br className="block md:hidden" />
              A simple tool that makes selling unforgettable.
            </p>
          </motion.div>
        </section>

        {/* ---------------- PROMO VIDEO SECTION ---------------- */}
        <section
          id="promo"
          ref={videoSectionRef}
          className="relative w-full py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full px-6 flex justify-center"
          >
            <div className="relative w-full max-w-[80vw] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/promo.mp4"
                poster="/images/video-poster.jpg"
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        </section>

        {/* ---------------- REDEFINING SALES SECTION ---------------- */}
        <motion.section
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-white text-center md:items-start md:text-left md:pl-[150px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            hidden: { opacity: 0, y: 50 },
          }}
        >
          <div className="w-full max-w-5xl md:max-w-none">
            <motion.h1
              className="mb-6 font-bold leading-tight text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <span className="whitespace-nowrap">We&apos;re Redefining</span>
              <br className="sm:hidden" />{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">
                Real Estate Sales.
              </span>
            </motion.h1>

            <div className="w-full max-w-3xl md:max-w-full text-center md:text-left">
              <ScrollBrightText sentence="From interactive walkthroughs to unit-level interaction—Tour-Lo helps buyers decide faster, and developers close quicker." />
            </div>
          </div>
        </motion.section>

        {/* ---------------- GRID SECTIONS ---------------- */}
        <section className="relative z-20 w-full my-50 -translate-y-[120px] md:-translate-y-[150px] lg:-translate-y-[230px]">
          <div
            id="grid-wrapper-container"
            className="relative mx-auto max-w-7xl px-6 -translate-y-10 md:-translate-y-16 lg:-translate-y-24"
          >
            <BentoGridSecondDemo />
          </div>
        </section>

        <section className="-mt-24 md:-mt-32 lg:-mt-48">
          <GridWrapper />
        </section>

        {/* ---------------- ALL DAY ALL NIGHT SECTION ---------------- */}
        <section className="relative z-10 flex items-center justify-center min-h-screen px-6 text-white mt-12 md:mt-16 lg:mt-20">
          <AllDay />
        </section>

        {/* ---------------- CONTACT SECTION ---------------- */}
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

      {/* ---------------- FOOTER ---------------- */}
      <section>
        <Footer />
      </section>

      {/* ---------------- SCROLLBAR HIDE ---------------- */}
      <style jsx global>{`
        #scrollstack,
        #scrollstack * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        #scrollstack::-webkit-scrollbar,
        #scrollstack *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
