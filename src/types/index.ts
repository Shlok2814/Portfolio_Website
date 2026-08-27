export interface Project {
  id: string;
  title: string;
  category: string;
  section?: "ui-ux" | "product-analysis" | "engineering";
  description: string;
  details?: string[];
  tags: string[];
  image: string;
  gallery?: string[];
  frames?: {
    frameNumber: number;
    title: string;
    image: string;
    description?: string;
  }[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}
