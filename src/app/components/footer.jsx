import React from 'react';

// This is the updated Footer component
export default function Footer() {
  return (
    <footer className="relative w-full h-auto py-12 px-6 flex items-center justify-start text-white bg-transparent">
      
      {/* --- CONTENT WRAPPER --- */}
      {/* Changed to justify-between to create space for right-side content */}
      <div className="relative z-10 w-full flex items-start justify-between">
        
        {/* --- Left Content (TOUR-LO Block) --- */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">TOUR-LO</h1>
            <p className="mt-2 text-xl font-medium md:text-2xl text-gray-200">
              Real Estate. Reimagined. Redefined.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            A Technology Initiative by Pixpective - 2025 tourlo.in
          </p>
        </div>

        {/* --- NEW Right Content Container --- */}
        {/* This flex container holds the two new text sections */}
        <div className="flex gap-16 mt-[10px]">
          
          {/* Section 1: Contact Info */}
          <div className="text-sm text-right text-gray-300 flex flex-col gap-2">
            <h3 className="font-bold text-white mb-2">CONTACT</h3>
            <span>Mumbai, Maharashtra</span>
            <span>connect@tourlo.in</span>
            <span>+91 99231 94118</span>
          </div>

          {/* Section 2: Social Links */}
          <div className="text-sm text-right text-gray-300 flex flex-col gap-2">
            <h3 className="font-bold text-white mb-2">FOLLOW US</h3>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>

        </div>

      </div>
      
    </footer>
  );
}

