"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-black text-white flex items-center justify-between px-6">
      
      {/* Logo on the left */}
      <div>
        <img src="/images/logo.png" alt="Tour-Lo Logo" className="h-12 w-auto" />
      </div>
      
      {/* Hero Content */}
      <div className="w-full max-w-6xl flex flex-col items-start space-y-8">
        
        {/* Heading */}
        <h1
          className="font-extrabold leading-tight"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)", // fluid 40px → 96px
            lineHeight: "1.1",
          }}
        >
          Let&apos;s Think <br />
          Beyond the Brochure.
        </h1>

        {/* Button */}
        <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
          Watch Video →
        </button>

        {/* Supporting Text */}
        <p className="text-lg text-gray-300 max-w-2xl">
          Tour-Lo helps to sell smarter, close faster. <br />
          Built to turn brochures into experiences. <br />
          A simple tool that sells with immersion.
        </p>
      </div>
    </section>
  );
}
