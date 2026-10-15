import type { Project } from "../data/projects";
import { Cover } from "./Cover";
import { ImageCarousel, slideList } from "./ImageCarousel";

type Props = {
  project: Project;
  gradient: string;
  onOpen: () => void;
};

export function ProjectCard({ project, gradient, onOpen }: Props) {
  const slides = slideList(project.cover, project.images);

  return (
    // The whole card opens the modal through a stretched button. A carousel sits above it so it can
    // track hover for its arrows and autoplay pause, and forwards image clicks to onOpen.
    <div className="relative flex w-full flex-col overflow-hidden rounded-md border border-stone-200 bg-cream shadow-[0_1px_2px_rgba(15,15,15,0.06)] transition hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800/70">
      <button
        type="button"
        onClick={onOpen}
        aria-label={project.title}
        className="absolute inset-0 z-[1] rounded-md focus-visible:outline-2 focus-visible:outline-berry-500"
      />
      {project.award && (
        <span
          title={project.award}
          className="pointer-events-none absolute left-2 top-2 z-[3] flex items-center gap-1 rounded-full bg-berry-600 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm"
        >
          <TrophyIcon />
          Winner
        </span>
      )}
      {slides.length > 1 ? (
        <ImageCarousel
          images={slides}
          coverPosition={project.coverPosition}
          seed={project.id}
          onImageClick={onOpen}
          className="z-[2] h-36 cursor-pointer"
        />
      ) : (
        <Cover project={project} gradient={gradient} className="h-36" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-100">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          {project.summary}
        </p>
        {project.date && (
          <p className="text-[11px] text-stone-400">{project.date}</p>
        )}
        {project.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrophyIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
      <path d="M4 1h8v1h2.5v2.5A3 3 0 0 1 11.7 7.5 4 4 0 0 1 9 9.9V12h2v2H5v-2h2V9.9A4 4 0 0 1 4.3 7.5 3 3 0 0 1 1.5 4.5V2H4V1Zm0 2.5H3v1a1.5 1.5 0 0 0 1 1.4V3.5Zm8 0v2.4a1.5 1.5 0 0 0 1-1.4v-1h-1Z" />
    </svg>
  );
}

export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-sm bg-stone-100 px-1.5 py-0.5 text-[11px] text-stone-600 dark:bg-stone-800 dark:text-stone-300">
      {label}
    </span>
  );
}
