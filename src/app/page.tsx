"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero, Mode } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { WhatImGoodAt } from "@/components/sections/WhatImGoodAt";
import { Certifications } from "@/components/sections/Certifications";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [mode, setMode] = useState<Mode>("home");

  useEffect(() => {
    if (mode === "home") {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mode]);

  return (
    <main className={`relative min-h-screen bg-background text-foreground selection:bg-blue-600 selection:text-white ${mode === "home" ? "h-screen overflow-hidden" : ""}`}>
      {mode !== "home" && <Navbar mode={mode} />}
      <Hero mode={mode} setMode={setMode} />
      {mode !== "home" && (
        <>
          <Projects mode={mode} />
          <Experience mode={mode} />
          <WhatImGoodAt mode={mode} />
          <Certifications mode={mode} />
          <About mode={mode} />
          <Achievements mode={mode} />
          <Contact mode={mode} />
          <Footer />
        </>
      )}
    </main>
  );
}
