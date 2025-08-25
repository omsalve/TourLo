"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import ScrollSplash from "./components/ScrollSplash";
import ScrollBrightText from "./components/RevealTex";
import CTA from "./components/CTA";
import Footer from "./components/footer";
import GridWrapper from "./components/GridWrapper";
import { BackgroundRippleEffect } from "@/cellgrid/ui/background-ripple-effect";
import { TextRevealCard } from "./components/text-reveal-card";
import AllDay from "./components/alldayallnight";

// Client-only load to avoid SSR observer/scroll issues
const ScrollStack = dynamic(
  () => import("@/app/components/lightswind/scroll-stack"),
  { ssr: false }
);

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

  return (
    <div className="relative w-full min-h-screen overflow-hidden scroll-smooth">
      {/* GLOBAL BACKGROUND – replaced DotGrid with BackgroundRippleEffect */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {/* Same footprint; pointerEvents remain disabled to avoid intercepting UI clicks */}
        <BackgroundRippleEffect hoverfillAlpha={0.28} hoverBorderAlpha={0.6} hoverBrightness={1.8} rows={8} cols={27} cellSize={56} />
      </div>

      {/* Optional readability veil above the grid */}
      <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex min-h-[85svh] w-full flex-col items-center justify-center px-6 text-white">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute left-8 top-1"
          >
            <Image
              src="/images/logos/logo.png"
              alt="Logo"
              width={150}
              height={200}
              priority
            />
          </motion.div>

          {/* Contact Button */}
          <motion.a
            href="#contact-us"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute right-6 top-4 cursor-pointer rounded-lg bg-transparent px-5 py-2 text-white/70 transition hover:text-white sm:px-6 sm:py-3"
          >
            CONTACT US
          </motion.a>

          {/* Hero Text */}
          <motion.div
            style={{ marginLeft: "-200px" }}
            className="w-full max-w-5xl flex flex-col items-start space-y-8 text-center sm:text-left"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.h1
              className="font-extrabold leading-tight text-3xl sm:text-[clamp(2rem,6vw,4rem)]"
              variants={fadeInUp}
            >
              Let’s Think <br /> Beyond the Brochure.
            </motion.h1>

            <motion.button
              className="rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
              variants={fadeInUp}
            >
              Watch Video →
            </motion.button>

            <motion.p
              className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
              variants={fadeInUp}
            >
              Tour-Lo helps you sell smarter, close faster. <br />
              Built to turn brochures into immersive experiences. <br />
              A simple tool that makes selling unforgettable.
            </motion.p>
          </motion.div>
        </section>
        {/* Video Card Section */}
        <section className="relative w-full py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full px-6 flex justify-center"
          >
            {/* Card */}
            <div className="relative w-full max-w-[80vw] aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
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
        </section>

        {/* What We Do (aligned to Hero text) */}
        <motion.section
          style={{ marginLeft: "75px" }}
          className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            hidden: { opacity: 0, y: 50 },
          }}
        >
          <div className="mx-auto w-full max-w-5xl px-6">
            <div style={{ marginLeft: "-200px" }}>
              <motion.h1
                className="mb-6 max-h-[200px] text-4xl font-bold leading-tight md:text-6xl overflow-hidden"
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                transition={{
                  duration: 2, // slow + cinematic
                  ease: "easeInOut",
                }}
              >
                We&apos;re Redefining Real Estate Sales.
              </motion.h1>

              <div className="w-full max-w-3xl text-left">
                <ScrollBrightText sentence="From interactive walkthroughs to unit-level interaction—Tour-Lo helps buyers decide faster, and developers close quicker." />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ScrollStack */}
        <section className="relative z-20 w-full -translate-y-[120px] md:-translate-y-[150px] lg:-translate-y-[230px]">
          <div
            id="scrollstack"
            className="relative mx-auto max-w-8xl px-6 -translate-y-10 md:-translate-y-16 lg:-translate-y-24"
          >
            <ScrollStack
              backgroundColor="bg-transparent"
              cards={[
                {
                  title:
                    "Real-time 3D virtual tours with interactive hotspots",
                  subtitle:
                    "Experience unmatched realism and precision with our comprehensive 3D 360 VR tours.",
                  content: (
                    <div className="flex w-full flex-col md:flex-row">
                      {/* Left Half: text (inset by 50px) */}
                      <div className="w-full md:w-1/2 text-left pr-0 md:pr-8 p-[50px]">
                        <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                          Real-time 3D virtual tours with interactive hotspots
                        </h3>
                        <p className="mb-6 text-white">
                          Deliver an intuitive and immersive journey with
                          clickable hotspots, seamless movement, and rich
                          context baked into every scene.
                        </p>
                        <ul className="mt-2 space-y-3">
                          {[
                            "360° scenes with smooth transitions",
                            "Clickable hotspots for deep dives",
                            "Optimized for web & mobile",
                            "Shareable links with tracking",
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-3">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mt-1 h-5 w-5 flex-shrink-0 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 5.296a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.296 10.45a1 1 0 111.414-1.414l3.02 3.02 6.657-6.657a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-white/80">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  ),
                },
                {
                  title: "Digitised location mapping",
                  content: (
                    <div className="flex w-full flex-col md:flex-row">
                      <div className="w-full md:w-1/2 text-left pr-0 md:pr-8 p-[50px]">
                        <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                          Digitised location mapping
                        </h3>
                        <p className="mb-6 text-white">
                          Present schools, transit, essentials, and lifestyle
                          hotspots in a clean, tappable map that answers “what’s
                          nearby?” instantly.
                        </p>
                        <ul className="mt-2 space-y-3">
                          {[
                            "Curated POIs by category",
                            "Distance & time estimates",
                            "Filter by buyer persona",
                            "Embeddable map sections",
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-3">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mt-1 h-5 w-5 flex-shrink-0 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 5.296a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.296 10.45a1 1 0 111.414-1.414l3.02 3.02 6.657-6.657a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-white/80">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  ),
                },
                {
                  title: "Hyperreal customisation",
                  content: (
                    <div className="flex w-full flex-col md:flex-row">
                      <div className="w-full md:w-1/2 text-left pr-0 md:pr-8 p-[50px]">
                        <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                          Hyperreal customisation
                        </h3>
                        <p className="mb-6 text-white">
                          Swap finishes, palettes, and layouts in-place to help
                          buyers “see” their future home in seconds.
                        </p>
                        <ul className="mt-2 space-y-3">
                          {[
                            "Material & palette toggles",
                            "Saved presets per buyer",
                            "One-click before/after",
                            "Export selections as PDF",
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-3">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mt-1 h-5 w-5 flex-shrink-0 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 5.296a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.296 10.45a1 1 0 111.414-1.414l3.02 3.02 6.657-6.657a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-white/80">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* Apple Type Section - Added negative margin to reduce space */}
        <section className="-mt-24 md:-mt-32 lg:-mt-48">
          <GridWrapper />
        </section>

        {/* All Day All Night Section - Added margin-top for spacing */}
        <section className="relative z-10 flex items-center justify-center min-h-screen px-6 text-white mt-32">
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
