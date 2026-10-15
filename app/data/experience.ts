import type { Project } from "./projects";

export type ExperienceKind = "industry" | "research" | "education";

export const kindLabels: Record<ExperienceKind, string> = {
  industry: "Industry",
  research: "Research",
  education: "Education",
};

export type Experience = {
  id: string;
  kind: ExperienceKind;
  role: string;
  org: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
  link?: string;
  video?: string;
  post?: string;
  /** Image path under /public shown at the top of the modal and on the Work card. */
  cover?: string;
  images?: string[];
  coverPosition?: string;
};

// Newest first.
export const experience: Experience[] = [
  {
    id: "aimi-research",
    kind: "research",
    role: "Research Intern",
    org: "Stanford Center for AI in Medicine & Imaging (AIMI)",
    start: "Sep 2026",
    end: "Present",
    highlights: ["Researching explainable AI."],
  },
  {
    id: "afrl",
    kind: "industry",
    role: "Software Development Intern",
    org: "Air Force Research Laboratory (GRILL)",
    video: "https://www.youtube.com/watch?v=9NhFAvo43VA",
    cover: "/images/afrl1.jpg",
    coverPosition: "center 15%",
    images: ["/images/afrl1.jpg", "/images/afrl.jpg"],
    start: "Jun 2026",
    end: "Aug 2026",
    location: "Wright-Patterson AFB, OH · On-site",
    highlights: [
      "Digitized an ISR (Intelligence, Surveillance and Reconnaissance) board game for the Gaming Research Integration for Learning Laboratory (GRILL), enabling Air Force personnel to simulate strategies used in military ISR missions.",
      "Players deploy imaging, signal, and cyber intelligence tools to gather information and deduce the location of enemy points of interest, before forming a strike path to the opposing main headquarters while avoiding air defenses.",
      "Reduced gameplay length by 85%, eliminating the human mediator required to translate players' actions in the game's physical version.",
      "Presented ISRDX at the GRILL Showcase 2026.",
    ],
  },
  {
    id: "paradigm",
    kind: "industry",
    role: "Software Development Intern",
    org: "Paradigm CyberVentures",
    start: "Jun 2026",
    end: "Aug 2026",
    location: "Cincinnati, OH",
    highlights: [
      "Developed full-stack features for Paradigm Centra, a cybersecurity education platform, supporting role-based access control, Capture the Flag (CTF) challenges, and incident response simulations.",
      "Maintained CRUD functionality within complex permission and authentication systems using TypeScript and SQL databases.",
      "Collaborated with UI/UX designers to translate Figma mockups into responsive, production-ready web interfaces.",
    ],
  },
  {
    id: "osc",
    kind: "research",
    role: "Student Researcher",
    org: "Ohio Supercomputer Center",
    post: "https://x.com/ti84plusbaby/status/2066169944060907777",
    cover: "/images/osc4.jpg",
    images: ["/images/osc4.jpg", "/images/osc1.jpg", "/images/osc2.jpg", "/images/osc3.jpg", "/images/osc5.jpg"],
    start: "Jun 2026",
    end: "Jun 2026",
    location: "Columbus, OH · On-site",
    highlights: [
      "Fine-tuned a YOLOv8 model to detect weeds in crop and field images. Instead of spraying an entire field with pesticide, the model runs real-time inference so only areas with detected weeds are sprayed, automating the process and reducing pesticide use.",
    ],
  },
  {
    id: "aimi-summer",
    kind: "research",
    role: "Summer Intern",
    org: "Stanford Center for AI in Medicine & Imaging (AIMI)",
    start: "Jun 2026",
    end: "Jun 2026",
    highlights: [
      "Developed a 2-stage pipeline for pneumonia detection on chest X-ray images and radiologist reports: patients are classified with a densenet121-res224-rsna backbone, and lesions are localized with a Faster R-CNN detector on a ResNet50 backbone.",
    ],
    link: "https://github.com/emilyahmad/Pneumonia-Detection",
  },
  {
    id: "caresource",
    kind: "industry",
    role: "Cybersecurity Intern",
    org: "CareSource",
    start: "Nov 2025",
    end: "Feb 2026",
    location: "Dayton, OH · On-site",
    highlights: [
      "Managed identity & access management, processing Ohio Medicaid access requests and completing remediation tasks in GuidingCare and ServiceNow.",
    ],
  },
  {
    id: "ge-aerospace",
    kind: "industry",
    role: "Data Science Intern",
    org: "GE Aerospace",
    cover: "/images/ge2.jpg",
    images: ["/images/ge2.jpg", "/images/ge1.gif"],
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Cincinnati, OH · On-site",
    highlights: [
      "Built front-end applications in Palantir Foundry to visualize supply chain ontology integration, data cleaning workflows, and data lineage using Miro.",
      "Led the migration of KanbanBox identity and access management, enabling a seamless transition for users across 60 manufacturing sites while collaborating directly with the company's co-founders.",
    ],
  },
];

export function dateRange(e: Experience) {
  return e.start === e.end ? e.start : `${e.start} – ${e.end}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Months since year 0 for a "Mon YYYY" label; "Present" is the current month. */
export function monthIndex(label: string) {
  if (label === "Present") {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [mon, year] = label.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(mon);
}

/** Shapes an experience entry so it can be shown in the project modal. */
export function toProject(e: Experience): Project {
  return {
    id: e.id,
    title: e.role,
    date: dateRange(e),
    summary: e.org,
    description: e.highlights,
    org: e.org,
    location: e.location,
    tags: [],
    link: e.link,
    video: e.video,
    post: e.post,
    cover: e.cover,
    images: e.images,
    coverPosition: e.coverPosition,
  };
}
