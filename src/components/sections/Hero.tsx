"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  PenTool,
  ArrowLeftRight,
  ExternalLink,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";
import { InteractiveCube } from "@/components/ui/InteractiveCube";

export type Mode = "home" | "code" | "design";

export interface HeroProps {
  mode?: Mode;
  setMode?: (mode: Mode) => void;
}

export function Hero({ mode: externalMode, setMode: externalSetMode }: HeroProps = {}) {
  const [internalMode, setInternalMode] = useState<Mode>("home");
  const mode = externalMode ?? internalMode;
  const setMode = externalSetMode ?? setInternalMode;
  const [hoveredSide, setHoveredSide] = useState<"left" | "right">("right");

  // Mouse coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRatio = useMotionValue(0.5); // 0 (far left) to 1 (far right)

  const spring = { damping: 28, stiffness: 140 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);
  const smoothRatio = useSpring(mouseRatio, { damping: 24, stiffness: 120 });

  // Dynamic split percentage for screen dual-pane slider (between 25% and 75%)
  const splitPercent = useTransform(smoothRatio, [0, 1], [25, 75]);
  const splitLeftStyle = useTransform(splitPercent, (v) => `${v}%`);

  // Complementary clip-paths for centered header text (Eliminates subpixel halo outline)
  const headerLeftClipPath = useTransform(smoothRatio, (r) => {
    const p = Math.max(0, Math.min(100, ((r - 0.35) / (0.65 - 0.35)) * 100));
    return `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`;
  });

  const headerRightClipPath = useTransform(smoothRatio, (r) => {
    const p = Math.max(0, Math.min(100, ((r - 0.35) / (0.65 - 0.35)) * 100));
    return `polygon(${p}% 0%, 100% 0%, 100% 100%, ${p}% 100%)`;
  });

  // Mathematically synchronized clip-path for the centered ID Card matching the screen divider
  const cardClipPath = useTransform(smoothRatio, (r) => {
    const p = Math.max(0, Math.min(100, ((r - 0.32) / (0.68 - 0.32)) * 100));
    return `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`;
  });

  // ID card tilt physics
  const cardRotateX = useTransform(smoothY, [-400, 400], [6, -6]);
  const cardRotateY = useTransform(smoothX, [-600, 600], [-8, 8]);
  const cardTranslateX = useTransform(smoothX, [-600, 600], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      const ratio = Math.max(0, Math.min(1, e.clientX / innerWidth));

      mouseX.set(x);
      mouseY.set(y);
      mouseRatio.set(ratio);

      if (e.clientX < innerWidth / 2) {
        setHoveredSide("left");
      } else {
        setHoveredSide("right");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, mouseRatio]);

  const tickerSkills = [
    "PYTHON",
    "SQL",
    "DATA",
    "JAVA",
    "DATA STRUCTURES",
    "WEB DEVELOPMENT",
    "PROBLEM SOLVING",
    "AWS",
    "REACT.JS",
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#0a0a0a] select-none">
      {/* ========================================================================= */}
      {/* 1. HOME SCREEN: DUAL-PANE SPLIT (CODE ON LEFT, CRAFT ON RIGHT, ID CARD)   */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {mode === "home" && (
          <motion.div
            key="split-home-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden"
          >
            {/* Split Screen Background Layers */}
            <div className="absolute inset-0 w-full h-full flex">
              {/* LEFT PANE: CODE (Light Background #F6F6F6 with grid) */}
              <motion.div
                style={{ width: splitLeftStyle }}
                onClick={() => setMode("code")}
                className="relative h-full bg-[#F6F6F6] text-black overflow-hidden flex flex-col justify-between items-center p-8 sm:p-12 cursor-pointer group transition-colors duration-200 border-r border-black/15 shadow-2xl"
              >
                {/* Light Grid Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Top-Left Code Icon */}
                <div className="w-full flex items-center justify-start z-10 pt-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-black/5 transition-all">
                    <Code2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                </div>

                {/* Center Content: Giant "CODE" + Subtitle */}
                <div className="z-10 flex flex-col items-center justify-center text-center my-auto">
                  <h2 className="text-[12vw] sm:text-[13vw] md:text-[14vw] font-black uppercase text-black tracking-tight leading-none font-grotesk group-hover:scale-105 transition-transform duration-300">
                    CODE
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.35em] text-neutral-500 uppercase">
                    ARCHITECTURE &amp; LOGIC
                  </p>
                  <span className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                    Click to Enter Code ↗
                  </span>
                </div>

                <div className="w-full h-8 z-10" />
              </motion.div>

              {/* RIGHT PANE: CRAFT (Dark Background #0A0A0A with grid) */}
              <div
                onClick={() => setMode("design")}
                className="relative flex-1 h-full bg-[#0A0A0A] text-white overflow-hidden flex flex-col justify-between items-center p-8 sm:p-12 cursor-pointer group transition-colors duration-200"
              >
                {/* Dark Grid Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Top-Right Pen Tool Icon */}
                <div className="w-full flex items-center justify-end z-10 pt-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                    <PenTool className="w-6 h-6 stroke-[2.2]" />
                  </div>
                </div>

                {/* Center Content: Giant "CRAFT" + Subtitle */}
                <div className="z-10 flex flex-col items-center justify-center text-center my-auto">
                  <h2 className="text-[12vw] sm:text-[13vw] md:text-[14vw] font-black uppercase text-white tracking-tight leading-none font-grotesk group-hover:scale-105 transition-transform duration-300">
                    CRAFT
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.35em] text-neutral-400 uppercase">
                    VISUALS &amp; PLANS
                  </p>
                  <span className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4D26] text-black text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg">
                    Click to Enter Craft ↗
                  </span>
                </div>

                <div className="w-full h-8 z-10" />
              </div>
            </div>

            {/* TOP HEADER: Complementary Dual-Clipped Header (Zero White Halo Outline) */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none w-fit">
              {/* White Text on Dark Half (Clipped from p% to 100%) */}
              <motion.div
                style={{ clipPath: headerRightClipPath }}
                className="overflow-hidden"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-grotesk text-center whitespace-nowrap text-white">
                  Shlok Shukla
                </h1>
              </motion.div>

              {/* Black Text on Light Half (Clipped from 0% to p%) */}
              <motion.div
                style={{ clipPath: headerLeftClipPath }}
                className="absolute inset-0 overflow-hidden"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-grotesk text-center whitespace-nowrap text-black">
                  Shlok Shukla
                </h1>
              </motion.div>
            </div>

            {/* CENTERPIECE: Hanging ID-Badge Card Over the Split Divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
              {/* Lanyard Top Strap Hanging from Screen Top */}
              <div className="absolute -top-48 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
                <div className="w-10 h-56 bg-[#1a1a1a] border-x border-neutral-800 shadow-2xl relative">
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-neutral-700/40 -translate-x-1/2" />
                </div>
                <div className="w-12 h-6 bg-[#262626] rounded-sm border border-neutral-700 shadow-lg flex items-center justify-center -mt-1">
                  <div className="w-6 h-2 bg-[#0f0f0f] rounded-sm border border-neutral-600" />
                </div>
              </div>

              {/* ID Badge Card with Full-Card Dual-Layer Clip-Path Color Synchronization */}
              <motion.div
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  x: cardTranslateX,
                }}
                className="relative w-[290px] sm:w-[330px] md:w-[350px] rounded-[34px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)] border-[4px] border-[#222222] bg-[#121212] group pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode(hoveredSide === "left" ? "code" : "design");
                }}
              >
                {/* Lanyard Notch Hole */}
                <div className="relative z-30 flex justify-center -mt-1 mb-2 pointer-events-none pt-4">
                  <div className="w-12 h-3 bg-[#181818] rounded-b-md" />
                </div>

                {/* Shlok's Natural Full Color Photo (Persistent in Center) */}
                <div className="relative z-30 w-[calc(100%-32px)] sm:w-[calc(100%-40px)] mx-auto h-52 sm:h-60 rounded-2xl overflow-hidden bg-neutral-900 border-2 border-neutral-800 mb-3 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shlok.png"
                    alt="Shlok Shukla"
                    className="w-full h-full object-cover object-top block rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-2xl" />
                </div>

                {/* ========================================================================= */}
                {/* 1. DARK LAYER (White Text on Black Background across entire card)        */}
                {/* ========================================================================= */}
                <div className="relative z-10 px-4 sm:px-5 pb-4 sm:pb-5 text-white select-none">
                  {/* Top Bar on Black */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      &lt;CODE&gt;
                    </span>
                    <span className="text-white tracking-wider">[CRAFT]</span>
                  </div>

                  {/* Greeting & Roles on Black */}
                  <div className="text-center py-1">
                    <h3 className="text-lg sm:text-xl font-black font-grotesk tracking-tight leading-tight text-white">
                      Hi, I&apos;m Shlok Shukla
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="text-left pr-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider block text-neutral-400">
                        ENGINEERING
                      </span>
                      <p className="text-[11px] sm:text-xs font-black uppercase font-grotesk leading-tight text-white">
                        SOFTWARE
                        <br />
                        ENGINEER
                      </p>
                    </div>
                    <div className="text-right pl-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider block text-neutral-400">
                        DESIGN
                      </span>
                      <p className="text-[11px] sm:text-xs font-black uppercase font-grotesk leading-tight text-white">
                        PRODUCT
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono tracking-wider font-bold uppercase text-neutral-400">
                    <span>©2024, Skills Aren&apos;t Replaced By AI</span>
                    <span className="text-white">ID: #SS-99</span>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 2. LIGHT LAYER (Black Text on White Background with Smooth Clip-Path)     */}
                {/* ========================================================================= */}
                <motion.div
                  style={{ clipPath: cardClipPath }}
                  className="absolute inset-0 bg-[#FFFFFF] z-20 pointer-events-none select-none flex flex-col justify-between"
                >
                  {/* Top Notch Hole Spacer on White */}
                  <div className="flex justify-center -mt-1 mb-2 pt-4">
                    <div className="w-12 h-3 bg-[#181818] rounded-b-md" />
                  </div>

                  {/* Photo Invisible Spacer so layout matches identically */}
                  <div className="w-[calc(100%-32px)] sm:w-[calc(100%-40px)] mx-auto h-52 sm:h-60 mb-3 opacity-0 pointer-events-none" />

                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-black flex-1 flex flex-col justify-between">
                    {/* Top Bar on White */}
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
                      <span className="text-black font-extrabold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                        &lt;CODE&gt;
                      </span>
                      <span className="text-neutral-500 tracking-wider">[CRAFT]</span>
                    </div>

                    {/* Greeting on White */}
                    <div className="text-center py-1">
                      <h3 className="text-lg sm:text-xl font-black font-grotesk tracking-tight leading-tight text-black">
                        Hi, I&apos;m Shlok Shukla
                      </h3>
                    </div>

                    {/* Roles on White */}
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div className="text-left pr-1">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider block text-neutral-600">
                          ENGINEERING
                        </span>
                        <p className="text-[11px] sm:text-xs font-black uppercase font-grotesk leading-tight text-black">
                          SOFTWARE
                          <br />
                          ENGINEER
                        </p>
                      </div>
                      <div className="text-right pl-1">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider block text-neutral-600">
                          DESIGN
                        </span>
                        <p className="text-[11px] sm:text-xs font-black uppercase font-grotesk leading-tight text-black">
                          PRODUCT
                        </p>
                      </div>
                    </div>

                    {/* Footer on White */}
                    <div className="mt-2.5 pt-2 border-t border-black/15 flex items-center justify-between text-[8px] font-mono tracking-wider font-bold uppercase text-neutral-600">
                      <span className="text-black">©2024, Skills Aren&apos;t Replaced By AI</span>
                      <span className="text-black">ID: #SS-99</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. CODE SECTION: BLACK, WHITE & ELECTRIC BLUE THEME WITH 3D CUBE          */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {mode === "code" && (
          <motion.div
            key="showcase-theme-code"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-20 w-full min-h-screen flex flex-col justify-between items-center pt-8 pb-0 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#09090b] text-white"
          >
            {/* Ambient Electric Blue Glow */}
            <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full blur-[170px] pointer-events-none bg-[#0070F3]/12" />

            {/* Dark Grid Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* TOP BAR: Brand Pill + Switch Persona Button */}
            <div className="w-full max-w-7xl flex items-center justify-between z-30">
              {/* Left: Brand Pill Button */}
              <button
                onClick={() => setMode("home")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider font-display transition-all hover:scale-105 shadow-md"
              >
                <span>SHLOK SHUKLA</span>
              </button>

              {/* Right: Switch Persona Pill Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMode("design")}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                >
                  <span>SWITCH PERSONA</span>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <button
                  onClick={() => setMode("home")}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-all hover:scale-105"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>HOME</span>
                </button>
              </div>
            </div>

            {/* MAIN CONTENT: Typography & Bio on Left, 3D Rubik's Cube on Right */}
            <div className="w-full max-w-7xl my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-20">
              {/* Left Column: Bold Headline & Bio */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
                <div className="space-y-2">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black font-grotesk tracking-tight leading-[0.9] text-white select-none uppercase">
                    <span>SOFTWARE</span>
                    <br />
                    <span className="text-[#9ca3af]">ENGINEER.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed max-w-xl pt-4">
                    CS undergraduate at VIT Bhopal (9.01 CGPA) with hands-on expertise in Python, Machine Learning, GenAI/LLMs, and Full-Stack development. Building end-to-end data pipelines, cloud-native apps on AWS, and intuitive UI/UX.
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2.5 pt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0070F3] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0070F3]" />
                  </span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-neutral-300">
                    OPEN TO INTERNSHIP
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0070F3] hover:bg-[#0060d0] text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,112,243,0.5)]"
                  >
                    VIEW CODE &amp; PROJECTS
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 font-bold text-xs tracking-wider uppercase transition-all duration-200"
                  >
                    ABOUT ME
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Pure Floating 3D Rubik's Grid Cube */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                {/* "Hover to play" Annotation */}
                <div className="absolute -top-4 right-2 sm:right-6 z-30 pointer-events-none flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <span className="italic">Hover to <strong className="text-white font-serif">play</strong></span>
                  <span className="text-[#0070F3] text-sm transform -rotate-12">↗</span>
                </div>

                {/* Pure Floating Interactive 3D Canvas (No Background Box) */}
                <div className="w-full max-w-[440px] h-[380px] sm:h-[440px] relative flex items-center justify-center">
                  <InteractiveCube
                    accentColor="#0070F3"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM TICKER / SKILLS STRIP: Full Width Edge-to-Edge with Big Bold Typography */}
            <div className="w-screen -mx-6 sm:-mx-10 lg:-mx-16 bg-[#060608] text-white py-4 sm:py-5 border-t border-white/10 z-30 overflow-hidden select-none flex">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex items-center whitespace-nowrap gap-6 sm:gap-10 shrink-0"
              >
                {/* Duplicate list twice for seamless infinite marquee loop */}
                {[...tickerSkills, ...tickerSkills].map((skill, idx) => (
                  <div
                    key={`${skill}-${idx}`}
                    className="group/skill flex items-center gap-6 sm:gap-10 transition-all duration-300 hover:scale-115 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-mono font-black uppercase tracking-[0.25em] text-neutral-300 group-hover/skill:text-[#0070F3] group-hover/skill:drop-shadow-[0_0_12px_rgba(0,112,243,0.8)] transition-all">
                      {skill}
                    </span>
                    <span className="text-[#0070F3] text-sm sm:text-base font-black transition-transform duration-300 group-hover/skill:scale-150">•</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. PRODUCT SECTION: EXACT 1:1 REPLICATION OF "Visuals that SPEAK."        */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {mode === "design" && (
          <motion.div
            key="showcase-theme-design"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-20 w-full h-screen flex flex-col justify-between items-center py-6 sm:py-8 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#080808] select-none"
          >
            {/* Ambient Background Warm Radial Glow on Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none bg-[#FF4D26]/20" />

            {/* TOP BAR: Brand Pill + Switch Persona Button */}
            <div className="w-full max-w-7xl flex items-center justify-between z-30">
              {/* Left: Brand Pill Button (Click to return home) */}
              <button
                onClick={() => setMode("home")}
                className="px-5 py-2 rounded-full bg-[#18181b] hover:bg-[#222227] border border-neutral-700/60 hover:border-[#ff4d00]/50 text-white font-extrabold text-xs uppercase tracking-wider font-display transition-all hover:scale-110 shadow-md hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
              >
                <span>SHLOK SHUKLA</span>
              </button>

              {/* Right: Switch Persona Pill Button + Home */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMode("code")}
                  className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#18181b] hover:bg-[#222227] border border-neutral-700/60 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-110 shadow-md"
                >
                  <span>SWITCH PERSONA</span>
                  <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <button
                  onClick={() => setMode("home")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18181b] hover:bg-[#222227] border border-neutral-700/60 hover:border-neutral-500 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-all hover:scale-105"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>HOME</span>
                </button>
              </div>
            </div>

            {/* CENTER HEADLINE: Exact Reference HTML & CSS */}
            <div className="w-full max-w-7xl my-auto flex flex-col items-center justify-center text-center z-20">
              <h1 className="text-[13vw] leading-[0.8] font-bold tracking-tighter mix-blend-screen select-none transition-transform duration-500 hover:scale-[1.02]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                  Visuals
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-gray-800 flex items-center justify-center gap-4 md:gap-8">
                  that{" "}
                  <span className="text-[#ff4d00] font-black tracking-tighter uppercase drop-shadow-[0_0_35px_rgba(255,77,0,0.4)]">
                    SPEAK.
                  </span>
                </span>
              </h1>
            </div>

            {/* BOTTOM ROW: THE PROCESS — THE OUTCOME (Product-Oriented Callouts) */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-2 z-20">
              {/* Left Column: THE PROCESS */}
              <div className="md:col-span-5 space-y-2 text-left p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group cursor-default">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#ff4d00] uppercase block group-hover:tracking-[0.3em] transition-all">
                  THE PROCESS
                </span>
                <p className="text-base sm:text-lg text-neutral-200 font-sans font-medium leading-snug max-w-sm">
                  Transforming user friction into seamless product workflows.
                </p>
              </div>

              {/* Center Subtle Divider Line */}
              <div className="hidden md:flex md:col-span-2 justify-center">
                <div className="w-12 h-px bg-white/20" />
              </div>

              {/* Right Column: THE OUTCOME */}
              <div className="md:col-span-5 space-y-2 text-left p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group cursor-default">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#ff4d00] uppercase block group-hover:tracking-[0.3em] transition-all">
                  THE OUTCOME
                </span>
                <p className="text-base sm:text-lg text-neutral-200 font-sans font-medium leading-snug max-w-sm">
                  Not just pixels, but purposeful digital products that drive engagement.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
