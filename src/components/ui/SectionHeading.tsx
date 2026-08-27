"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  accentColor?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  alignment = "left",
  accentColor = "#ff4d00",
}: SectionHeadingProps) {
  const isBlue = accentColor === "#0070F3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-12 ${alignment === "center" ? "text-center" : "text-left"}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            isBlue
              ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
              : "text-[#ff4d00] bg-[#ff4d00]/10 border border-[#ff4d00]/25 shadow-sm"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-neutral-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
