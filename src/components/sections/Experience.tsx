"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  X,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { Mode } from "./Hero";

interface ExperienceProps {
  mode?: Mode;
}

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department: string;
  location: string;
  period: string;
  certificateUrl: string;
  summary: string;
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  skills: string[];
}

export function Experience({ mode = "code" }: ExperienceProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  const experiences: ExperienceItem[] = [
    {
      id: "drdo-intern",
      role: "Summer Intern - DRDO",
      organization: "DRDO — Ministry of Defence",
      department: "Scientific Analysis Group (SAG)",
      location: "Delhi, India",
      period: "May 2026 – June 2026",
      certificateUrl:
        "https://drive.google.com/file/d/1aWKuo6IQLrv93QDWolAjf81oD5HNOtCd/view",
      summary:
        "Engineered automated data processing pipelines and validated over 50,000+ records to support advanced analytics models at the Scientific Analysis Group (SAG), Defence Research and Development Organisation.",
      metrics: [
        { label: "Data Records Processed", value: "50,000+" },
        { label: "Model Accuracy Achieved", value: "88.1%" },
        { label: "Workflow Automation", value: "Python Pipelines" },
      ],
      bulletPoints: [
        "Processed and validated 50,000+ records to support an analytics model, achieving 88.1% accuracy while maintaining strict data quality and consistency standards.",
        "Automated data cleaning and validation workflows in Python, cutting manual processing effort and improving pipeline turnaround time.",
        "Analyzed performance metrics across iterative testing cycles and presented data-backed findings to guide process improvements.",
        "Collaborated with cross-functional teams to translate technical results into clear, actionable reports for stakeholder review.",
      ],
      skills: [
        "Python",
        "Data Validation",
        "Analytics Modeling",
        "Automated Pipelines",
        "Metric Analysis",
        "Technical Documentation",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[170px] pointer-events-none opacity-15"
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
              CAREER &amp; INTERNSHIPS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`p-7 sm:p-9 rounded-3xl bg-[#111113] border border-white/10 ${isCode ? "hover:border-[#0070F3]/40" : "hover:border-[#ff4d00]/40"} transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Role Info & Badges */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-transform hover:scale-105"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.12)" : "rgba(255,77,0,0.12)",
                        color: accentColor,
                        border: `1px solid ${isCode ? "rgba(0,112,243,0.25)" : "rgba(255,77,0,0.25)"}`,
                      }}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {exp.organization}
                    </span>

                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>

                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-grotesk text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-mono text-neutral-400 mt-0.5">
                      {exp.department}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed font-sans">
                    {exp.summary}
                  </p>
                </div>

                {/* Right: Metrics & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
                  {/* Quick Stat Pill with Hover Pop */}
                  <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl px-5 py-3 hover:scale-105">
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">
                        Accuracy
                      </span>
                      <span
                        className="text-lg font-black font-grotesk tracking-tight"
                        style={{ color: accentColor }}
                      >
                        88.1%
                      </span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-left">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">
                        Dataset
                      </span>
                      <span className="text-lg font-black font-grotesk text-white tracking-tight">
                        50,000+
                      </span>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExp(exp)}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                      style={{
                        backgroundColor: accentColor,
                        color: isCode ? "#ffffff" : "#000000",
                      }}
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Experience Details Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#111113] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.12)" : "rgba(255,77,0,0.12)",
                        color: accentColor,
                        border: `1px solid ${isCode ? "rgba(0,112,243,0.25)" : "rgba(255,77,0,0.25)"}`,
                      }}
                    >
                      {selectedExp.organization}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedExp.period} • {selectedExp.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-grotesk text-white">
                    {selectedExp.role}
                  </h3>
                  <p className="text-sm font-mono text-neutral-400 mt-1">
                    {selectedExp.department}
                  </p>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedExp.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        {metric.label}
                      </span>
                      <span
                        className="text-xl font-black font-grotesk tracking-tight"
                        style={{ color: accentColor }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Contributions / Bullet Points */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Key Contributions &amp; Impact
                  </h4>
                  <ul className="space-y-3">
                    {selectedExp.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                        <CheckCircle2
                          className="w-5 h-5 shrink-0 mt-0.5"
                          style={{ color: accentColor }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Used */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Skills &amp; Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer with Certificate Button */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono text-neutral-400">
                    Official DRDO Summer Internship Verification
                  </span>

                  <a
                    href={selectedExp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: accentColor,
                      color: isCode ? "#ffffff" : "#000000",
                    }}
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>VIEW DRDO CERTIFICATE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
