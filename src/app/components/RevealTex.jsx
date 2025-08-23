"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollBrightText = ({ sentence = "", fontSize = "2rem", lineHeight = "3rem" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !sentence) return;

    const words = Array.from(containerRef.current.querySelectorAll(".word"));
    const totalWords = words.length;

    // Initialize all words dimmed
    words.forEach((word) => gsap.set(word, { opacity: 0.1, filter: "brightness(50%)" }));

    // Single ScrollTrigger for the whole container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 100%",
      end: "bottom 75%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const index = Math.floor(progress * totalWords); // which word should light up

        words.forEach((word, i) => {
          if (i <= index) {
            gsap.to(word, { 
              opacity: 1, 
              filter: "brightness(100%)", 
              duration: 0.2, 
              ease: "power1.out" 
            });
          } else {
            gsap.to(word, { 
              opacity: 0.1, 
              filter: "brightness(50%)", 
              duration: 0.2, 
              ease: "power1.out" 
            });
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sentence]);

  if (!sentence) return null;

  return (
    <h1
      ref={containerRef}
      style={{
        fontSize,
        lineHeight,
        margin: "200px 20px",
      }}
    >
      {sentence.split(" ").map((word, index) => (
        <span
          key={index}
          className="word"
          style={{ marginRight: "8px", display: "inline-block" }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
};

export default ScrollBrightText;
