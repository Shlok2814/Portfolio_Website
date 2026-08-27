"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Palette,
  MousePointerClick,
  Compass,
  Layers,
  Zap,
  Code2,
  BrainCircuit,
  Cloud,
  Database,
  Binary,
  Server,
} from "lucide-react";
import { Mode } from "./Hero";

interface WhatImGoodAtProps {
  mode?: Mode;
}

export function WhatImGoodAt({ mode = "code" }: WhatImGoodAtProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const accentHoverBorder = isCode ? "hover:border-[#0070F3]/40" : "hover:border-[#ff4d00]/40";
  const iconAccentClass = isCode
    ? "group-hover:text-[#0070F3] group-hover:bg-[#0070F3]/10 group-hover:border-[#0070F3]/30"
    : "group-hover:text-[#ff4d00] group-hover:bg-[#ff4d00]/10 group-hover:border-[#ff4d00]/30";

  const codeCapabilities = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      desc: "Building performant, responsive web apps and modular architectures using React.js, Next.js, Node.js, and modern TypeScript.",
    },
    {
      icon: BrainCircuit,
      title: "Machine Learning & GenAI",
      desc: "Developing intelligent pipelines, training deep learning models with Keras/Python, and integrating LLMs using LangChain & Streamlit.",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure (AWS / OCI)",
      desc: "Deploying scalable cloud-native architectures, managing storage/compute on AWS, and leveraging Oracle Cloud for data science.",
    },
    {
      icon: Database,
      title: "Data Engineering & SQL",
      desc: "Designing relational database schemas (PostgreSQL, MySQL), writing optimized SQL queries, and handling 50k+ data pipelines.",
    },
    {
      icon: Binary,
      title: "Data Structures & Algorithms",
      desc: "Strong computer science fundamentals in algorithmic problem-solving, time-space complexity optimization, and clean code principles.",
    },
    {
      icon: Server,
      title: "REST APIs & Backend Systems",
      desc: "Architecting secure, scalable RESTful API endpoints, handling authentication, data validation, and seamless database integration.",
    },
  ];

  const designCapabilities = [
    {
      icon: Layout,
      title: "UI/UX Design",
      desc: "Crafting intuitive mobile and web interfaces that users love, with focused usability, hierarchy, and visual delight.",
    },
    {
      icon: Palette,
      title: "Brand Identity & Systems",
      desc: "Building cohesive visual languages from typography and tokens to modular Figma design systems and component libraries.",
    },
    {
      icon: MousePointerClick,
      title: "Interaction Design",
      desc: "Adding life to digital products with subtle motions, tactile feedback, micro-interactions, and spatial design.",
    },
    {
      icon: Compass,
      title: "Product Strategy & Roadmaps",
      desc: "Translating ambiguous user friction into structured MVPs, clear user journey maps, and prioritized feature roadmaps.",
    },
    {
      icon: Layers,
      title: "Rapid Prototyping",
      desc: "Building high-fidelity clickable Figma prototypes to test usability hypotheses, validate features, and iterate rapidly.",
    },
    {
      icon: Zap,
      title: "Design-to-Code Execution",
      desc: "Bridging the gap between Figma craft and production code using React, Next.js, Tailwind CSS, and Framer Motion.",
    },
  ];

  const capabilities = isCode ? codeCapabilities : designCapabilities;

  return (
    <section id="capabilities" className="py-20 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              {isCode ? "TECHNICAL CAPABILITIES & ENGINEERING" : "PRODUCT CAPABILITIES & CRAFT"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase">
            WHAT I&apos;M GOOD AT
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`relative p-7 sm:p-8 rounded-2xl bg-[#111113] border border-white/10 ${accentHoverBorder} transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden`}
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${accentColor}, transparent 70%)`,
                  }}
                />

                <div>
                  {/* Top Icon Pill */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${iconAccentClass}`}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-white font-grotesk mt-6 mb-2.5 tracking-tight transition-colors duration-200"
                    style={{
                      textShadow: `0 0 20px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 leading-relaxed transition-colors duration-200">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
