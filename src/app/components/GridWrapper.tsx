"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { label: "3D Digital Twin", src: "/videos/testvideo.mp4" },
  { label: "Neighborhood", src: "/videos/neighborhood.mp4" },
  { label: "Connectivity", src: "/videos/connectivity.mp4" },
  { label: "Virtual Tour", src: "/videos/connectivity.mp4" },
  { label: "Realtime Inventory", src: "/videos/realtime-inventory.mp4" },
];

export default function GridWrapper() {
  const [active, setActive] = useState(0);
  const handleTab = (idx: number) => setActive(idx);

  return (
    <section className="relative mx-auto max-w-6xl p-[2px] rounded-[28px] bg-[linear-gradient(90deg,rgba(250,66,167,.6),rgba(118,70,255,.6),rgba(0,174,255,.6))]">
      {/* Inner container */}
      <div className="relative rounded-[26px] bg-black text-white overflow-hidden">
        {/* Soft edge glows */}
        <div className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

        {/* Header copy */}
        <div className="px-6 sm:px-10 lg:px-16 pt-28 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span className="whitespace-nowrap bg-clip-text text-transparent bg-[linear-gradient(90deg,#00b3ff_0%,#00ffff_55%,#7ea8ff_80%,#a884ff_100%)]">
              Tour-Lo Third-Eye.
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="text-5xl font-semibold tracking-normal">Nothing gets missed.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
            <span className="text-white font-bold">Genius, at the point of sale: </span>
            Tour-Lo is not just a tool — it’s the new language of real estate.
            It helps to present with <span className="text-white font-bold">precision, emotion, and confidence.</span>
            With interactive storytelling and jaw-dropping visuals, <br /> it sells experiences, not just homes.
            Your pitch just got sharper, faster, and smarter.
          </p>

          <a
            href="#"
            className="mt-4 inline-block text-sm sm:text-base font-medium bg-clip-text text-transparent bg-[#51b8ff] hover:opacity-90"
          >
            A seamless, cinematic, tap-and-glide sales experience ›
          </a>
        </div>

        {/* Mockup cards slider (each video has its own card) */}
        <div className="px-4 sm:px-8 pb-20">
          {/* Viewport (masks the sliding cards) */}
          <div className="relative mx-auto max-w-4xl overflow-hidden">
            {/* Horizontal track */}
            <motion.div
              className="flex w-full"
              animate={{ x: `-${active * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              {TABS.map((tab) => (
                // Padding here creates visible spacing between slides,
                // while each slide still occupies 100% width for the transform math.
                <div key={tab.label} className="w-full shrink-0 px-4 sm:px-6">
                  {/* Each slide is its OWN container/card */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
                    <video
                      src={tab.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      width={1600}
                      height={900}
                      className="block w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16 flex flex-col items-center">
            <nav className="flex items-center gap-8 text-sm sm:text-base">
              {TABS.map((tab, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => handleTab(idx)}
                    className={`relative font-medium ${
                      isActive ? "text-white" : "text-white/60 hover:text-white transition"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[linear-gradient(90deg,#51b8ff,#8d66ff,#ff76af)]"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-3 text-center max-w-2xl text-xs sm:text-sm text-white/65">
              Writing Tools can proofread your text and rewrite different versions until the tone and wording are just right,
              and summarize selected text with a click.
            </div>

            <div className="mt-4 h-[2px] w-32 rounded-full bg-[linear-gradient(90deg,#51b8ff,#8d66ff,#ff76af)]" />
          </div>
        </div>
      </div>
    </section>
  );
}