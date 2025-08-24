"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Threads from "../../../reactbitscomp/Backgrounds/DotGrid/Threads";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: replace with your API call
    console.log({ fullName, email, phone, message });
  };

  const inputBase =
    "w-full p-3 rounded-lg bg-black/40 text-white focus:outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/60 transition";
  const errorRing = "ring-red-500/60 focus:ring-red-400";

  return (
    // Root becomes the positioning context for the background
    <div className="relative min-h-screen flex flex-col">
      {/* Background layer: fills the entire page behind content */}
      <div className="absolute inset-0 -z-10">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        {/* Top Section */}
        <div className="flex-1 bg-transparent flex flex-col px-8 py-6">
          {/* Logo Top-Left */}
          <div className="flex justify-start">
            <Image
              src="/images/logos/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain"
              priority
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
        <div className="flex-1 bg-transparent flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="
              relative w-full max-w-2xl mt-[-50px]
              rounded-2xl border border-white/5
              bg-white/10 backdrop-blur-sm backdrop-saturate-50
              supports-[backdrop-filter]:bg-white/5
              p-8 shadow-[0_8px_40px_rgba(0,0,0,0.2)]
            "
          >
            {/* Full Name (full width) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="fullName" className="block text-white mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${inputBase} ${errors.fullName ? errorRing : ""}`}
                  placeholder="John Doe"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 text-sm text-red-400">
                    {errors.fullName}
                  </p>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputBase} ${errors.email ? errorRing : ""}`}
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputBase}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-5">
              <label htmlFor="message" className="block text-white mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputBase}
                rows={4}
                placeholder="Type your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}