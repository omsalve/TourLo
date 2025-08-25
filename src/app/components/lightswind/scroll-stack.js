"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const defaultBackgrounds = [
  "linear-gradient(135deg, rgba(82,39,255,.35), rgba(0,0,0,.6))",
  "linear-gradient(135deg, rgba(0,174,255,.35), rgba(0,0,0,.6))",
  "linear-gradient(135deg, rgba(250,66,167,.35), rgba(0,0,0,.6))",
];

const nearlyFullInView = (el, tolerancePx = 16) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  // “98% full” style gate with a small tolerance
  const topOk = r.top >= -tolerancePx;
  const bottomOk = r.bottom <= vh + tolerancePx;
  return topOk && bottomOk;
};

const ScrollStack = ({
  cards,
  backgroundColor = "bg-transparent",
  cardHeight = "60vh",
  animationDuration = "0.5s",
  sectionHeightMultiplier = 2.0, // compact internal scroll
  className = "",
}) => {
  const outerRef = useRef(null);   // section wrapper (sits in page flow)
  const scrollRef = useRef(null);  // inner scroll viewport (h-screen)
  const rangeRef  = useRef(null);  // tall internal scroll range
  const cardsContainerRef = useRef(null);

  // Fallback placeholders (3)
  const placeholders = useMemo(
    () => [
      {
        title: "Placeholder One",
        subtitle: "Medium subtitle to demo layout.",
        backgroundImage: defaultBackgrounds[0],
      },
      {
        title: "Placeholder Two",
        subtitle: "Another card to show stacking behavior.",
        backgroundImage: defaultBackgrounds[1],
      },
      {
        title: "Placeholder Three",
        subtitle: "Final placeholder — add your own content.",
        backgroundImage: defaultBackgrounds[2],
      },
    ],
    []
  );

  const cardData = (cards?.length ? cards : placeholders).slice(0, 3);
  const cardCount = cardData.length;

  const [active, setActive] = useState(false); // inner scroller enabled?
  const [renderIndex, setRenderIndex] = useState(0);
  const lastActiveRef = useRef(0);
  const ticking = useRef(false);

  const cardStyle = {
    height: cardHeight,
    maxHeight: "500px",
    borderRadius: "20px",
    transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    willChange: "transform, opacity",
  };

  // Gate the inner scroller when the viewport-sized area is (almost) fully visible
  const updateGate = () => {
    const sc = scrollRef.current;
    if (!sc) return;
    const on = nearlyFullInView(sc, 16);
    setActive(on);
    // Toggle overflow to enforce “only scroll when in view”
    sc.style.overflowY = on ? "auto" : "hidden";
  };

  // Compute stacking progress from inner scroll position
  const compute = () => {
    const sc = scrollRef.current;
    const rg = rangeRef.current;
    if (!sc || !rg) return;

    const maxY = Math.max(1, rg.offsetHeight - sc.clientHeight);
    const y = sc.scrollTop;
    const progress = Math.min(1, Math.max(0, y / maxY));

    let idx = Math.floor(progress * cardCount);
    idx = Math.min(idx, cardCount - 1);

    lastActiveRef.current = idx;
    setRenderIndex(idx);
  };

  useEffect(() => {
    const onPageScrollOrResize = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        updateGate();
        // keep first card visible / freeze when not active
        if (active) compute();
        ticking.current = false;
      });
    };

    updateGate();
    window.addEventListener("scroll", onPageScrollOrResize, { passive: true });
    window.addEventListener("resize", onPageScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onPageScrollOrResize);
      window.removeEventListener("resize", onPageScrollOrResize);
    };
  }, [active]);

  // Inner scroll events (only meaningful when active)
  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;

    const onInnerScroll = () => {
      if (!active) return;
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        compute();
        ticking.current = false;
      });
    };

    const onWheel = (e) => {
      // If not active, do nothing (page scrolls)
      if (!active) return;
      const maxY = Math.max(0, sc.scrollHeight - sc.clientHeight);
      const y = sc.scrollTop;

      // Handoff at edges so page scroll continues
      if ((y <= 0 && e.deltaY < 0) || (y >= maxY && e.deltaY > 0)) {
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
        e.preventDefault();
      }
    };

    sc.addEventListener("scroll", onInnerScroll, { passive: true });
    sc.addEventListener("wheel", onWheel, { passive: false });
    // Initial compute in case we render inside view
    onInnerScroll();

    return () => {
      sc.removeEventListener("scroll", onInnerScroll);
      sc.removeEventListener("wheel", onWheel);
    };
  }, [active, cardCount]);

  const getCardTransform = (index) => {
    const isVisible = renderIndex >= index;
    const translateY = isVisible ? `${90 - index * 30}px` : "100px";
    return {
      transform: `translateX(-50%) translateY(${translateY}) scale(1)`,
      opacity: isVisible ? 1 : index === 0 ? 1 : 0, // keep first card visible
      zIndex: 10 + index * 10,
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <section ref={outerRef} className={`relative w-full ${className}`}>
      {/* Inner viewport (exactly fills screen); gate toggles overflow */}
      <div ref={scrollRef} className="relative h-screen w-full">
        {/* Internal range: compact scroll span so it only animates while visible */}
        <div
          ref={rangeRef}
          className="relative"
          style={{ height: `${sectionHeightMultiplier * 100}vh` }}
        >
          {/* Sticky viewport */}
          <div
            className={`sticky top-0 h-screen w-full flex items-center justify-center ${backgroundColor}`}
          >
            <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col justify-center">
              <div
                ref={cardsContainerRef}
                className="relative w-full max-w-6xl mx-auto flex-shrink-0"
                style={{ height: cardHeight }}
              >
                {cardData.map((card, index) => {
                  const t = getCardTransform(index);
                  const bg =
                    card.backgroundImage || defaultBackgrounds[index % defaultBackgrounds.length];

                  return (
                    <div
                      key={index}
                      className="absolute z-50 overflow-hidden shadow-xl transition-all duration-300"
                      style={{
                        ...cardStyle,
                        top: 0,
                        left: "50%",
                        transform: t.transform,
                        width: "100%",
                        maxWidth: "72rem",
                        opacity: t.opacity,
                        zIndex: t.zIndex,
                        pointerEvents: t.pointerEvents,
                        background: bg.startsWith("linear-gradient") ? bg : undefined,
                        backgroundImage: bg.startsWith("linear-gradient")
                          ? undefined
                          : `url('${bg}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-black/80" />
                      {card.badge && (
                        <div className="absolute top-4 right-4 z-20">
                          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                            <span className="text-sm font-medium">{card.badge}</span>
                          </div>
                        </div>
                      )}
                      <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                        {card.content ? (
                          card.content
                        ) : (
                          <div className="max-w-lg">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                              {card.title}
                            </h3>
                            {card.subtitle && (
                              <p className="text-lg text-white/80">{card.subtitle}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;