"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bookmark, ArrowUpRight } from "lucide-react";
import { Mode } from "@/components/sections/Hero";

interface NavbarProps {
  mode?: Mode;
}

export function Navbar({ mode = "code" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "About me", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "opacity-100 translate-y-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Site Logo / Name */}
        <Link
          href="#"
          className="group flex items-center gap-2 focus:outline-none"
        >
          <span className="text-base sm:text-lg font-extrabold tracking-wider uppercase text-white font-display transition-all duration-300 group-hover:tracking-widest" style={{ textShadow: `0 0 16px ${accentColor}30` }}>
            SHLOK SHUKLA
          </span>
          <span
            className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: accentColor, color: accentColor }}
          />
        </Link>

        {/* Center-Right & Far-Right: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav Links */}
          <nav className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative py-1 text-neutral-300 hover:text-white transition-all duration-200 text-sm tracking-wide hover:-translate-y-0.5"
              >
                <span>{link.name}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                />
              </a>
            ))}
          </nav>

          {/* Far Right Action Group: Contact Pill Button + Bookmark Icon */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full font-extrabold text-xs font-mono tracking-wider uppercase transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:brightness-110"
              style={{
                backgroundColor: accentColor,
                color: isCode ? "#ffffff" : "#000000",
                boxShadow: `0 0 25px ${isCode ? "rgba(0,112,243,0.5)" : "rgba(255,77,0,0.5)"}`,
              }}
            >
              CONTACT
            </a>

            <a
              href="#contact"
              aria-label="Save / Contact"
              className="group flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-neutral-100 text-black transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg shrink-0 hover:shadow-[0_0_18px_rgba(255,255,255,0.4)]"
            >
              <Bookmark className="w-4 h-4 fill-black stroke-black transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase font-mono"
            style={{
              backgroundColor: accentColor,
              color: isCode ? "#ffffff" : "#000000",
            }}
          >
            CONTACT
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-200 hover:text-white text-base font-medium py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center py-3 rounded-full font-extrabold text-xs font-mono uppercase tracking-wider"
                  style={{
                    backgroundColor: accentColor,
                    color: isCode ? "#ffffff" : "#000000",
                  }}
                >
                  CONTACT
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
