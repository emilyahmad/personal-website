import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import { Cover } from "./Cover";
import { ImageCarousel, slideList } from "./ImageCarousel";
import { Tag } from "./ProjectCard";

type Props = {
  project: Project | null;
  gradient: string;
  onClose: () => void;
};

export function ProjectModal({ project, gradient, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const slides = slideList(project?.cover, project?.images);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Clicking the backdrop targets the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(720px,calc(100vw-2rem))] max-h-[85vh] overflow-y-auto rounded-lg bg-cream p-0 text-stone-800 shadow-2xl backdrop:bg-black/40 dark:bg-stone-900 dark:text-stone-100"
    >
      {project && (
        <article>
          <div className="relative">
            {slides.length > 1 ? (
              <ImageCarousel
                // Remount per project so each modal starts on its cover.
                key={project.id}
                images={slides}
                coverPosition={project.coverPosition}
                size="lg"
                className="h-64 sm:h-80"
              />
            ) : (
              <Cover project={project} gradient={gradient} className="h-56" />
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 rounded-md bg-cream/80 px-2 py-1 text-sm text-stone-600 backdrop-blur hover:bg-cream dark:bg-stone-900/80 dark:text-stone-300"
            >
              ✕
            </button>
          </div>
          <div className="px-6 pb-8 pt-6 sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>

            <dl className="mt-5 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
              {project.award && (
                <Property label="Award">
                  <span className="font-medium text-berry-600 dark:text-berry-400">{project.award}</span>
                </Property>
              )}
              {project.org && <Property label="Organization">{project.org}</Property>}
              {project.date && <Property label="Date">{project.date}</Property>}
              {project.location && <Property label="Location">{project.location}</Property>}
              {project.tags.length > 0 && (
                <Property label="Tags">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </Property>
              )}
              {project.link && (
                <Property label="Link">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-stone-700 underline decoration-berry-300 underline-offset-2 hover:decoration-berry-500 dark:text-stone-200"
                  >
                    {project.link.replace(/^https?:\/\//, "")}
                  </a>
                </Property>
              )}
              {project.post && (
                <Property label="Post">
                  <a
                    href={project.post}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 underline decoration-berry-300 underline-offset-2 hover:decoration-berry-500 dark:text-stone-200"
                  >
                    View on X ↗
                  </a>
                </Property>
              )}
              {project.video && (
                <Property label="Video">
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 underline decoration-berry-300 underline-offset-2 hover:decoration-berry-500 dark:text-stone-200"
                  >
                    Watch on YouTube ↗
                  </a>
                </Property>
              )}
            </dl>

            <hr className="my-6 border-stone-200 dark:border-stone-800" />
            {Array.isArray(project.description) ? (
              <ul className="list-disc space-y-2 pl-5 leading-relaxed text-stone-700 marker:text-stone-400 dark:text-stone-300">
                {project.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed text-stone-700 dark:text-stone-300">
                {project.description}
              </p>
            )}
          </div>
        </article>
      )}
    </dialog>
  );
}

function Property({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-stone-400">{label}</dt>
      <dd>{children}</dd>
    </>
  );
}
