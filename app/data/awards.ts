export type Award = {
  id: string;
  kind: "award" | "certification";
  title: string;
  detail?: string;
  date: string;
  link?: string;
  video?: string;
  /** Photos shown in a modal when the row is clicked; the first is the cover. */
  images?: string[];
};

// Newest first.
export const awards: Award[] = [
  {
    id: "comptia-a-plus",
    kind: "certification",
    title: "CompTIA A+ Certification",
    date: "May 2026",
  },
  {
    id: "ncwit",
    kind: "award",
    title: "NCWIT Aspirations in Computing",
    detail: "Ohio State Winner",
    date: "Jan 2026",
  },
  {
    id: "bpa",
    kind: "award",
    title: "Business Professionals of America (BPA)",
    detail: "Ohio State Qualifier: SQL Database Management and IT Concepts",
    date: "Dec 2025",
  },
  {
    id: "cisco",
    kind: "certification",
    title: "Cisco Certifications",
    detail: "HTML & CSS, C++, Computer Hardware, Operating Systems Basics",
    date: "Nov 2025",
  },
  {
    id: "ap-scholar",
    kind: "award",
    title: "AP Scholar with Distinction",
    date: "Jul 2025",
  },
  {
    id: "science-day",
    kind: "award",
    title: "Ohio Science Day",
    detail: "State Superior Rating and Top Award in Biomedical Sciences",
    date: "Mar 2025",
  },
  {
    id: "cac",
    kind: "award",
    title: "Congressional App Challenge Winner",
    detail: "Ohio's 10th Congressional District, for SwiftSecure",
    date: "Jan 2025",
    link: "https://www.congressionalappchallenge.us/24-oh10/",
    video: "https://www.youtube.com/watch?v=a5pxbB9O51g",
    images: ["/images/houseofcode.jpg", "/images/houseofcode1.jpg"],
  },
  {
    id: "code4nature",
    kind: "award",
    title: "Code4Nature Hackathon Winner",
    date: "Aug 2024",
  },
  {
    id: "pvsa",
    kind: "award",
    title: "President's Volunteer Service Award (Gold)",
    date: "Aug 2024",
  },
];
