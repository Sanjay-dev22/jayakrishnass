import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { TIMELINE, SKILLS, DOMAINS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dr Jayakrishna S S" },
      {
        name: "description",
        content:
          "Academic journey, expertise and research interests of Dr Jayakrishna S S — AI researcher in phytopathology and computer vision.",
      },
      { property: "og:title", content: "About — Dr Jayakrishna S S" },
      {
        property: "og:description",
        content: "Academic journey, expertise and research interests.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        index="§ About"
        kicker="Biography"
        title="An interdisciplinary researcher between code and chlorophyll."
        lede="I am a computer-vision and deep-tech designer specialising in plant pathology — building real-time AI for microbiology labs, drones and the field."
      />

      {/* Timeline */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-meta">§ 01 — Academic journey</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                A timeline.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-ink-muted">
                From electrical engineering, into embedded systems, then deep
                learning for the living world.
              </p>
            </div>

            <ol className="md:col-span-8 relative border-l border-border pl-8">
              {TIMELINE.map((t) => (
                <li key={t.role + t.place} className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-sage ring-4 ring-paper" />
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {t.period}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                    {t.role}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{t.place}</p>
                  <p className="mt-1 text-sm italic text-ink-muted">{t.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-meta">§ 02 — Research interests</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                What I work on.
              </h2>
            </div>
            <ul className="md:col-span-8 divide-y divide-border border-y border-border">
              {DOMAINS.map((d, i) => (
                <li key={d.title} className="grid grid-cols-12 gap-6 py-7">
                  <span className="col-span-2 font-mono text-xs text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10">
                    <h3 className="font-serif text-2xl text-ink">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-meta">§ 03 — Expertise</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                Methods & tooling.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="border border-border bg-card px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
