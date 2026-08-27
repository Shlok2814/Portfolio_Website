"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, X, Calendar } from "lucide-react";
import { Mode } from "./Hero";

interface CertificationsProps {
  mode?: Mode;
}

interface CertificateItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  fullTitle: string;
  issuedDate: string;
  verifyUrl: string;
  description: string;
  skills: string[];
}

export function Certifications({ mode = "code" }: CertificationsProps) {
  const isCode = mode === "code";
  const accentColor = isCode ? "#0070F3" : "#ff4d00";
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const codeCertificates: CertificateItem[] = [
    {
      id: "aws-cloud",
      year: "2024",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      fullTitle: "AWS Certified Cloud Practitioner",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://www.credly.com/badges/c54d392d-64df-4994-95ba-9c548e272816/public_url",
      description:
        "Validates overall understanding of AWS Cloud platform, covering core cloud architecture, security, compliance, compute, database, storage services, and cloud economics.",
      skills: [
        "Cloud Architecture",
        "AWS Services",
        "Cloud Security",
        "Scalability",
        "Billing & Pricing",
      ],
    },
    {
      id: "oracle-ds",
      year: "2024",
      title: "Oracle Cloud Certified Data Science Professional",
      issuer: "Oracle Cloud",
      fullTitle: "Oracle Cloud Infrastructure 2024 Data Science Professional",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://drive.google.com/file/d/1MdTtKdfzFgJgSPE5pbuthOhDRKwATZFC/view?usp=sharing",
      description:
        "Demonstrates proficiency in building, training, evaluating, and deploying machine learning models on Oracle Cloud Infrastructure using open-source Python frameworks.",
      skills: [
        "Data Science",
        "Machine Learning Pipelines",
        "Model Deployment",
        "Python",
        "OCI Infrastructure",
      ],
    },
    {
      id: "gcp-genai",
      year: "2024",
      title: "Google Cloud Computing Foundations & Generative AI",
      issuer: "Google Cloud",
      fullTitle: "Google Cloud Computing Foundations & Generative AI",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://www.cloudskillsboost.google/public_profiles/45f04d07-b121-47b6-b609-50d75f6c5f19",
      description:
        "Comprehensive foundations in Google Cloud infrastructure, big data, machine learning workflows, and hands-on Generative AI / Large Language Model development.",
      skills: [
        "Generative AI",
        "LLM Applications",
        "Google Cloud Platform",
        "Cloud Storage & Compute",
      ],
    },
    {
      id: "google-data-analytics",
      year: "2024",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google & Coursera",
      fullTitle: "Google Data Analytics Professional Certificate",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://www.credly.com/badges/c9aaae62-bce7-4e2c-ba19-36d0848daf2a/public_url",
      description:
        "Hands-on practice in data analysis, data cleaning, SQL query optimization, visualizations, and problem solving to transform raw data into actionable insights.",
      skills: [
        "SQL",
        "Data Analysis",
        "Data Cleaning",
        "Data Visualization",
        "Spreadsheets",
      ],
    },
    {
      id: "gfg-fullstack",
      year: "2024",
      title: "Full Stack Developer Bootcamp",
      issuer: "GeeksForGeeks",
      fullTitle: "Full Stack Web Development Bootcamp",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://drive.google.com/file/d/1HRc-64Ge0f7JbDC-cqZquVK-AZt0yAKG/view?usp=sharing",
      description:
        "Rigorous training in modern full stack development: React.js, Node.js, Express, REST APIs, database integration (SQL & NoSQL), and system architecture.",
      skills: [
        "Full Stack Development",
        "React.js",
        "Node.js",
        "REST APIs",
        "Database Architecture",
      ],
    },
    {
      id: "gfg-js",
      year: "2024",
      title: "JavaScript Full Course",
      issuer: "GeeksForGeeks",
      fullTitle: "JavaScript Complete Mastery Course",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://drive.google.com/file/d/1bEDj9uAOmEeoEecs3EyZnEnLSFWF3Wba/view?usp=sharing",
      description:
        "Deep dive into modern JavaScript (ES6+), asynchronous programming, closures, DOM manipulation, promises, event loops, and clean modular code design.",
      skills: [
        "JavaScript (ES6+)",
        "Async/Await",
        "DOM Manipulation",
        "Event Architecture",
      ],
    },
  ];

  const designCertificates: CertificateItem[] = [
    {
      id: "google-ux",
      year: "2024",
      title: "Google UX Design Professional Certificate",
      issuer: "Coursera & Google",
      fullTitle: "Google UX Design Professional Certificate (v.3)",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://www.credly.com/badges/4c72e32b-ca3c-47c7-8350-17e1ed8d66fe/public_url",
      description:
        "A comprehensive professional certificate program by Google covering the full UX design process: empathizing with users, defining pain points, ideating solutions, creating wireframes and prototypes, and iterating on designs. Includes building a professional portfolio.",
      skills: [
        "User Experience (UX) Design",
        "Figma",
        "Wireframing",
        "Prototyping",
        "UX Research",
        "Usability Testing",
        "User-Centered Design",
        "Responsive Web Design",
        "Accessibility",
        "Design Systems",
      ],
    },
    {
      id: "google-data-analytics-design",
      year: "2024",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google & Coursera",
      fullTitle: "Google Data Analytics Professional Certificate",
      issuedDate: "Issued: 2024",
      verifyUrl:
        "https://www.credly.com/badges/c9aaae62-bce7-4e2c-ba19-36d0848daf2a/public_url",
      description:
        "Applied data analysis to inform product decisions, user journey tracking, quantitative research, and data-driven UX enhancements.",
      skills: [
        "Data-Driven UX",
        "User Analytics",
        "Quantitative Research",
        "Data Visualization",
      ],
    },
  ];

  const activeCertificates = isCode ? codeCertificates : designCertificates;

  return (
    <section id="certifications" className="py-20 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[160px] pointer-events-none opacity-15"
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
              {isCode ? "ENGINEERING CERTIFICATIONS" : "PRODUCT & DESIGN CREDENTIALS"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase">
            CERTIFICATIONS
          </h2>
        </div>

        {/* Certifications List */}
        <div className="space-y-4">
          {activeCertificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className={`group p-6 sm:p-7 rounded-2xl bg-[#111113] border border-white/10 ${isCode ? "hover:border-[#0070F3]/40" : "hover:border-[#ff4d00]/40"} transition-all duration-300 flex items-center justify-between cursor-pointer hover:bg-[#151518] hover:translate-x-1.5 hover:shadow-xl`}
            >
              <div className="flex items-center gap-4">
                {/* Title & Issuer */}
                <div>
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold text-white font-grotesk ${isCode ? "group-hover:text-[#0070F3]" : "group-hover:text-[#ff4d00]"} transition-colors duration-200`}>
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                  View Credential
                </span>
                <div
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                >
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credential Details Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#111113] border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Header with Issuer Pill & Title */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3 bg-white/5 border border-white/10 text-neutral-300">
                    <Award className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    <span>{selectedCert.issuer}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-grotesk text-white">
                    {selectedCert.fullTitle}
                  </h3>
                  <p className="text-sm font-mono text-neutral-400 mt-1">
                    Issued to: <strong className="text-white">Shlok Shukla</strong>
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {selectedCert.description}
                </p>

                {/* Skills Tags */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Skills &amp; Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Issue Date & Verify Link */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedCert.issuedDate}</span>
                  </div>

                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-black uppercase tracking-wider text-black transition-all hover:scale-105 shadow-lg"
                    style={{ backgroundColor: accentColor, color: isCode ? "#ffffff" : "#000000" }}
                  >
                    <span>VERIFY CREDENTIAL</span>
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
