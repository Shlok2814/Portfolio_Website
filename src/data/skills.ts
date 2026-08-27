import { SkillCategory } from "@/types";

export const codeSkillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frameworks & Cloud Tools",
    skills: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Keras" },
      { name: "LangChain" },
      { name: "Streamlit" },
      { name: "AWS" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
    ],
  },
  {
    title: "Core Engineering Competencies",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "Machine Learning & GenAI" },
      { name: "API Development" },
      { name: "Cloud Computing" },
      { name: "Agile Development" },
    ],
  },
];

export const designSkillsData: SkillCategory[] = [
  {
    title: "Product & UX Design",
    skills: [
      { name: "UI/UX Design" },
      { name: "Design Systems" },
      { name: "Wireframing & Prototyping" },
      { name: "User Research" },
      { name: "Usability Testing" },
      { name: "Micro-interactions" },
    ],
  },
  {
    title: "Tools & Creative Stack",
    skills: [
      { name: "Figma & FigJam" },
      { name: "Unity" },
      { name: "Adobe Creative Suite" },
      { name: "Notion & Linear" },
      { name: "Framer" },
    ],
  },
  {
    title: "Product Strategy & Execution",
    skills: [
      { name: "MVP Scoping & Roadmapping" },
      { name: "User Journey Mapping" },
      { name: "High-Fidelity Prototyping" },
      { name: "Design-to-Code Hand-off" },
      { name: "User-Centered Design" },
    ],
  },
];

// Default export for backward compatibility
export const skillsData = codeSkillsData;
