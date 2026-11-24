import { experience, toProject } from "./experience";

export type Project = {
  id: string;
  title: string;
  /** Image path under /public, or omit to use the section's gradient cover. */
  cover?: string;
  /** Extra images shown in the modal, under the description. */
  images?: string[];
  /** Which part of the cover to keep when it's cropped, e.g. "top" or "center 30%". Defaults to center. */
  coverPosition?: string;
  /** Shown on the card. A month ("Jun 2026") or a range ("Apr – Nov 2026"); rows sort by its end. */
  date?: string;
  /** Day of the last commit (YYYY-MM-DD). Breaks ties between cards that end in the same month. */
  updated?: string;
  summary: string;
  /** A paragraph, or a list of bullet points. */
  description: string | string[];
  org?: string;
  location?: string;
  tags: string[];
  link?: string;
  /** A live version of the project (a deployed site or playable build), shown as a "Demo" row in the modal. */
  demo?: string;
  /** A video about the project, shown as its own "Video" row in the modal. */
  video?: string;
  /** A social post about the project (e.g. on X), shown as a "Post" row in the modal. */
  post?: string;
  /** What the project won, e.g. "Winner, Code4Nature Hackathon". Adds a "Winner" ribbon to the card. */
  award?: string;
};

/** An image hosted on X (Twitter), at the "medium" size (~1200px), which is plenty for cards and modals. */
function xImage(id: string) {
  return `https://pbs.twimg.com/media/${id}?format=jpg&name=medium`;
}

/** Paths for images downloaded from a project's GitHub repo into public/images/projects/<id>/. */
function gallery(id: string, count: number) {
  return Array.from({ length: count }, (_, i) => `/images/projects/${id}/${i + 1}.jpg`);
}

export type Section = {
  id: string;
  title: string;
  /** Tailwind gradient used for cards without a cover image. */
  gradient: string;
  projects: Project[];
  /** Rows with a group render as non-collapsible subrows inside that group's collapsible section. */
  group?: "past";
};

export const sections: Section[] = [
  {
    id: "work",
    title: "Work",
    gradient: "from-berry-200 to-stone-100 dark:from-berry-900 dark:to-stone-900",
    projects: experience.filter((e) => e.kind !== "education").map(toProject),
  },
  {
    id: "hardware",
    title: "Hardware",
    group: "past",
    gradient: "from-stone-300 to-stone-500 dark:from-stone-700 dark:to-stone-900",
    projects: [
      {
        id: "hackpad",
        date: "Apr 2026",
        cover: "/images/projects/hackpad/3.jpg",
        images: gallery("hackpad", 8),
        title: "Hackpad",
        summary: "A macropad with an OLED screen, LEDs and switches.",
        description: "A simple macropad with an OLED screen, LEDs and mechanical switches, built for Hack Club Forge.",
        tags: ["C++", "Hack Club"],
        link: "https://github.com/emilyahmad/hackpad",
      },
      {
        id: "devboard",
        updated: "2026-08-01",
        date: "Apr – Aug 2026",
        cover: "/images/projects/devboard/1.jpg",
        images: gallery("devboard", 6),
        title: "RP2040 Dev Board",
        summary: "A custom microcontroller development board.",
        description:
          "A custom development board built around the RP2040 MCU, with a USB-C connector, SPI flash memory, two switches, a crystal oscillator and more. Built for Hack Club Stasis.",
        tags: ["PCB", "Hack Club"],
        link: "https://github.com/emilyahmad/devboard",
      },
      {
        id: "floor-lamp-remote",
        updated: "2026-08-01",
        date: "Jun – Aug 2026",
        cover: "/images/projects/floor-lamp-remote/1.jpg",
        images: gallery("floor-lamp-remote", 7),
        title: "Floor Lamp Remote",
        summary: "An IR-controlled floor lamp.",
        description: "Wired a floor lamp to an IR-controlled relay and an Arduino so it can be switched with a remote. Built for Hack Club Horizons.",
        tags: ["Arduino", "C++", "Hack Club"],
        link: "https://github.com/emilyahmad/floor-lamp-remote",
      },
      {
        id: "blinky-board",
        updated: "2026-07-02",
        date: "Apr – Jul 2026",
        cover: "/images/projects/blinky-board/1.jpg",
        images: gallery("blinky-board", 6),
        title: "Blinky Board",
        summary: "An LED chaser inspired by Toro Inoue.",
        description:
          "A simple Toro Inoue-inspired blinky board and LED chaser, using NE555P and 4017 ICs to drive 10 LEDs of different colors.",
        tags: ["PCB", "Hack Club"],
        link: "https://github.com/emilyahmad/blinky-board",
      },
      {
        id: "smores-pad",
        updated: "2026-11-03",
        date: "Apr – Nov 2026",
        title: "S'mores Pad",
        summary: "A s'mores-themed macropad.",
        description:
          "A s'mores-themed macropad with 4 keys and a 0.91\" OLED, powered by a XIAO ESP32-C3. Marshmallow keycaps (taken from toasted-bread fidget keychains) sit on a chocolate and graham-cracker inspired 3D-printed case, which is still a work in progress.",
        tags: ["PCB", "ESP32", "C++"],
        link: "https://github.com/emilyahmad/smores-pad",
        video: "https://youtube.com/shorts/Tp6h0N3CoMg",
      },
      {
        id: "arduino-starter-kit",
        updated: "2026-05-12",
        date: "Apr – May 2026",
        title: "Arduino Starter Kit",
        summary: "Working through the Arduino Starter Kit.",
        description: "Projects from the Arduino Starter Kit, built for Hack Club Sleepover.",
        tags: ["Arduino", "C++", "Hack Club"],
        link: "https://github.com/emilyahmad/arduino-starter-kit",
      },
      {
        id: "pear-phone",
        updated: "2026-11-06",
        date: "May – Nov 2026",
        title: "Pear Phone",
        summary: "The pear phone from Victorious, for real.",
        description:
          "A work-in-progress recreation of the pear phones from Victorious: a touch screen in a pear-shaped case, with a home screen, an off button, some apps, and posting to the slap.com.",
        tags: ["C++", "Hardware"],
        link: "https://github.com/emilyahmad/pear-phone",
      },
      {
        id: "game-controller",
        updated: "2026-11-20",
        date: "Jul – Nov 2026",
        title: "Game Controller",
        summary: "A custom Bluetooth controller for Super Mario Bros.",
        description:
          "A work-in-progress custom game controller for playing Super Mario Bros on the Dolphin emulator. The breadboard prototype uses a joystick, push buttons and an ESP32 running ESP32-BLE-Gamepad. The KiCad schematic adds an accelerometer, a rumble motor and LED-lit buttons.",
        tags: ["ESP32", "C++", "KiCad"],
        link: "https://github.com/emilyahmad/game-controller",
      },
      {
        id: "hacker-card",
        updated: "2026-10-19",
        date: "Oct 2026",
        title: "Hacker Card",
        summary: "A PCB business card with an NFC-powered LED.",
        description:
          "A work-in-progress PCB business card with my name and links, and an LED that lights up using energy from NFC. Maybe a guestbook and touch sensors later.",
        tags: ["PCB", "NFC"],
        link: "https://github.com/emilyahmad/hacker-card",
      },
    ],
  },
  {
    id: "software",
    title: "Software & Games",
    group: "past",
    gradient: "from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700",
    projects: [
      {
        id: "pneumonia",
        updated: "2026-10-07",
        title: "Pneumonia Classifier",
        summary: "Two-stage deep learning pipeline for chest X-rays.",
        description:
          "Developed a two-stage deep learning pipeline for pneumonia detection from chest X-ray images and radiologist reports, using a DenseNet121 (RSNA ResNet-224) classifier followed by a Faster R-CNN with a ResNet50 backbone for lesion localization. Built at the Stanford Center for AI in Medicine & Imaging.",
        org: "Stanford AIMI",
        date: "Jun – Oct 2026",
        tags: ["Python", "Deep Learning", "Computer Vision"],
        link: "https://github.com/emilyahmad/Pneumonia-Detection",
      },
      {
        id: "weed-detector",
        post: "https://x.com/ti84plusbaby/status/2066169944060907777",
        cover: "/images/osc4.jpg",
        images: ["/images/osc4.jpg", "/images/osc1.jpg", "/images/osc2.jpg", "/images/osc3.jpg", "/images/osc5.jpg"],
        title: "Weed Detector",
        summary: "Real-time weed detection for precision spraying.",
        description:
          "Fine-tuned a YOLOv8 computer vision model for real-time weed detection in agricultural imagery, enabling precision pesticide application that reduces chemical usage by targeting only identified weeds. Built at the Ohio Supercomputer Center.",
        org: "Ohio Supercomputer Center",
        date: "Jun 2026",
        tags: ["Python", "YOLOv8", "Computer Vision"],
      },
      {
        id: "chem-lab",
        updated: "2026-11-02",
        date: "Apr – Nov 2026",
        cover: "/images/projects/chem-lab/1.jpg",
        images: gallery("chem-lab", 4),
        title: "Chem Lab",
        summary: "Cook crystals in time to survive each night.",
        description:
          "A 3D Godot game: cook (somewhat) chemically accurate crystals and survive each night by cooking them in time. Built for Hack Club.",
        tags: ["Godot", "GDScript", "3D"],
        link: "https://github.com/emilyahmad/chem-lab",
      },
      {
        id: "t4ohio",
        updated: "2026-11-12",
        date: "Sep 2025 – Nov 2026",
        title: "T4 Ohio",
        summary: "A website for a bubble tea shop.",
        description:
          "A responsive website for the T4 (Tea For U) bubble tea shop in Centerville, Ohio, with a landing page, a philosophy page, a searchable menu and customer reviews. Built on a Supabase (Postgres) backend and deployed on Vercel.",
        tags: ["JavaScript", "Supabase", "Vercel"],
        link: "https://github.com/emilyahmad/T4OHIO",
      },
      {
        id: "gwc-challenge",
        updated: "2026-01-19",
        date: "Dec 2025 – Jan 2026",
        title: "GWC Challenge 2026",
        summary: "A website about AI and cybersecurity.",
        description: "My Girls Who Code Challenge 2026 project, a website about AI and cybersecurity.",
        tags: ["HTML", "CSS"],
        link: "https://github.com/emilyahmad/GWC-Challenge-2026",
      },
      {
        id: "om065",
        updated: "2026-11-18",
        date: "Aug – Nov 2026",
        title: "OM065 Data Science",
        summary: "Coursework for my data science class.",
        description:
          "Assignments, labs, breakouts, quizzes and projects for my OM065 data science course, in Jupyter notebooks.",
        tags: ["Jupyter Notebook", "Data Science"],
        link: "https://github.com/emilyahmad/OM065-Data-Science",
      },
      {
        id: "group5",
        updated: "2026-11-19",
        date: "Sep – Nov 2026",
        title: "Group 5",
        summary: "A modular explainable-AI dashboard.",
        description: "A work-in-progress modular XAI (explainable AI) dashboard.",
        tags: ["Python", "XAI"],
        link: "https://github.com/emilyahmad/group5",
      },
      {
        id: "city-scraper",
        updated: "2026-11-19",
        date: "Oct – Nov 2026",
        title: "City Scraper",
        summary: "Finds local events that fit your week.",
        description:
          "An Expo app that pulls events from Luma, Eventbrite and Ticketmaster's public APIs and recommends them based on your location, interests, weekly availability and how far you're willing to commute. Events show on a map; swipe right to save one, left to archive it. Submitted to the 2026 Congressional App Challenge.",
        tags: ["TypeScript", "Expo", "React Native"],
        link: "https://github.com/emilyahmad/city-scraper",
        video: "https://youtu.be/IEIi_-E4XUI",
      },
    ],
  },
  {
    id: "hackathons",
    title: "Hackathons",
    group: "past",
    gradient: "from-berry-300 to-stone-300 dark:from-berry-800 dark:to-stone-800",
    projects: [
      {
        id: "perfect-planner",
        award: "Winner, Hack Club Sunbeam NYC",
        cover: "/images/projects/perfect-planner/1.jpg",
        images: [
          ...gallery("perfect-planner", 6).slice(0, 1),
          xImage("HQ7_dsnXMAAR0Wa"),
          xImage("HQ7_dsmXgAA6s6G"),
          ...gallery("perfect-planner", 6).slice(1),
        ],
        post: "https://x.com/ti84plusbaby/status/2093892288682348714",
        title: "Perfect Planner",
        summary: "An AI itinerary generator for the perfect day out.",
        description: "An AI-powered generator for perfect day-trip itineraries. Hack Club Sunbeam NYC submission.",
        tags: ["JavaScript", "OpenAI API", "Hack Club"],
        org: "Hack Club Sunbeam NYC",
        date: "August 2026",
        link: "https://github.com/emilyahmad/perfect-planner",
      },
      {
        id: "frog-prince-game",
        cover: "/images/projects/frog-prince-game/1.jpg",
        images: gallery("frog-prince-game", 4),
        title: "Frog Prince",
        summary: "Be a frog and save the princess.",
        description: "A 2D platformer built in Godot: be a frog and save the princess. Hack Club Sleepover submission.",
        org: "Hack Club Sleepover",
        location: "Chicago, IL",
        date: "April 2026",
        tags: ["Godot", "GDScript", "2D"],
        link: "https://github.com/emilyahmad/frog-prince-game",
      },
      {
        id: "ecolog",
        award: "Winner, Code4Nature Hackathon",
        title: "EcoLog",
        summary: "Track and shrink your carbon footprint.",
        description:
          "EcoLog is a web app that lets users log daily activities and uses lightweight AI (keyword-based NLP and heuristics) to estimate their carbon impact and generate personalized sustainability recommendations. It gamifies climate awareness with features like an eco-score, activity streaks, and a virtual environment that improves as users make more eco-friendly choices. Winner of the Code4Nature Hackathon.",
        org: "Code4Nature Hackathon",
        date: "Aug 2024",
        tags: ["Web App"],
        video: "https://www.youtube.com/watch?v=OYSM9BXIEhA&t=26s",
      },
      {
        id: "novas",
        title: "NOVAS",
        summary: "Built for the NASA Space Apps Challenge.",
        description: "A project built for the NASA Space Apps Challenge.",
        org: "NASA Space Apps Challenge",
        date: "November 2025",
        tags: ["NASA Space Apps"],
        video: "https://www.youtube.com/watch?v=2L8eVbk_0T0",
      },
      {
        id: "homeostasis",
        cover: xImage("HJVwei7WMAI0JFV"),
        images: [xImage("HJVwei7WMAI0JFV"), xImage("HJVwejCXgAIkfeM"), xImage("HJVwei9WIAMk6he")],
        post: "https://x.com/ti84plusbaby/status/2059676083071685014",
        award: "Winner, Hack Club Stasis",
        title: "Homeostasis",
        summary: "Keep your spaceship alive with hardware controls.",
        description: [
          "A game where you maintain 'homeostasis' of your spaceship.",
          "Spam a giant button to keep your O2 up.",
          "Breathe hot/cold air to regulate temperature.",
        ],
        org: "Hack Club Stasis",
        location: "Austin, TX",
        date: "May 2026",
        tags: ["Hardware", "Game", "Hack Club"],
      },
      {
        id: "corgi-treat-heist",
        cover: xImage("HUelxetW4AATwIA"),
        images: [xImage("HUelxetW4AATwIA"), xImage("HUelxe-XIAArZuY"), xImage("HUelxfIXIAAPu8u")],
        post: "https://x.com/ti84plusbaby/status/2109837236862689309",
        award: "Winner, Base44 Game Jam",
        title: "Corgi Treat Heist",
        summary: "A corgi-themed red light, green light game.",
        description:
          "Winner of Base44's game jam at Corgi Cafe. The challenge was to bring a game from our childhood or country online, so I built a corgi-themed red light, green light (كهرباء) game entirely on Base44.",
        org: "Base44, NYC",
        date: "Oct 2026",
        tags: ["Base44", "Game Jam"],
        link: "https://corgi-snack-dash.base44.app",
      },
      {
        id: "the-freeze-feds",
        cover: xImage("HX0zcbPXMAAMk3X"),
        images: [xImage("HX0zcbPXMAAMk3X"), xImage("HX0zca2XQAAJr8P")],
        post: "https://x.com/ti84plusbaby/status/2124911232767381937",
        award: "Winner, Hack Club Snowglobe",
        org: "Hack Club Snowglobe",
        location: "San Francisco, CA",
        date: "Nov 2026",
        title: "The Freeze Feds",
        summary: "An SF-themed Find Mii game with snowballs.",
        description: [
          "An SF-themed Find Mii game built with Adishree Das and Haya Raham Asif. Winner of Hack Club Snowglobe.",
          "Click suspicious people walking around to inspect their LinkedIn profiles.",
          "Freeze a tech exec by throwing a snowball at your camera: make a fist and release it.",
          "Hit an exec to gain 10 seconds, hit an innocent and lose 10.",
        ],
        tags: ["JavaScript", "Blender", "Computer Vision"],
        link: "https://github.com/emilyahmad/the-freeze-feds",
        demo: "https://the-freeze-feds.vercel.app",
      },
    ],
  },
];

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Sort key for a card: the end of its date ("Jun 2026", "August 2026", "Present", or a range such as
 * "Apr – Nov 2026"), as a month number. A range's start may leave out the year; only the end is used.
 */
function dateKey(date?: string) {
  if (!date) return 0;
  const end = date.split("–").pop()!.trim();
  if (end === "Present") return Number.MAX_SAFE_INTEGER;
  const [month, year] = end.split(" ");
  return Number(year) * 12 + months.indexOf(month.slice(0, 3).toLowerCase());
}

// Every row lists its cards most recent first: by the month the card ends, then by its last commit.
// Cards with neither keep the order they're written in.
for (const section of sections) {
  section.projects = [...section.projects].sort(
    (a, b) => dateKey(b.date) - dateKey(a.date) || (b.updated ?? "").localeCompare(a.updated ?? ""),
  );
}
