type Props = {
  id: string;
  title: string;
  /** Set to false for a plain, always-open heading. */
  collapsible?: boolean;
  children: React.ReactNode;
};

/** A Notion-style toggle heading: click the heading to collapse or expand the section. */
export function Section({ id, title, collapsible = true, children }: Props) {
  if (!collapsible) {
    return (
      <section id={id} className="mt-12">
        <h2 className="border-b border-stone-200 pb-2 text-xl font-semibold dark:border-stone-800">{title}</h2>
        {children}
      </section>
    );
  }

  return (
    <details id={id} open className="group/section mt-12">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-sm border-b border-stone-200 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-berry-500 dark:border-stone-800 [&::-webkit-details-marker]:hidden">
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="-ml-1 h-4 w-4 shrink-0 text-stone-400 transition-transform group-open/section:rotate-90 group-hover/section:text-stone-600 dark:group-hover/section:text-stone-300"
          fill="currentColor"
        >
          <path d="M6 3.5v9l6-4.5-6-4.5Z" />
        </svg>
        <h2 className="text-xl font-semibold">{title}</h2>
      </summary>
      {children}
    </details>
  );
}
