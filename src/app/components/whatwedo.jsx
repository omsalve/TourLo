"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../../../reactbitscomp/TextAnimations/ScrollReveal/ScrollReveal";
import React from "react";

function WhatWeDo() {
  return (
    <main className="relative flex items-center justify-center">
      {/* Wrapper with relative positioning */}
      <div className="relative w-full max-w-4xl">
        {/* Headline sits on top */}
        <h1>We're Redefining Real Estate Sales.</h1>


        {/* ScrollReveal sits below */}
        <div className="pt-12"> 
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={20}
            textClassName="text-[clamp(0.5rem,1.5vw,0.5rem)] text-gray-300 font-light leading-[1.3] text-center"
          >
            From interactive walkthroughs to unit-level interaction—Tour-Lo helps
            buyers decide faster, and developers close quicker.
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}

export default WhatWeDo;
