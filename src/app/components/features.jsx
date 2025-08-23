"use client";
import React from "react";

const features = [
  { id: 1, title: "Feature 1", video: "/videos/video1.mp4" },
  { id: 2, title: "Feature 2", video: "/videos/video2.mp4" },
  { id: 3, title: "Feature 3", video: "/videos/video3.mp4" },
  { id: 4, title: "Feature 4", video: "/videos/video4.mp4" },
];

export default function Features() {
  return (
    <section className="w-full px-6 py-12  text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Features</h2>

      <div className="grid grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative w-full h-80 bg-black rounded-xl overflow-hidden group cursor-pointer border border-[#1E40AF] 
              focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]"
          >
            {/* Card title */}
            <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-semibold text-2xl transition-opacity duration-300 group-hover:opacity-0">
              {feature.title}
            </div>

            {/* Video on hover */}
            <video
              src={feature.video}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              muted
              loop
              autoPlay
              playsInline
            />
          </div>
        ))}
      </div>
    </section>
  );
}
