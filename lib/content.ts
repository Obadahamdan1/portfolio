// Central place for all placeholder content. Fill these in later.

export const PROFILE = {
  name: "Obada",
  fullName: "Obada Hamdan",
  // Intro shown in the hero, under the headline. `introLead` is emphasized.
  introLead: "AI Engineer",
  introLines: [
    " in Amman, Jordan. I enjoy building LLM-powered solutions, training NLP models, and designing AI agents that actually solve real problems.",
    "Living in one of the most exciting moments in tech and trying to make the most of it.",
  ],
  email: "obadahamdan004@gmail.com",
  github: "https://github.com/Obadahamdan1",
  linkedin: "https://www.linkedin.com/in/obada-hamdan-6b5444323",
  letterboxd: "https://letterboxd.com/obadahamdan/",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#software" },
];

export const ABOUT = {
  bio: [
    "I'm an AI Engineer intern at NourNet, where I build SOC agents that autonomously investigate security tickets. My work spans LLM orchestration, model fine-tuning, and wiring agents to real tools via MCP.",
    "In my free time, you'll find me watching movies, hanging out with friends, gaming, or obsessing over the latest hardware drop. Oh, and trying to keep up with AI, which somehow keeps getting more interesting every week.",
  ],
  technologies: [
    "Python",
    "LangChain",
    "LangGraph",
    "MCP",
    "Hugging Face",
    "Prefect",
    "MLflow",
    "Docker",
    "Splunk",
    "Jira",
    "GCP",
    "Git",
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: "NourNet",
    role: "AI Engineer",
    period: "April 2026 — Present",
    bullets: [
      "Built an AI-powered SOC system that connects Jira and Splunk via MCP — agents investigate security tickets and generate structured verdicts automatically, cutting out the manual work.",
      "Fine-tuned Gemma-4-2B on 25k+ historical SOC tickets using Vertex AI and LoRA to transition toward on-premise execution, eliminating API latency, recurring costs, and third-party data risks.",
      "Developed a multi-tool LLM agent and benchmarked several models including Qwen 35B and Gemma 4 27B — Gemma hit 90% accuracy on real-world threat classification across categories like True Positive, Benign Positive, and Merged Duplicate.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: { live?: string; source?: string };
};

export const PROJECTS: Project[] = [
  {
    title: "Root-Pattern Chemistry",
    description:
      "Morphology-aware Arabic word embeddings that decompose each word into root, pattern, and affixes, fuse them with a character-CNN, and train with Skip-Gram negative sampling.",
    image: "/projects/arabic-embeddings.png",
    tags: ["Python", "PyTorch", "CAMeL Tools", "NLP"],
    links: {
      source:
        "https://github.com/Obadahamdan1/Root-Pattern-Chemistry-Modeling-Arabic-Morphological-Interactions-for-Word-Embeddings",
    },
  },
];
