"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { Mode } from "./Hero";

interface ContactProps {
  mode?: Mode;
}

export function Contact({ mode = "code" }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const email = "shukla.shlok9455@gmail.com";
  const isCode = mode === "code";
  const accentHoverClass = isCode ? "hover:text-[#0070F3]" : "hover:text-[#ff4d00]";
  const accentGlowColor = isCode ? "rgba(0,112,243,0.08)" : "rgba(255,77,0,0.08)";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const socialLinks = [
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/shlokshukla" },
    { name: "GITHUB", href: "https://github.com/Shlok2814" },
    { name: "EMAIL", href: `mailto:${email}` },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: accentGlowColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between min-h-[360px]">
        {/* Main Grid: Left Headline & Bio, Right Email & Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end justify-between">
          {/* Left Column: GET IN CONTACT */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-0 leading-[0.9]">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white font-grotesk tracking-tight">
                GET IN
              </h2>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-[#4a4f58] font-grotesk tracking-tight">
                CONTACT
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 font-medium max-w-md pt-2 leading-relaxed">
              Open for opportunities and freelance projects. Let&apos;s create something meaningful.
            </p>
          </div>

          {/* Right Column: Email Address & Social Links */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end justify-end space-y-5">
            {/* Clickable Email on a Single Line */}
            <div className="group flex flex-col items-start lg:items-end space-y-2">
              <a
                href={`mailto:${email}`}
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-extrabold text-white ${accentHoverClass} transition-all duration-300 font-display tracking-tight whitespace-nowrap block hover:scale-[1.02] transform`}
                style={{
                  textShadow: `0 0 30px rgba(255,255,255,0.15)`,
                }}
              >
                {email}
              </a>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                    <span>CLICK TO COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links Row with Hover Pills */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-xs sm:text-sm font-mono font-bold tracking-[0.18em] text-neutral-300 hover:text-white uppercase transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-black/50"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Centered Line */}
        <div className="pt-16 sm:pt-24 mt-8 border-t border-white/5 flex items-center justify-center text-center">
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500">
            © 2026 SHLOK SHUKLA - DESIGNED &amp; DEVELOPED
          </p>
        </div>
      </div>
    </section>
  );
}
