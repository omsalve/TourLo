import React from 'react';
import Prism from './Prism';

export default function Footer() {
  return (
    <footer className="relative w-full h-auto py-12 px-6 flex items-center justify-start text-white bg-transparent">
      
     


      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full flex items-center justify-start">
        
        {/* --- Main Content --- */}
        {/* Removed the text-center class from this wrapper div */}
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

      </div>
      
    </footer>
  );
}