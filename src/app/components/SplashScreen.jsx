"use client";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {loading ? <SplashScreen /> : children}
      </body>
    </html>
  );
}
