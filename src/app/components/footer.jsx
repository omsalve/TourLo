"use client";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b-50 from-black via-[#0f0f1f] to-[#1a1a3a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Logo / Brand */}
        <h1 className="text-3xl font-extrabold tracking-wide">
          TOUR-LO
        </h1>

        {/* Tagline */}
        <p className="text-lg font-light">
          Real Estate. Reimagined. Redefined.
        </p>

        {/* Subtext */}
        <p className="text-sm text-gray-400">
          A Technology Initiative by Pixpective – 2025 tourlo.in
        </p>
      </div>

      {/* Decorative grid dots background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
    </footer>
  );
}
