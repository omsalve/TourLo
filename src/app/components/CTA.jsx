"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white px-4">
      
      {/* Logo Row */}
      <div className="flex space-x-6 mb-8">
        
        {/* Marketing Garage */}
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image 
            src="/images/logos/Marketing Garage.png" 
            alt="Marketing Garage" 
            width={80} 
            height={80} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* TOUR-LO text logo */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <Image 
            src="/images/logos/logowhite.png" 
            alt="Marketing Garage" 
            width={80} 
            height={80} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Techinfinity */}
        <div className="w-20 h-20 rounded-full overflow-hidden">
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
      <h1 className="text-sm md:text-3xl font-bold text-center mb-4">
        A simple tool that transforms your sales pitch.<br />
      </h1>

      {/* Subtext */}
      <p className="text-blue-400 text-sm md:text-base text-center mb-8">
        Let buyers explore. Let your sales team close faster.<br />
        Tour-Lo is the only tool you need to sell smarter.
      </p>

      {/* Button → Goes to ContactUs page */}
      <Link href="/ContactUs">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
          BOOK A DEMO →
        </button>
      </Link>
    </div>
  );
}
