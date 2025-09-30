"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white px-4 py-12">
      
      {/* Logo Row */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
        {/* Marketing Garage */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
          <Image 
            src="/images/logos/Marketing Garage.png" 
            alt="Marketing Garage" 
            width={80} 
            height={80} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* TOUR-LO text logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <Image 
            src="/images/logos/logowhite.png" 
            alt="TOUR-LO Logo" 
            width={80} 
            height={80} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Techinfinity */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
          <Image 
            src="/images/logos/Techinfinity.png" 
            alt="Techinfinity" 
            width={80} 
            height={80} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-lg sm:text-xl md:text-6xl font-bold text-center mb-4 leading-snug">
        A simple tool that transforms your sales pitch.
      </h1>

      {/* Subtext */}
      <p className="text-blue-400 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-8 leading-relaxed">
        Let buyers explore. Let your sales team close faster. <br className="hidden sm:block" />
        Tour-Lo is the only tool you need to sell smarter.
      </p>

      {/* Button → Goes to ContactUs page */}
      <Link href="/ContactUs">
        <button className="bg-gradient-to-r from-cyan-500 to-cyan-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full font-semibold hover:scale-105 transition-transform">
          BOOK A DEMO →
        </button>
      </Link>
    </div>
  );
}
