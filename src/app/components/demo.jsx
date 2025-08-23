"use client";
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function ContactUsPage() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="
          w-full max-w-xl bg-[#0D0D0D] rounded-2xl shadow-2xl 
          p-8 sm:p-12 flex flex-col space-y-6 text-white
          border border-[#1E40AF]
        "
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mb-6 text-white text-center"
          variants={item}
        >
          Contact Us
        </motion.h1>

        {/* Inputs */}
        {["Your Name", "Your Email"].map((placeholder, idx) => (
          <motion.input
            key={idx}
            type={placeholder.includes("Email") ? "email" : "text"}
            placeholder={placeholder}
            variants={item}
            className="
              w-full px-5 py-3 rounded-lg bg-[#171717] 
              text-white placeholder-[#A5B4FC] border border-[#1E40AF] 
              focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] 
              outline-none transition-all duration-300 shadow-lg
            "
          />
        ))}

        <motion.textarea
          placeholder="Your Message"
          rows={5}
          variants={item}
          className="
            w-full px-5 py-3 rounded-lg bg-[#171717] 
            text-white placeholder-[#A5B4FC] border border-[#1E40AF] 
            focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] 
            outline-none transition-all duration-300 shadow-lg
          "
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          variants={item}
          whileHover={{ scale: 1.05, backgroundColor: "#1E40AF" }}
          whileTap={{ scale: 0.95 }}
          className="
            w-full px-6 py-3 rounded-xl bg-[#2563EB] 
            text-white font-semibold shadow-xl hover:shadow-2xl 
            transition-all duration-300
          "
        >
          Send Message
        </motion.button>
      </motion.div>
    </section>
  );
}
