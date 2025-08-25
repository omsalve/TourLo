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
    words.forEach((word) =>
      gsap.set(word, { opacity: 0.6, filter: "brightness(70%)" })
    );

    // Also dim the entire container initially
    gsap.set(containerRef.current, { opacity: 0.6, filter: "brightness(70%)" });

    // Single ScrollTrigger for the whole container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      end: "bottom 80%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const index = Math.floor(progress * totalWords); // current threshold

        // brighten container as scroll progresses
        gsap.to(containerRef.current, {
          opacity: 1,
          filter: "brightness(100%)",
          duration: 0.4,
          ease: "power1.out",
        });

        words.forEach((word, i) => {
          if (i < index) {               // ← changed from <= to < so first word doesn't start lit
            gsap.to(word, {
              opacity: 1,
              filter: "brightness(100%)",
              duration: 0.2,
              ease: "power1.out",
            });
          } else {
            gsap.to(word, {
              opacity: 0.6,
              filter: "brightness(50%)",
              duration: 0.2,
              ease: "power1.out",
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
    <p
      ref={containerRef}
      style={{
        fontSize,
        lineHeight,
        margin: "200px 20px",
        fontFamily: "Arial, sans-serif",
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
    </p>
  );
};

export default ScrollBrightText;