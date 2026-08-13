"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Threads from "../../../reactbitscomp/Backgrounds/DotGrid/Threads";

function SuccessIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex items-center justify-center thankyou-check-wrap"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-300/80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{ boxShadow: "0 0 25px rgba(34, 211, 238, 0.45)" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border border-cyan-300/50"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.12 }}
      />
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="thankyou-check"
      >
        <path d="M27 52 L43 68 L73 34" />
      </svg>
    </motion.div>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="thankyou-step-icon">
      <path d="M6.5 3h7.2L18 7.3V20a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M13.7 3v4.3H18" />
      <path d="M7.8 12.2h5.4" />
      <path d="M7.8 15.4h3.6" />
      <circle cx="16.3" cy="16.3" r="2.35" />
      <path d="M15.3 16.3l.7.7 1.3-1.5" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" className="thankyou-step-icon">
      <g className="thankyou-icon-muted">
        <circle cx="11.3" cy="7.6" r="4" />
        <path d="M4 21c0-4 3.3-6.9 7.3-6.9s6 1.6 6.9 4" />
      </g>
      <g className="thankyou-icon-accent">
        <circle cx="20.7" cy="10.4" r="3.3" />
        <path d="M14.3 21c0-3.6 3-6.1 6.4-6.1S27 17.4 27 21" />
      </g>
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg viewBox="0 0 32 22" aria-hidden="true" className="thankyou-step-icon">
      <path
        className="thankyou-icon-muted"
        d="M9.6 14.4c-2.4 0-4.3-1.8-4.3-4.1 0-2 1.5-3.7 3.5-4 .6-2.1 2.5-3.6 4.8-3.6 2.6 0 4.8 2 5.1 4.5h.3c2 0 3.6 1.6 3.6 3.5 0 .5-.1 1-.3 1.5"
      />
      <path
        className="thankyou-icon-accent"
        d="M18.4 9.9c1.9 0 3.4 1.4 3.4 3.2s-1.5 3.2-3.4 3.2h-7c-2 0-3.7-1.5-3.7-3.4 0-1.7 1.3-3.1 3-3.3"
      />
      <circle className="thankyou-icon-accent" cx="25.4" cy="15.4" r="2.4" />
    </svg>
  );
}

export default function ThankYouPage() {
  const steps = [
    {
      icon: <DocumentIcon />,
      text: "We’ll review your message",
    },
    {
      icon: <TeamIcon />,
      text: "Our team will reach out soon",
    },
    {
      icon: <BuildIcon />,
      text: "Let’s build the future of real estate together",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="thankyou-shell"
    >
      <div className="thankyou-bg-layer" aria-hidden="true">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="thankyou-container">
        <div className="thankyou-logo">
          <Image
            src="/images/logos/logo.png"
            alt="TourLo"
            width={140}
            height={186}
            className="thankyou-logo-img"
            priority
          />
        </div>

        <div className="thankyou-content">
          <SuccessIcon />

          <h1 className="thankyou-heading">Thank You!</h1>

          <div className="thankyou-box-wrapper">
            <p className="thankyou-copy">
              We've received your message and our team will get back to you shortly.
            </p>
            <p className="thankyou-copy">
              We're excited to connect with you and explore how <span className="thankyou-copy-accent">TOURLO</span> can help bring your real estate vision to life.
            </p>

            <div className="thankyou-divider" />

            <section className="thankyou-next">
            <h2>What’s Next?</h2>
            <div className="thankyou-steps">
              {steps.map((step, index) => (
                <div key={index} className="thankyou-step">
                  <div className="thankyou-step-icon-wrap">{step.icon}</div>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </section>

            <Link href="/" className="thankyou-cta" aria-label="Back to Home">
              Back to Home <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="thankyou-support">
            <p className="thankyou-support-title">Need immediate assistance?</p>
            <p>
              Email us at <a href="mailto:hello@tourlo.com">hello@tourlo.com</a> or call <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}