import React from 'react';
import Prism from './Prism';

export default function Footer() {
  return (
    <footer className="relative w-full h-auto py-12 px-6 flex items-center justify-start text-white bg-transparent">
      
      {/* --- Prism Background Container --- */}
      <div className="w-full absolute inset-0 z-0 flex items-end justify-center">
        <div 
          style={{ width: '100%', height: '600px', position: 'relative' }}
          className="w-full transform scale-y-[-1] translate-y-[370px] translate-x-[-500px]"
        >
          <Prism className='w-full'
            animationType="rotate"
            timeScale={0.1}
            height={2}
            baseWidth={6.5}
            scale={3.5}
            hueShift={-0.34}
            colorFrequency={0.45}
            noise={0}
            glow={0.4}
          />
        </div>
      </div>

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