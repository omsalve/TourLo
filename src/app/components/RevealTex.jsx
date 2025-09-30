"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Removed fixed style props (fontSize, lineHeight) and added a flexible `className` prop.
const ScrollBrightText = ({ sentence = "", className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !sentence) return;

    const words = Array.from(containerRef.current.querySelectorAll(".word"));
    const totalWords = words.length;

    // GSAP animation logic remains the same as it controls the effect, not the layout.
    gsap.set(words, { opacity: 0.6, filter: "brightness(70%)" });
    gsap.set(containerRef.current, { opacity: 0.6, filter: "brightness(70%)" });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 100%",
      end: "bottom 70%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.floor(progress * totalWords);

        gsap.to(containerRef.current, {
          opacity: 1,
          filter: "brightness(100%)",
          duration: 0.4,
          ease: "power1.out",
        });

        words.forEach((word, i) => {
          const targetBrightness = i < index ? "100%" : "50%";
          const targetOpacity = i < index ? 1 : 0.6;

          gsap.to(word, {
            opacity: targetOpacity,
            filter: `brightness(${targetBrightness})`,
            duration: 0.2,
            ease: "power1.out",
          });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sentence]);

  if (!sentence) return null;

  return (
    // RESPONSIVE REWRITE:
    // Replaced the inline `style` attribute with responsive Tailwind classes.
    // - Font size scales from `text-xl` on mobile up to `text-3xl`.
    // - Line height is now responsive (`leading-relaxed`, `md:leading-loose`).
    // - Vertical margin is reduced on mobile (`my-24`) and larger on desktop (`md:my-48`).
    // - Text is centered and has a max-width for better readability on large screens.
    <p
      ref={containerRef}
      className={`
        text-center 
        text-xl leading-relaxed 
        sm:text-2xl 
        md:text-3xl md:leading-loose 
        my-24 md:my-48 mx-auto
        max-w-4xl
        ${className}
      `}
    >
      {sentence.split(" ").map((word, index) => (
        <span
          key={index}
          className="word"
          // This inline style is fine as it controls word spacing, not overall layout.
          style={{ marginRight: "8px", display: "inline-block" }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default ScrollBrightText;