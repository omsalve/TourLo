"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Data and Type Definitions ---

type Tab = {
  label: string;
  src: string;
};

const TABS: Tab[] = [
  { label: "3D Digital Twin", src: "/videos/gridvideos/testvideo.mp4" },
  { label: "Neighborhood", src: "/videos/gridvideos/neighbourhood.mp4" },
  { label: "Connectivity", src: "/videos/gridvideos/connectivity.mp4" },
  { label: "Virtual Tour", src: "/videos/gridvideos/virtualtour.mp4" },
  { label: "Realtime Inventory", src: "/videos/gridvideos/inventory.mp4" },
];

// --- Sub-components ---

const GridHeader = () => (
  <div className="px-6 sm:px-10 lg:px-16 pt-[100px] sm:pt-[150px] lg:pt-[200px] pb-12 sm:pb-16 text-center">
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-cyan-300">
        Tour-Lo Third-Eye.
      </span>{" "}
      {/* CORRECTED: Removed all classes from the <br> tag to make it permanent. */}
      <br />
      <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-normal">
        Nothing gets missed.
      </span>
    </h1>
    <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
      <span className="text-white font-bold">Genius, at the point of sale: </span>
      Tour-Lo is not just a tool — it’s the new language of real estate. It helps to
      present with <span className="text-white font-bold">precision, emotion, and confidence.</span> With
      interactive storytelling and jaw-dropping visuals, <br /> it sells
      experiences, not just homes. Your pitch just got sharper, faster, and
      smarter.
    </p>
    <a
      href="#"
      className="mt-4 inline-block text-sm sm:text-base font-medium bg-clip-text text-transparent bg-[#51b8ff] hover:opacity-90"
    >
      A seamless, cinematic, tap-and-glide sales experience ›
    </a>
  </div>
);

const VideoSlider = ({ tabs, active }: { tabs: Tab[]; active: number }) => (
  <div className="relative mx-auto max-w-5xl overflow-hidden">
    <motion.div
      className="flex w-full"
      animate={{ x: `-${active * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {tabs.map((tab) => (
        <div key={tab.label} className="w-full shrink-0 px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden">
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
);

const SliderTabs = ({
  tabs,
  active,
  onTabClick,
}: {
  tabs: Tab[];
  active: number;
  onTabClick: (index: number) => void;
}) => (
  <div className="mt-12 sm:mt-16 flex flex-col items-center">
    <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8 text-sm sm:text-base">
      {tabs.map((tab, idx) => {
        const isActive = idx === active;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onTabClick(idx)}
            className={`relative font-medium ${
              isActive
                ? "text-white"
                : "text-white/60 hover:text-white transition"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  </div>
);

// --- Main Component ---

export default function GridWrapper() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative mx-auto -translate-y-[100px] sm:-translate-y-[150px] lg:-translate-y-[200px] max-w-6xl p-[2px] rounded-[28px] bg-[linear-gradient(180deg,#333,#fff)]">
      <div className="relative rounded-[26px] bg-black/80 text-white overflow-hidden">
        <GridHeader />
        <div className="px-2 sm:px-8 pb-12 sm:pb-20">
          <VideoSlider tabs={TABS} active={active} />
          <SliderTabs tabs={TABS} active={active} onTabClick={setActive} />
        </div>
      </div>
    </section>
  );
}