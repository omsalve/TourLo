"use client";
import React, { useEffect, useRef, useState } from "react";

// We now define the card data directly inside this file
const cardData = [
  {
    id: 1,
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real-time 3D virtual tours with interactive hotspots
          </h3>
          <p className="text-gray-300 mb-6">
            Experience unmatched realism and precision with our comprehensive 3D
            360 VR tours, delivering an intuitive and immersive journey.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Know More
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/images/cards/tour-3d.png"
            alt="3D Tour"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Digitised location mapping
          </h3>
          <p className="text-gray-300 mb-6">
            Quickly view nearby schools, parks, and transport links. Our mapping
            provides a clear, interactive snapshot of the neighbourhood.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Know More
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/images/cards/location-mapping.png"
            alt="Location Mapping"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hyperreal customisation
          </h3>
          <p className="text-gray-300 mb-6">
            Bring your vision to life. Alter materials, furniture, and décor in a
            highly immersive 3D space to visualise your dream home.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Know More
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/images/cards/customisation.png"
            alt="Customisation"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Personalised apartment walkthrough
          </h3>
          <p className="text-gray-300 mb-6">
            Experience an immersive 3D walkthrough of property layouts, room
            details, and balcony views, allowing buyers to make confident decisions.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Know More
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/images/cards/walkthrough.png"
            alt="Walkthrough"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real-time inventory management
          </h3>
          <p className="text-gray-300 mb-6">
            Search and filter available units effortlessly. Real-time inventory
            integration keeps listings updated, streamlining the sales process.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Know More
          </button>
        </div>
        <div className="flex-1">
          <img
            src="/images/cards/inventory.png"
            alt="Inventory Management"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>
    ),
  },
];


const ScrollStack = ({
  animationDuration = "0.5s",
  sectionHeightMultiplier = 3,
  intersectionThreshold = 0.1,
  className = "",
}) => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);

  const cardCount = cardData.length;

  const cardStyle = {
    borderRadius: "20px",
    width: "100%",
    maxWidth: "1000px",
    transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    willChange: "transform, opacity",
    overflow: "hidden",
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2.5rem',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: intersectionThreshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;

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

          let newActiveIndex = Math.floor(progress * cardCount);
          setActiveCardIndex(Math.min(newActiveIndex, cardCount - 1));

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const scrollEl = document.documentElement;
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [cardCount, intersectionThreshold]);

  const getCardTransform = (index) => {
    const isVisible = isIntersecting && activeCardIndex === index;
    const isStacked = isIntersecting && activeCardIndex > index;
    
    let scale = 1;
    let translateY = "20px";
    let opacity = 0;

    if (isVisible) {
      scale = 1;
      translateY = "0px";
      opacity = 1;
    } else if (isStacked) {
      scale = 1 - (activeCardIndex - index) * 0.05;
      translateY = `-${(activeCardIndex - index) * 15}px`;
      opacity = 1;
    }
    
    return {
      transform: `translateX(-50%) translateY(-50%) translateY(${translateY}) scale(${scale})`,
      opacity: opacity,
      zIndex: 10 + index,
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ height: `${sectionHeightMultiplier * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={cardsContainerRef}
          className="relative w-full max-w-5xl h-auto"
        >
          {cardData.map((card, index) => {
            const cardTransform = getCardTransform(index);
            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  ...cardStyle,
                  transform: cardTransform.transform,
                  opacity: cardTransform.opacity,
                  zIndex: cardTransform.zIndex,
                  pointerEvents: cardTransform.pointerEvents,
                }}
              >
                {card.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;