import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full h-auto py-12 px-6 text-white bg-transparent">
      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        
        {/* --- Left Content (TOUR-LO Block) --- */}
        <div className="text-center md:text-left">
          <div className="mb-4">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              TOUR-LO
            </h1>
            <p className="mt-2 text-xl font-medium md:text-2xl text-gray-200">
              Real Estate. Reimagined. Redefined.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            A Technology Initiative by Pixpective - 2025 tourlo.in
          </p>
        </div>

        {/* --- Right Content Container --- */}
        <div className="flex flex-col sm:flex-row md:flex-row gap-8 md:gap-16 text-center md:text-right">
          
          {/* Section 1: Contact Info */}
          <div className="text-sm text-gray-300 flex flex-col gap-2">
            <h3 className="font-bold text-white mb-2">CONTACT</h3>
            <span>Mumbai, Maharashtra</span>
            <span>connect@tourlo.in</span>
            <span>+91 99231 94118</span>
          </div>

          {/* Section 2: Social Links */}
          <div className="text-sm text-gray-300 flex flex-col gap-2">
            <h3 className="font-bold text-white mb-2">FOLLOW US</h3>
<a 
  href="https://www.instagram.com/tourlo_india/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="hover:text-white transition-colors"
>
  Instagram
</a>

<a 
  href="https://x.com/TourLoIn" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="hover:text-white transition-colors"
>
  Twitter
</a>

<a 
  href="https://www.linkedin.com/company/tourlo" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="hover:text-white transition-colors"
>
  LinkedIn
</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
