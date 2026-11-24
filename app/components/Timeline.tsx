import {
  dateRange,
  monthIndex,
  type Experience,
  type ExperienceKind,
} from "../data/experience";

type Props = {
  items: Experience[];
  onOpen: (item: Experience) => void;
};

const kindColor: Record<ExperienceKind, string> = {
  industry: "var(--series-1)",
  research: "var(--series-2)",
  education: "var(--series-3)",
};

/** A vertical timeline on mobile; a horizontal Gantt-style chart (one row per role) on desktop. */
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

  return (
    <div className="mt-4">

      {/* Mobile: a vertical timeline, one entry per role down a rail. */}
      <ol className="ml-1 border-l border-stone-200 sm:hidden dark:border-stone-800">
        {spans.map(({ item }) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden
              className="absolute top-4 -left-[6px] h-2.5 w-2.5 rounded-full border border-(--series-edge) ring-4 ring-stone-50 dark:ring-stone-950"
              style={{ background: kindColor[item.kind] }}
            />
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="ml-3 block w-[calc(100%-0.75rem)] rounded-md px-2 py-2.5 text-left transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-berry-500 dark:hover:bg-stone-900"
            >
              <span className="block text-[11px] text-stone-400 tabular-nums">{dateRange(item)}</span>
              <span className="block text-sm font-medium text-stone-800 dark:text-stone-100">
                {item.role}
              </span>
              <span className="block text-xs text-stone-500 dark:text-stone-400">{item.org}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* Desktop: a horizontal Gantt chart. */}
      <div className="relative hidden sm:block">
        <div className="pointer-events-none absolute inset-y-0 right-0 left-64">
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

        <ol>
          {spans.map(({ item, from, to }) => (
            <li key={item.id}>
              {/* The whole row is the click target, so short bars are easy to hit. */}
              <button
                type="button"
                onClick={() => onOpen(item)}
                className="group relative flex w-full flex-row items-center rounded-md py-1.5 text-left transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-berry-500 dark:hover:bg-stone-900"
              >
                <span className="block w-64 min-w-0 shrink-0 pr-4 text-sm">
                  <span className="block truncate font-medium text-stone-800 dark:text-stone-100">
                    {item.role}
                  </span>
                  <span className="block truncate text-xs text-stone-500 dark:text-stone-400">
                    {item.org}
                  </span>
                </span>

                <span className="relative block h-6 flex-1">
                  <span
                    className="absolute inset-y-1 rounded"
                    style={{
                      left: `${pct(from)}%`,
                      width: `max(6px, ${pct(to) - pct(from)}%)`,
                      background: kindColor[item.kind],
                      boxShadow: "inset 0 0 0 1px var(--series-edge)",
                    }}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute bottom-full z-10 mb-2 hidden w-max max-w-64 rounded-md border border-stone-200 bg-cream px-2.5 py-1.5 text-xs shadow-md group-hover:block group-focus-visible:block dark:border-stone-700 dark:bg-stone-900 ${
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

        <div className="relative mt-1 ml-64 h-5 text-[11px] text-stone-400 tabular-nums">
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
