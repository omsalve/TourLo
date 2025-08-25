"use client";

export default function Footer() {
  return (
    <footer className="relative w-full bg-transparent text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-start text-left space-y-4">
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

      {/* Prominent Blue Diffused Glow */}
      <div className="absolute left-0 right-0 bottom-0 h-56 bg-blue-500 blur-[120px] -translate-y-16 -z-10"></div>

      {/* Decorative grid dots background */}
      <div className="absolute inset-0 -z-20 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
    </footer>
  );
}
