"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function SuccessIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center"
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
    <svg viewBox="0 0 32 32" aria-hidden="true" className="thankyou-step-icon">
      <path d="M10 7.5h8l6 6v11.5a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-15.5a2 2 0 0 1 2-2Z" />
      <path d="M18 7.5v6h6" />
      <path d="M12 18h8" />
      <path d="M12 22h8" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="thankyou-step-icon">
      <path d="M9 23.5a5 5 0 1 1 10 0" />
      <path d="M17 23.5a5 5 0 1 1 10 0" />
      <path d="M10.5 13a4 4 0 1 1 8 0" />
      <path d="M18.5 12.5a4 4 0 1 1 8 0" />
      <path d="M13 19.5h5.5" />
      <path d="M20.5 19.5h5.5" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="thankyou-step-icon">
      <path d="M15 8.5 9 21.5l6.5 5.5 6-13.5Z" />
      <path d="M9 21.5h13" />
      <path d="M12.5 14.5h7" />
      <path d="M15.5 10.5V8.5" />
      <path d="M18.5 26.5l5.5-5.5" />
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
      <div className="thankyou-bg" />
      <div className="thankyou-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path d="M0,185 C170,120 260,130 390,175 S670,180 760,150 S1160,80 1440,165 L1440,220 L0,220 Z" />
          <path d="M0,200 C140,165 260,145 370,176 S670,198 788,175 S1180,117 1440,190" />
        </svg>
      </div>

      <div className="thankyou-container">
        <div className="thankyou-logo">TOUR•LO</div>

        <div className="thankyou-content">
          <SuccessIcon />

          <h1 className="thankyou-heading">Thank You!</h1>

          <p className="thankyou-copy">
            We’ve received your message and our team will get back to you shortly.
          </p>
          <p className="thankyou-copy">
            We’re excited to connect with you and explore how TOURLO can help bring your real estate vision to life.
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
