"use client";

import React from "react";
import { motion } from "framer-motion";
import { codeSkillsData, designSkillsData } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Award, GraduationCap, Layers, Code2 } from "lucide-react";
import { Mode } from "./Hero";

interface AboutProps {
  mode?: Mode;
}

export function About({ mode = "code" }: AboutProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const activeSkillsData = isCode ? codeSkillsData : designSkillsData;

  const codeHighlights = [
    {
      icon: GraduationCap,
      title: "B.Tech in CSE",
      subTitle: "CGPA: 9.01 / 10.0",
      desc: "VIT Bhopal University • Computer Science & Engineering.",
    },
    {
      icon: Code2,
      title: "Full-Stack Development",
      subTitle: "React • Node.js • Python",
      desc: "Building scalable web apps, REST APIs, and database architectures.",
    },
    {
      icon: Award,
      title: "Cloud & GenAI Systems",
      subTitle: "AWS • OCI • LLMs",
      desc: "Building GenAI pipelines, machine learning models, and cloud infrastructure.",
    },
  ];

  const designHighlights = [
    {
      icon: GraduationCap,
      title: "B.Tech in CSE",
      subTitle: "CGPA: 9.01 / 10.0",
      desc: "VIT Bhopal University • Strong analytical & problem solving foundation.",
    },
    {
      icon: Layers,
      title: "Product & UI/UX Design",
      subTitle: "Figma • Design Systems",
      desc: "Crafting end-to-end user interfaces, design tokens, and wireframes.",
    },
    {
      icon: Award,
      title: "Google Certified UX",
      subTitle: "Professional Certificate",
      desc: "User research, usability testing, and human-centered design craft.",
    },
  ];

  const activeHighlights = isCode ? codeHighlights : designHighlights;

  return (
    <section id="about" className="py-24 relative bg-grid border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge={isCode ? "Software Engineering Bio" : "Product & Design Bio"}
          title="ABOUT ME"
          subtitle={
            isCode
              ? "Passionate software engineer specialized in Python, Java, Cloud Infrastructure (AWS), Machine Learning, and robust Full-Stack architecture."
              : "Passionate product designer focused on high-craft visual interfaces, cohesive design systems, and intuitive digital experiences."
          }
          accentColor={isCode ? "#0070F3" : "#ff4d00"}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio and Key Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-[#111113] border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
                  style={{
                    borderColor: accentColor,
                    boxShadow: `0 0 20px ${isCode ? "rgba(0,112,243,0.35)" : "rgba(255,77,0,0.35)"}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shlok.png"
                    alt="Shlok Shukla"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Hello, I&apos;m Shlok Shukla
                  </h3>
                  <span
                    className="text-xs font-semibold tracking-wide uppercase font-mono"
                    style={{ color: accentColor }}
                  >
                    {isCode ? "Software Engineer & Data Enthusiast" : "Product Designer & UX Specialist"}
                  </span>
                </div>
              </div>

              {isCode ? (
                <>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    I am a Computer Science undergraduate at <strong className="text-white">VIT Bhopal University (9.01 CGPA)</strong> with hands-on experience across full-stack development, cloud computing on AWS, and Machine Learning.
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                    My core technical stack includes <span className="text-neutral-200 font-medium">Python, Java, SQL, JavaScript, React, Node.js, AWS, and Keras</span>. I love solving algorithmic challenges, building robust REST APIs, and architecting scalable backend systems.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    I am a Product &amp; UX Designer with a technical background from <strong className="text-white">VIT Bhopal University (9.01 CGPA)</strong> and a Google UX Design Professional Certification.
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                    I combine design craft (<span className="text-neutral-200 font-medium">Figma, design systems, micro-interactions</span>) with technical understanding to create products that are beautiful, intuitive, and engineering-ready.
                  </p>
                </>
              )}
            </div>

            {/* Feature Cards with Hover Lifts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-5 rounded-2xl bg-[#111113] border border-white/10 flex flex-col justify-between hover:border-white/30 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-300 group cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.1)" : "rgba(255,77,0,0.1)",
                        borderColor: isCode ? "rgba(0,112,243,0.25)" : "rgba(255,77,0,0.25)",
                        color: accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight group-hover:text-white transition-colors">{item.title}</h4>
                      {item.subTitle && (
                        <span
                          className="text-[11px] font-mono font-bold block mt-1"
                          style={{ color: accentColor }}
                        >
                          {item.subTitle}
                        </span>
                      )}
                      <p className="text-xs text-neutral-400 group-hover:text-neutral-300 mt-1.5 leading-normal font-sans transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Skills Matrix with Hover Pop Pills */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
              <h3 className="text-xl font-bold text-white font-display mb-6 flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
                {isCode ? "Technical Stack & Tools" : "Design & Product Skills"}
              </h3>

              <div className="space-y-6">
                {activeSkillsData.map((category) => (
                  <div key={category.title}>
                    <h4
                      className="text-xs uppercase tracking-wider font-bold mb-3 font-mono"
                      style={{ color: accentColor }}
                    >
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white border border-white/10 hover:border-white/30 hover:scale-110 hover:-translate-y-1 transition-all duration-200 flex items-center gap-1.5 shadow-sm group cursor-default"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                            style={{ color: accentColor }}
                          />
                          <span>{skill.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
