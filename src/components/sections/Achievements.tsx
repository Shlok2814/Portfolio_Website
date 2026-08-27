"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Trophy } from "lucide-react";
import { Mode } from "./Hero";

interface AchievementsProps {
  mode?: Mode;
}

export function Achievements({ mode = "code" }: AchievementsProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const accentBorder = isCode ? "hover:border-[#0070F3]/40" : "hover:border-[#ff4d00]/40";

  const achievements = [
    {
      icon: Trophy,
      tag: "SCHOLARSHIP & MERIT",
      year: "2023",
      title: "Reliance Undergraduate Scholar",
      subtitle: "Reliance Foundation",
      desc: "Selected among the top engineering students nationwide for the prestigious Reliance Undergraduate Scholarship, awarded based on rigorous competitive examination and academic excellence.",
      highlights: ["Top Percentile Selection", "National Merit Recognition", "Academic Excellence"],
    },
    {
      icon: Users,
      tag: "LEADERSHIP & INITIATIVE",
      year: "2025 – 2026",
      title: "Vice President, Entrepreneurship Cell",
      subtitle: "E-Cell VIT Bhopal",
      desc: "Leading campus-wide startup initiatives, venture incubators, hackathons, and high-impact mentorship programs managing and directing a 100+ member student team.",
      highlights: ["100+ Member Leadership", "Startup Incubations", "Campus-Wide Initiatives"],
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[170px] pointer-events-none opacity-15"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              HONORS &amp; LEADERSHIP
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase">
            ACHIEVEMENTS &amp; CO-CURRICULAR
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className={`p-7 sm:p-9 rounded-3xl bg-[#111113] border border-white/10 ${accentBorder} transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar: Icon + Year & Tag */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.1)" : "rgba(255,77,0,0.1)",
                        borderColor: isCode ? "rgba(0,112,243,0.3)" : "rgba(255,77,0,0.3)",
                        color: accentColor,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                        {item.tag}
                      </span>
                      <span
                        className="text-xs font-mono font-bold tracking-wider"
                        style={{ color: accentColor }}
                      >
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black font-grotesk text-white tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wide block mb-4">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Highlights Pills with Hover Pop */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-105 text-neutral-300 transition-all duration-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
