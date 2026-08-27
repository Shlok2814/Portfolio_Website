"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink, ArrowUpRight, Code2, Layers, LineChart, ChevronRight, ChevronLeft, Maximize2, X, CheckCircle2, Eye } from "lucide-react";
import { Mode } from "./Hero";
import { Project } from "@/types";

interface ProjectsProps {
  mode?: Mode;
}

export function Projects({ mode = "code" }: ProjectsProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const cardBorderHover = isCode ? "hover:border-[#0070F3]/50" : "hover:border-[#ff4d00]/50";
  const titleHoverColor = isCode ? "group-hover:text-[#0070F3]" : "group-hover:text-[#ff4d00]";

  const [activeTab, setActiveTab] = useState<"all" | "ui-ux" | "product-analysis">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [lightboxFrame, setLightboxFrame] = useState<{
    index: number;
    title: string;
    image: string;
    description?: string;
  } | null>(null);

  // Filter projects: in Code mode show engineering and code/data projects (excluding ui-ux); in Craft mode show ui-ux and product-analysis
  const filteredProjects = isCode
    ? projectsData.filter((p) => p.section !== "ui-ux")
    : activeTab === "all"
    ? projectsData.filter((p) => p.section === "ui-ux" || p.section === "product-analysis")
    : projectsData.filter((p) => p.section === activeTab);

  const openProjectModal = (proj: Project) => {
    setSelectedProject(proj);
    setActiveFrameIndex(0);
  };

  return (
    <section id="projects" className="py-24 relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div
        className="absolute top-1/3 right-10 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[180px] pointer-events-none opacity-15"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col mb-8">
          <SectionHeading
            badge={isCode ? "Engineering & Data Projects" : "Craft & Product Portfolio"}
            title="PROJECTS"
            subtitle={
              isCode
                ? "Full-stack web applications, machine learning models, and data analytics pipelines built with performance and precision."
                : "Crafted user experiences spanning high-fidelity UI/UX design systems and quantitative product analytics."
            }
            accentColor={accentColor}
          />

          {/* Persona Sub-category Switcher (Visible in Craft Mode) - Centered in Middle */}
          {!isCode && (
            <div className="flex justify-center items-center w-full my-4">
              <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#111113] border border-white/10 shadow-lg">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    activeTab === "all"
                      ? "bg-white text-black shadow-md"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  All Works
                </button>
                <button
                  onClick={() => setActiveTab("ui-ux")}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    activeTab === "ui-ux"
                      ? "bg-[#ff4d00] text-black shadow-md font-extrabold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>UI/UX Design</span>
                </button>
                <button
                  onClick={() => setActiveTab("product-analysis")}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    activeTab === "product-analysis"
                      ? "bg-[#ff4d00] text-black shadow-md font-extrabold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>Product Analysis</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative rounded-3xl bg-[#111113] border border-white/10 ${cardBorderHover} transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)]`}
            >
              <div>
                {/* Image Preview Container with Smooth Scale on Hover */}
                <div
                  onClick={() => openProjectModal(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/70 backdrop-blur-md text-neutral-200 border border-white/10 group-hover:border-white/25 transition-colors">
                      {project.category}
                    </span>
                    {project.frames && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-black/80 text-[#ff4d00] border border-white/10 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {project.frames.length} Screens
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-7">
                  <h3 className={`text-xl font-bold text-white font-grotesk ${titleHoverColor} transition-colors duration-300 flex items-center justify-between`}>
                    <span>{project.title}</span>
                    <ArrowUpRight
                      className="w-5 h-5 text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: "inherit" }}
                    />
                  </h3>
                  <p className="mt-2.5 text-sm text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7">
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/15 hover:border-white/30 hover:text-white hover:scale-110 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  {project.details && (
                    <button
                      onClick={() => openProjectModal(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:brightness-125"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.15)" : "rgba(255,77,0,0.15)",
                        color: accentColor,
                        border: `1px solid ${isCode ? "rgba(0,112,243,0.35)" : "rgba(255,77,0,0.35)"}`,
                      }}
                    >
                      <span>{project.frames ? "View Screens & Details" : "View Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                    >
                      <Code2 className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:brightness-125"
                      style={{
                        backgroundColor: isCode ? "rgba(0,112,243,0.15)" : "rgba(255,77,0,0.15)",
                        color: accentColor,
                        border: `1px solid ${isCode ? "rgba(0,112,243,0.35)" : "rgba(255,77,0,0.35)"}`,
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Prototype</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#111113] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 max-h-[92vh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-white/10 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3"
                    style={{
                      backgroundColor: isCode ? "rgba(0,112,243,0.12)" : "rgba(255,77,0,0.12)",
                      color: accentColor,
                      border: `1px solid ${isCode ? "rgba(0,112,243,0.3)" : "rgba(255,77,0,0.3)"}`,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-grotesk text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* ENLARGED FRAME-BY-FRAME SHOWCASE SCREEN (If frames exist) */}
                {selectedProject.frames && selectedProject.frames.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    {/* Frame Tab Navigation */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedProject.frames.map((frame, idx) => (
                          <button
                            key={frame.frameNumber}
                            onClick={() => setActiveFrameIndex(idx)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                              activeFrameIndex === idx
                                ? "bg-white text-black shadow-lg scale-105"
                                : "bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10"
                            }`}
                          >
                            <span>FRAME {frame.frameNumber}</span>
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                        Screen {activeFrameIndex + 1} of {selectedProject.frames.length}
                      </span>
                    </div>

                    {/* Prominent Enlarged Screen Stage */}
                    {(() => {
                      const curFrame = selectedProject.frames[activeFrameIndex] || selectedProject.frames[0];
                      return (
                        <div className="space-y-3">
                          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-white/20 bg-black aspect-[16/9] shadow-2xl group/stage">
                            <Image
                              src={curFrame.image}
                              alt={curFrame.title}
                              fill
                              unoptimized
                              className="object-contain transition-transform duration-500 group-hover/stage:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                            <div className="absolute top-4 left-4 z-10">
                              <span
                                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border"
                                style={{ borderColor: accentColor, color: accentColor }}
                              >
                                FRAME {curFrame.frameNumber}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                setLightboxFrame({
                                  index: activeFrameIndex,
                                  title: curFrame.title,
                                  image: curFrame.image,
                                  description: curFrame.description,
                                })
                              }
                              className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/30 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg backdrop-blur-md"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Enlarge Fullscreen</span>
                            </button>
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                              <h4 className="text-sm sm:text-base font-black font-grotesk text-white">
                                {curFrame.title}
                              </h4>
                              {curFrame.description && (
                                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-0.5 font-sans">
                                  {curFrame.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Standard Image Display if no frames defined */
                  selectedProject.image && (
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 aspect-[16/9]">
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )
                )}

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>

                {selectedProject.details && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                      Key Analysis &amp; Contributions
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.details.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            style={{ color: accentColor }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Tech Stack &amp; Methodologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                      style={{
                        backgroundColor: accentColor,
                        color: isCode ? "#ffffff" : "#000000",
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>VIEW LIVE PROTOTYPE</span>
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all hover:scale-105 shadow-md ${
                        selectedProject.link
                          ? "bg-white/10 hover:bg-white/15 text-white border border-white/15"
                          : ""
                      }`}
                      style={
                        !selectedProject.link
                          ? {
                              backgroundColor: accentColor,
                              color: isCode ? "#ffffff" : "#000000",
                            }
                          : {}
                      }
                    >
                      <Code2 className="w-4 h-4" />
                      <span>VIEW ON GITHUB</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxFrame && selectedProject?.frames && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl">
            <button
              onClick={() => setLightboxFrame(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-200 z-30 hover:scale-110"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {selectedProject.frames.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const nextIdx = lightboxFrame.index > 0 ? lightboxFrame.index - 1 : selectedProject.frames!.length - 1;
                    const f = selectedProject.frames![nextIdx];
                    setLightboxFrame({ index: nextIdx, title: f.title, image: f.image, description: f.description });
                    setActiveFrameIndex(nextIdx);
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all z-30 hover:scale-110 backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    const nextIdx = lightboxFrame.index < selectedProject.frames!.length - 1 ? lightboxFrame.index + 1 : 0;
                    const f = selectedProject.frames![nextIdx];
                    setLightboxFrame({ index: nextIdx, title: f.title, image: f.image, description: f.description });
                    setActiveFrameIndex(nextIdx);
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all z-30 hover:scale-110 backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="flex flex-col items-center justify-center w-full max-w-6xl max-h-[90vh]">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-[#ff4d00]/20 text-[#ff4d00] border border-[#ff4d00]/40">
                  FRAME {lightboxFrame.index + 1} OF {selectedProject.frames.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-grotesk text-white">{lightboxFrame.title}</h3>
              </div>
              <div className="relative w-full aspect-[16/9] max-h-[75vh] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
                <Image src={lightboxFrame.image} alt={lightboxFrame.title} fill unoptimized className="object-contain" />
              </div>
              {lightboxFrame.description && (
                <p className="mt-3 text-sm text-neutral-300 text-center max-w-2xl font-sans">{lightboxFrame.description}</p>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
