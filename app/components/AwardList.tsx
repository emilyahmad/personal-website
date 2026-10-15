import type { Award } from "../data/awards";

const kindLabels: Record<Award["kind"], string> = {
  award: "Award",
  certification: "Certification",
};

type Props = {
  items: Award[];
  /** Called for awards that have photos; the row opens them in the modal. */
  onOpen: (item: Award) => void;
};

/** A vertical timeline of awards: filled dots for awards, hollow dots for certifications. */
export function AwardList({ items, onOpen }: Props) {
  return (
    <ol className="relative mt-4 border-l border-stone-200 dark:border-stone-800">
      {items.map((item) => {
        const body = (
          <>
            <span className="shrink-0 text-xs text-stone-400 tabular-nums sm:w-24 sm:pt-0.5">
              {item.date}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-sm font-medium text-stone-800 dark:text-stone-100">
                  {item.title}
                  {item.link && !item.images && <span className="ml-1 text-stone-400">↗</span>}
                </span>
                <span className="text-[11px] text-stone-400">{kindLabels[item.kind]}</span>
              </span>
              {item.detail && (
                <span className="block text-xs text-stone-500 dark:text-stone-400">
                  {item.detail}
                </span>
              )}
            </span>
            {item.images && (
              <img
                src={item.images[0]}
                alt=""
                className="mt-1 h-12 w-16 shrink-0 rounded border border-stone-200 object-cover sm:mt-0 dark:border-stone-800"
              />
            )}
          </>
        );
        const rowClass =
          "flex w-full flex-col gap-0.5 rounded-md px-2 py-2.5 text-left sm:flex-row sm:gap-4";
        const interactive =
          "transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-berry-500 dark:hover:bg-stone-900";

        return (
          <li key={item.id} className="relative pl-5">
            <span
              className={`absolute -left-[5px] top-[0.8rem] h-2.5 w-2.5 rounded-full ring-4 ring-stone-50 dark:ring-stone-950 ${
                item.kind === "award"
                  ? "bg-stone-700 dark:bg-stone-300"
                  : "border-2 border-stone-400 bg-stone-50 dark:border-stone-500 dark:bg-stone-950"
              }`}
            />
            {item.images ? (
              <button type="button" onClick={() => onOpen(item)} className={`${rowClass} ${interactive}`}>
                {body}
              </button>
            ) : item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rowClass} ${interactive}`}
              >
                {body}
              </a>
            ) : (
              <div className={rowClass}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
