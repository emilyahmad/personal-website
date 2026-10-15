import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { ContactResult } from "../lib/contact.server";

const field =
  "w-full rounded-md border border-stone-200 bg-cream px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-berry-400 focus:outline-none focus:ring-2 focus:ring-berry-200 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-berry-500 dark:focus:ring-berry-900";

export function ContactForm() {
  const fetcher = useFetcher<ContactResult>();
  const formRef = useRef<HTMLFormElement>(null);
  // Set after hydration, so the server can tell how long the form took to fill in.
  const [startedAt, setStartedAt] = useState("");
  const [length, setLength] = useState(0);

  useEffect(() => setStartedAt(String(Date.now())), []);

  const result = fetcher.data;
  const sending = fetcher.state !== "idle";
  const errors = result && !result.ok ? result.fieldErrors ?? {} : {};

  useEffect(() => {
    if (result?.ok) {
      formRef.current?.reset();
      setLength(0);
      setStartedAt(String(Date.now()));
    }
  }, [result]);

  return (
    <fetcher.Form ref={formRef} method="post" action="?index" className="mt-4 grid max-w-xl gap-4" noValidate>
      {/* Honeypot: hidden from people, but bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          onChange={(e) => setLength(e.target.value.length)}
          className={`${field} resize-y`}
        />
        <span className="mt-1 block text-right text-[11px] text-stone-400 tabular-nums">{length} / 5000</span>
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={sending || !startedAt}
          className="rounded-md bg-berry-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-berry-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry-500 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {result?.ok && <span className="text-stone-600 dark:text-stone-300">Thanks! Your message was sent.</span>}
          {result && !result.ok && <span className="text-berry-700 dark:text-berry-400">{result.error}</span>}
        </p>
      </div>
    </fetcher.Form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-stone-500 dark:text-stone-400">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-berry-700 dark:text-berry-400">{error}</span>}
    </label>
  );
}
