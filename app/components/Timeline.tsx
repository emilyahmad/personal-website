import {
  dateRange,
  kindLabels,
  monthIndex,
  type Experience,
  type ExperienceKind,
} from "../data/experience";

type Props = {
  items: Experience[];
  onOpen: (item: Experience) => void;
};

const kindOrder: ExperienceKind[] = ["industry", "research", "education"];

const kindColor: Record<ExperienceKind, string> = {
  industry: "var(--series-1)",
  research: "var(--series-2)",
  education: "var(--series-3)",
};

/** A horizontal Gantt-style chart: one row per role, bars spanning its months. */
export function Timeline({ items, onOpen }: Props) {
  // Bars run from the first day of the start month to the end of the end month.
  const spans = items.map((item) => ({
    item,
    from: monthIndex(item.start),
    to: monthIndex(item.end) + 1,
  }));
  const min = Math.min(...spans.map((s) => s.from));
  const max = Math.max(...spans.map((s) => s.to));
  const pct = (month: number) => ((month - min) / (max - min)) * 100;

  // Most recent first.
  spans.sort((a, b) => b.from - a.from || b.to - a.to);

  // Quarterly ticks for short spans, yearly ticks for long ones. Each tick is a month index.
  const step = max - min <= 36 ? 3 : 12;
  const ticks: number[] = [];
  for (let m = Math.ceil(min / step) * step; m < max; m += step) ticks.push(m);
  const tickLabel = (m: number) =>
    m % 12 === 0 ? String(m / 12) : ["Jan", "Apr", "Jul", "Oct"][(m % 12) / 3];

  const kinds = kindOrder.filter((k) => items.some((i) => i.kind === k));

  return (
    <div className="mt-4">
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
        {kinds.map((kind) => (
          <li key={kind} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: kindColor[kind] }} />
            {kindLabels[kind]}
          </li>
        ))}
      </ul>

      <div className="relative">
        {/* Gridlines sit behind the bars on desktop. On mobile each bar has its own rail instead. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 left-64 hidden sm:block">
          {ticks.map((m) => (
            <div
              key={m}
              className={`absolute inset-y-0 border-l ${
                m % 12 === 0
                  ? "border-stone-200 dark:border-stone-800"
                  : "border-stone-100 dark:border-stone-900"
              }`}
              style={{ left: `${pct(m)}%` }}
            />
          ))}
        </div>

        <ol className="divide-y divide-stone-100 sm:divide-y-0 dark:divide-stone-900">
          {spans.map(({ item, from, to }) => (
            <li key={item.id}>
              {/* The whole row is the tap target, so short bars are easy to hit on touch screens. */}
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="group relative flex w-full flex-col gap-2 rounded-md px-2 py-3 text-left transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-berry-500 sm:flex-row sm:items-center sm:gap-0 sm:px-0 sm:py-1.5 dark:hover:bg-stone-900"
              >
                <span className="flex min-w-0 items-start justify-between gap-3 sm:block sm:w-64 sm:shrink-0 sm:pr-4">
                  <span className="min-w-0 text-sm">
                    <span className="block truncate font-medium text-stone-800 dark:text-stone-100">
                      {item.role}
                    </span>
                    <span className="block truncate text-xs text-stone-500 dark:text-stone-400">
                      {item.org}
                    </span>
                  </span>
                  <span className="shrink-0 pt-0.5 text-[11px] text-stone-400 tabular-nums sm:hidden">
                    {dateRange(item)}
                  </span>
                </span>

                <span className="relative block h-1.5 w-full rounded-full bg-stone-100 sm:h-6 sm:flex-1 sm:rounded-none sm:bg-transparent dark:bg-stone-800 sm:dark:bg-transparent">
                  <span
                    className="absolute inset-y-0 rounded-full sm:inset-y-1 sm:rounded"
                    style={{
                      left: `${pct(from)}%`,
                      width: `max(6px, ${pct(to) - pct(from)}%)`,
                      background: kindColor[item.kind],
                    }}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute bottom-full z-10 mb-2 hidden w-max max-w-64 rounded-md border border-stone-200 bg-cream px-2.5 py-1.5 text-xs shadow-md sm:group-hover:block sm:group-focus-visible:block dark:border-stone-700 dark:bg-stone-900 ${
                        pct(from) > 60 ? "right-0" : "left-0"
                      }`}
                    >
                      <span className="block font-medium text-stone-800 dark:text-stone-100">
                        {item.role}
                      </span>
                      <span className="block text-stone-500 dark:text-stone-400">{item.org}</span>
                      <span className="block text-stone-400 tabular-nums">{dateRange(item)}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="relative mx-2 mt-1 h-5 text-[11px] text-stone-400 tabular-nums sm:mx-0 sm:ml-64">
          {ticks.map((m) => (
            <span
              key={m}
              className={`absolute -translate-x-1/2 ${m % 12 === 0 ? "font-medium text-stone-500 dark:text-stone-400" : ""}`}
              style={{ left: `${pct(m)}%` }}
            >
              {tickLabel(m)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
