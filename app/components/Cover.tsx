import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  gradient: string;
  className?: string;
};

/** A project's cover image, or a plain gradient when there is no image (or it fails to load). */
export function Cover({ project, gradient, className = "" }: Props) {
  const [failed, setFailed] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // A server-rendered image can fail before React attaches onError, so check once on mount too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(project.cover ?? null);
  }, [project.cover]);

  if (project.cover && failed !== project.cover) {
    return (
      <img
        ref={imgRef}
        src={project.cover}
        alt=""
        onError={() => setFailed(project.cover!)}
        style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
        className={`w-full object-cover ${className}`}
      />
    );
  }
  return <div className={`w-full bg-gradient-to-br ${gradient} ${className}`} />;
}
