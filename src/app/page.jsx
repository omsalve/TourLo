"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import WhatWeDo from "./components/whatwedo";
import ContactUs from "./ContactUs/page";
import myImage from "../../public/images/logos/logo.png";
import { Montserrat, Bebas_Neue } from "next/font/google";
import Features from "./components/features";
import ScrollBrightText from "./components/RevealTex";
import ScrollStack from "./components/lightswind/scroll-stack";
import CTA from "./components/CTA";
import Footer from './components/footer'
import DottedGrid from "./components/DottedGrid";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden scroll-smooth">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:20px_20px] overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center">
  </div>
</div>
        </div>
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen text-white flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-6 left-8"
          >
            <Image src={myImage} alt="Logo" width={200} height={300} />
          </motion.div>

          {/* Contact Button */}
          <motion.a
            href="#contact-us"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-6 right-6 px-5 py-2 sm:px-6 sm:py-3 rounded-lg bg-transparent text-white-700 hover:text-white-900 transition cursor-pointer"
          >
            CONTACT US
          </motion.a>

          {/* Hero Text */}
          <motion.div
            style={{ marginLeft: "-200px" }}
            className="max-w-5xl w-full flex flex-col items-start space-y-8 text-center sm:text-left"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.h1
              className={`font-extrabold leading-tight text-3xl sm:text-[clamp(2rem,6vw,4rem)] ${montserrat.className}`}
              variants={fadeInUp}
            >
              Let’s Think <br /> Beyond the Brochure.
            </motion.h1>

            <motion.button
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              variants={fadeInUp}
            >
              Watch Video →
            </motion.button>

            <motion.p
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed"
              variants={fadeInUp}
            >
              Tour-Lo helps you sell smarter, close faster. <br />
              Built to turn brochures into immersive experiences. <br />
              A simple tool that makes selling unforgettable.
            </motion.p>
          </motion.div>
        </section>

        {/* What We Do */}
        <motion.section
  className="relative min-h-screen flex flex-col items-start justify-center px-20 text-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, y: 50 },
  }}
>
  <h1 className="text-4xl md:text-6xl max-h-[200px] font-bold leading-tight mb-6">
    We're Redefining Real Estate Sales.
  </h1>

  <div className="w-full max-w-3xl text-left">
    <ScrollBrightText sentence="From interactive walkthroughs to unit-level interaction—Tour-Lo helps buyers decide faster, and developers close quicker." />
  </div>
</motion.section>


        {/* ScrollStack */}
        <section className="h-screen w-full flex snap-y snap-mandatory overflow-visible">
          <div>
  <ScrollStack
    backgroundColor="bg-transparent"
    cards={[
      {
        title: "Real-time 3D virtual tours with interactive hotspots",
        subtitle:
          "Experience unmatched realism and precision with our comprehensive 3D 360 VR tours. Delivering an intuitive and immersive journey with our advanced clickable hotspots allow for seamless exploration and discovery of rich content within each 3D scene.",
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Left Side: Text */}
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real-time 3D virtual tours with interactive hotspots
              </h3>
              <p className="text-gray-300 mb-6">
                Experience unmatched realism and precision with our
                comprehensive 3D 360 VR tours. Delivering an intuitive and
                immersive journey with our advanced clickable hotspots allow for
                seamless exploration and discovery of rich content within each
                3D scene.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                Know More
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="flex-1">
              <img
                src="/images/cards/tour-3d.png"
                alt="3D Tour"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Digitised location mapping",
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Left Side: Text */}
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Digitised location mapping
              </h3>
              <p className="text-gray-300 mb-6">
                Quickly view nearby schools, parks, shopping, and transport
                links. Our digitised mapping provides a clear, interactive
                snapshot of the neighbourhood, enhancing decision-making with
                real-time accessibility insights.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                Know More
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="flex-1">
              <img
                src="/images/cards/location-mapping.png"
                alt="Location Mapping"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Hyperreal customisation",
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hyperreal customisation
              </h3>
              <p className="text-gray-300 mb-6">
                Bring your vision to life with hyperreal customisation. Alter
                materials, furniture, and décor in a highly immersive 3D space,
                allowing you to visualise your dream home down to the finest
                details.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                Know More
              </button>
            </div>
            <div className="flex-1">
              <img
                src="/images/cards/customisation.png"
                alt="Customisation"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Personalised apartment walkthrough",
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Personalised apartment walkthrough
              </h3>
              <p className="text-gray-300 mb-6">
                Experience an immersive 3D walkthrough of property from layouts,
                room details and balcony views. Explore every corner, allowing
                potential buyers to visualise themselves in the space and make
                confident decisions.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                Know More
              </button>
            </div>
            <div className="flex-1">
              <img
                src="/images/cards/walkthrough.png"
                alt="Walkthrough"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        ),
      },
      {
        title: "Detailed search and real-time inventory management",
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Detailed search and real-time inventory management
              </h3>
              <p className="text-gray-300 mb-6">
                Search and filter available units effortlessly with customisable
                options tailored for your project. Real-time inventory
                integration keeps listings updated, enhancing the buyer’s
                experience and streamlining sales processes.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
                Know More
              </button>
            </div>
            <div className="flex-1">
              <img
                src="/images/cards/inventory.png"
                alt="Inventory Management"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        ),
      },
    ]}
  />
  </div>
</section>


        {/* Contact Us Section */}
        <motion.section
          id="contact-us"
          className="relative w-full min-h-screen flex items-center justify-center px-6 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-5xl">
            <CTA></CTA>
          </div>
        </motion.section>
      </div>
      <section className='bg-transparent'>
        <Footer></Footer>
      </section>

      {/* BG Animation */}
      <style jsx>{`
        @keyframes dots {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1000px 1000px;
          }
        }
        .animate-dots {
          animation: dots 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
