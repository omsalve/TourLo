"use client";
import { useState } from "react";

export default function DottedGrid() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:20px_20px] overflow-hidden"
    >
      <div
        className="absolute w-12 h-12 rounded-full bg-white/40 animate-pulseDot pointer-events-none"
        style={{ left: pos.x - 24, top: pos.y - 24 }}
      />
    </div>
  );
}
