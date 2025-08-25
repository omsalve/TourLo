"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data for the three cards with the new detailed content ---
const CARDS = [
  {
    id: 1,
    title: "Real-time 3D virtual tours",
    bgColor: "bg-gray-800",
    content: (
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-left p-8 md:p-12">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Real-time 3D virtual tours with interactive hotspots
          </h3>
          <p className="mb-6 text-white/80">
            Deliver an intuitive and immersive journey with clickable hotspots,
            seamless movement, and rich context baked into every scene.
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
                  className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400"
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
    id: 2,
    title: "Digitised location mapping",
    bgColor: "bg-gray-800",
    content: (
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-left p-8 md:p-12">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Digitised location mapping
          </h3>
          <p className="mb-6 text-white/80">
            Present schools, transit, essentials, and lifestyle hotspots in a
            clean, tappable map that answers “what’s nearby?” instantly.
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
                  className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400"
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
    id: 3,
    title: "Hyperreal customisation",
    bgColor: "bg-gray-800",
    content: (
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-left p-8 md:p-12">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Hyperreal customisation
          </h3>
          <p className="mb-6 text-white/80">
            Swap finishes, palettes, and layouts in-place to help buyers
            “see” their future home in seconds.
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
                  className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400"
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
];

/**
 * CardWrapper Component
 * Displays a grid of cards that expand on hover to reveal more content.
 */
export default function CardWrapper() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="relative mx-auto max-w-6xl p-4 md:p-8 bg-black rounded-2xl">
      <div
        onMouseLeave={() => setActiveCard(null)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] relative"
      >
        {/* Render the initial set of cards */}
        {CARDS.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            onHoverStart={() => setActiveCard(card.id)}
            className={`relative h-full rounded-lg overflow-hidden cursor-pointer ${card.bgColor}`}
          >
            <div className="absolute inset-0 bg-black/50 flex items-end p-6">
              <h2 className="text-2xl font-bold text-white">{card.title}</h2>
            </div>
          </motion.div>
        ))}

        {/* AnimatePresence handles the appearance of the expanded card */}
        <AnimatePresence>
          {activeCard !== null && (
            <motion.div
              layoutId={`card-${activeCard}`}
              className={`absolute inset-0 h-full w-full rounded-lg overflow-hidden ${
                CARDS.find((c) => c.id === activeCard)?.bgColor
              }`}
            >
              <div className="absolute inset-0 bg-black/40">
                {CARDS.find((c) => c.id === activeCard)?.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
