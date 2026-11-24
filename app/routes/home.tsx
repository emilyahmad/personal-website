import { useState } from "react";
import { Section } from "../components/Section";
import type { Route } from "./+types/home";
import { sections, type Project, type Section as SectionData } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { AwardList } from "../components/AwardList";
import { awards } from "../data/awards";
import { ProjectModal } from "../components/ProjectModal";
import { Timeline } from "../components/Timeline";
import { BrandIcon, type IconName } from "../components/BrandIcon";
import { experience, toProject } from "../data/experience";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Emily Ahmad" },
    { name: "description", content: "Emily Ahmad's portfolio: experience, hardware, games and software projects, and awards." },
  ];
}

const links: { label: string; icon: IconName; href: string }[] = [
  { label: "GitHub", icon: "github", href: "https://github.com/emilyahmad" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/emily-ahmad/" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCFPcshMk6aWtb58VLcOpfTw" },
  { label: "itch.io", icon: "itchio", href: "https://emilyahmad.itch.io" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/emoolies/" },
  { label: "X", icon: "x", href: "https://x.com/ti84plusbaby" },
];

/** A project card by id, with the gradient of the row it sits in. */
function findCard(id: string) {
  for (const section of sections) {
    const project = section.projects.find((p) => p.id === id);
    if (project) return { project, gradient: section.gradient };
  }
  throw new Error(`Unknown project: ${id}`);
}

// Awards won with a project show that card's photos and open the card itself.
const awardRows = awards.map((award) =>
  award.project && !award.images ? { ...award, images: findCard(award.project).project.images } : award,
);

export default function Home() {
  const [open, setOpen] = useState<{ project: Project; gradient: string } | null>(null);
  const openProject = (project: Project, gradient: string) => setOpen({ project, gradient });

  return (
    <main className="min-h-screen bg-stone-50 pb-24 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
      <div className="h-[30vh] min-h-48 w-full bg-gradient-to-r from-berry-300 via-stone-100 to-stone-400 dark:from-berry-900 dark:via-stone-800 dark:to-stone-700" />

      <div className="mx-auto max-w-5xl px-4 sm:px-12">
        <div className="relative -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-stone-50 bg-stone-200 shadow-sm sm:-mt-20 sm:h-40 sm:w-40 dark:border-stone-950 dark:bg-stone-800">
          <img
            src="/images/pfp.png"
            alt="Emily Ahmad"
            className="h-full w-full scale-110 rounded-full object-cover object-[72%_center]"
          />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Emily Ahmad</h1>
        <p className="mt-3 text-stone-500 dark:text-stone-400">
          17-year-old builder · NYC</p>
        <nav className="mt-3 -ml-2 flex flex-wrap gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="rounded-md p-2 text-stone-500 transition hover:bg-berry-100 hover:text-berry-600 focus-visible:outline-2 focus-visible:outline-berry-500 dark:text-stone-400 dark:hover:bg-berry-900 dark:hover:text-berry-300"
            >
              <BrandIcon name={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </nav>

        <Section id="experience" title="Experience" collapsible={false}>
          <Timeline
            items={experience}
            onOpen={(item) =>
              setOpen({
                project: toProject(item),
                gradient: sections[0].gradient,
              })
            }
          />
        </Section>

        <Section id="past" title="Past Projects">
          {sections
            .filter((section) => section.group === "past")
            .map((section) => (
              <div key={section.id} id={section.id} className="mt-6">
                <h3 className="text-base font-semibold text-stone-700 dark:text-stone-200">{section.title}</h3>
                <CardRow section={section} onOpen={openProject} />
              </div>
            ))}
        </Section>

        {sections
          .filter((section) => !section.group)
          .map((section) => (
            <Section key={section.id} id={section.id} title={section.title}>
              <CardRow section={section} onOpen={openProject} />
            </Section>
          ))}

        <Section id="awards" title="Awards & Certifications">
          <AwardList
            items={awardRows}
            onOpen={(award) => {
              if (award.project) return setOpen(findCard(award.project));
              setOpen({
                project: {
                  id: award.id,
                  title: award.title,
                  summary: award.detail ?? "",
                  description: award.detail ?? "",
                  date: award.date,
                  tags: [],
                  link: award.link,
                  video: award.video,
                  cover: award.images?.[0],
                  images: award.images,
                },
                gradient: "",
              });
            }}
          />
        </Section>

      </div>

      <ProjectModal
        project={open?.project ?? null}
        gradient={open?.gradient ?? ""}
        onClose={() => setOpen(null)}
      />
    </main>
  );
}

/** A horizontally scrolling row of project cards. */
function CardRow({
  section,
  onOpen,
}: {
  section: SectionData;
  onOpen: (project: Project, gradient: string) => void;
}) {
  if (section.projects.length === 0) {
    return (
      <p className="mt-4 rounded-md border border-dashed border-stone-200 px-4 py-8 text-center text-sm text-stone-400 dark:border-stone-800">
        Nothing here yet.
      </p>
    );
  }
  return (
    <div className="scroll-row -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:scroll-px-0 sm:px-0">
      {section.projects.map((project) => (
        <div key={project.id} className="flex w-64 shrink-0 snap-start">
          <ProjectCard
            project={project}
            gradient={section.gradient}
            onOpen={() => onOpen(project, section.gradient)}
          />
        </div>
      ))}
    </div>
  );
}
