"use client";

import { useEffect } from "react";

export default function ContactUs() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#contact-us");
    }
  }, []);

  return null;
}
