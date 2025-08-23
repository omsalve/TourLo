"use client";
import { useEffect, useRef, useState } from "react";

const titles = [
  "3D Digital Twin",
  "Explore the Locality",
  "Connectivity",
  "Know Your Project",
  "Customise Interiors",
  "Custom Inventory",
];

const defaultImages = [
  "/images/bed.jpeg",
  "/images/card2.jpg",
  "/images/card3.jpg",
  "/images/card4.jpg",
  "/images/card5.jpg",
  "/images/card6.jpg",
];

const ScrollStack = ({
  cardImages = defaultImages,
  animationDuration = "0.5s",
  sectionHeightMultiplier = 3,
  intersectionThreshold = 0.1,
  className = "",
}) => {
  const scrollableSectionRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);

  const cardCount = titles.length;

  const cardStyle = {
    borderRadius: "20px",
    aspectRatio: "16 / 9",
    width: "100%",
    maxWidth: "1000px",
    transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    willChange: "transform, opacity",
    overflow: "hidden",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: intersectionThreshold }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !cardsContainerRef.current) return;

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const sectionTop = sectionRect.top;
          const sectionHeight = sectionRef.current.offsetHeight;
          const scrollableDistance = sectionHeight - viewportHeight;

          let progress = 0;
          if (sectionTop <= 0 && Math.abs(sectionTop) <= scrollableDistance) {
            progress = Math.abs(sectionTop) / scrollableDistance;
          } else if (sectionTop <= 0) {
            progress = 1;
          }

          let newActiveIndex = 0;
          const progressPerCard = 1 / cardCount;
          for (let i = 0; i < cardCount; i++) {
            if (progress >= progressPerCard * (i + 1)) newActiveIndex = i + 1;
          }

          setActiveCardIndex(Math.min(newActiveIndex, cardCount - 1));
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    const scrollEl = scrollableSectionRef.current;
    scrollEl?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollEl?.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [cardCount, intersectionThreshold]);

  const getCardTransform = (index) => {
    const isVisible = isIntersecting && activeCardIndex >= index;
    const scale = 1 - index * 0.02;
    let translateY = "20px";
    if (isVisible) translateY = `${0 - index * 15}px`;

    return {
      transform: `translate(-50%, -50%) translateY(${translateY}) scale(${scale})`,
      opacity: isVisible ? 1 : 0,
      zIndex: 10 + index,
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <section
      ref={scrollableSectionRef}
      className="relative w-full h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300"
    >
      <div
        ref={sectionRef}
        className={`relative ${className}`}
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-visible">
          <div
            ref={cardsContainerRef}
            className="relative w-full max-w-5xl mx-auto flex-shrink-0 flex justify-center"
          >
            {titles.map((title, index) => {
              const cardTransform = getCardTransform(index);
              const imageUrl = cardImages[index] || "/images/default.jpg";

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-300 shadow-xl"
                  style={{
                    ...cardStyle,
                    top: "50%",
                    left: "50%",
                    transform: cardTransform.transform,
                    opacity: cardTransform.opacity,
                    zIndex: cardTransform.zIndex,
                    pointerEvents: cardTransform.pointerEvents,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Optional semi-transparent gradient */}
                  <div className="absolute inset-0 z-0 bg-black/30" />

                  <div className="relative z-10 p-6 md:p-10 h-full flex items-center">
                    <div className="max-w-lg">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                        {title}
                      </h3>
                      <p className="text-lg text-white/80">
                        Subtitle or description for {title}.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;
