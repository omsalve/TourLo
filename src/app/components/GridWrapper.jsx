"use client";

import Image from "next/image";
import React from "react";

export default function GridWrapper() {
  return (
    <section className="relative mx-auto max-w-6xl p-[2px] rounded-[28px] bg-[linear-gradient(90deg,rgba(250,66,167,.6),rgba(118,70,255,.6),rgba(0,174,255,.6))]">
      {/* Inner container */}
      <div className="relative rounded-[26px] bg-black text-white overflow-hidden">
        {/* Soft edge glows */}
        <div className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

        {/* Header copy */}
        <div className="px-6 sm:px-10 lg:px-16 pt-28 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span className="whitespace-nowrap bg-clip-text text-transparent
  bg-[linear-gradient(90deg,#00b3ff_0%,#00ffff_55%,#7ea8ff_80%,#a884ff_100%)]">
              Tour-Lo Third-Eye.
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="text-5xl font-semibold tracking-normal">Nothing gets missed.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
            <span className="text-white font-bold"> Genius, at the point of sale: </span>
            Tour‑Lo is not just a tool — it’s the new language of real estate.
It helps to present with <span className="text-white font-bold">precision, emotion, and confidence. </span>
With interactive storytelling and jaw-dropping visuals, <br />it sells experiences, not just homes.
Your pitch just got sharper, faster, and smarter.
          </p>

          <a
            href="#"
            className="mt-4 inline-block text-sm sm:text-base font-medium bg-clip-text text-transparent bg-[#51b8ff] hover:opacity-90"
          >
           A seamless, cinematic, tap-and-glide sales experience ›
          </a>
        </div>

        {/* Mockup card */}
        <div className="px-4 sm:px-8 pb-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,.45)] overflow-hidden">
            <video
              src="/videos/testvideo.mp4"
              autoPlay
              muted
              loop
              width={1600}
              height={900}
              className="h-auto w-full"
            />
          </div>

          {/* Tabs */}
          <div className="mt-16 flex flex-col items-center">
            <nav className="flex items-center gap-8 text-sm sm:text-base">
              <button className="relative font-medium text-white">
                3D Digital Twin
                <span className="absolute -bottom-2 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#51b8ff,#8d66ff,#ff76af)]" />
              </button>
              <button className="text-white/60 hover:text-white transition">Neighborhood</button>
              <button className="text-white/60 hover:text-white transition">
                Realtime Inventory
              </button>
              <button className="text-white/60 hover:text-white transition">
                Connectivity
              </button>
              <button className="text-white/60 hover:text-white transition">
                TBD
              </button>
            </nav>

            <div className="mt-3 text-center max-w-2xl text-xs sm:text-sm text-white/65">
              Writing Tools can proofread your text and rewrite different
              versions until the tone and wording are just right, and summarize
              selected text with a click.
            </div>

            {/* accent bar */}
            <div className="mt-4 h-[2px] w-32 rounded-full bg-[linear-gradient(90deg,#51b8ff,#8d66ff,#ff76af)]" />
          </div>
        </div>
      </div>
    </section>
  );
}