"use client";

import { useEffect } from "react";

export default function ThankYouRoute() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/#contact-us/thankyou");
    }
  }, []);

  return null;
}
