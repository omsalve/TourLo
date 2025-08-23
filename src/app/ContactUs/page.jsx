"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-screen flex flex-col"
    >
      {/* Top Section */}
      <div className="flex-1 bg-gradient-to-b from-blue-600 flex flex-col px-8 py-6">
        {/* Logo Top-Left */}
        <div className="flex justify-start">
          <Image
            src="/images/logos/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Content Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Let’s Talk Real Estate Innovation
          </h1>
          <p className="text-white/80 max-w-lg">
            Whether you’re a real estate developer, marketing agency, or sales
            lead – we’re here to help you turn walkthroughs into conversions.
            Reach out to book a demo, ask a question, or just say hi.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 bg-gradient-to-b from-black to-blue-600 flex items-center justify-center px-4">
        <form className="bg-transparent p-8 rounded-2xl w-full max-w-2xl mt-[-50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-2">First Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Last Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-white mb-2">Message</label>
            <textarea
              className="w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition"
              rows="4"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}
