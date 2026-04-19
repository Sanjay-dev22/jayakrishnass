import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Dr Jayakrishna S S" },
      {
        name: "description",
        content:
          "Featured research projects in AI-driven phytopathology, computer vision, postharvest biology and sustainable agriculture.",
      },
      { property: "og:title", content: "Research — Dr Jayakrishna S S" },
      {
        property: "og:description",
        content:
          "Featured AI research in phytopathology, computer vision and biodiversity.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <PageHero
        index="§ Research"
        kicker="Selected work · 2021 — 2026"
        title="Research portfolio."
        lede="Each project pairs a real-world plant-science problem with a deep-learning method, evaluated on field or microscopy data."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="space-y-24">
            {PROJECTS.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={p.slug}
                  className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
                >
                  <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                    <div className="relative overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.title}
                        width={1200}
                        height={900}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <span className="absolute left-4 top-4 bg-paper/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                        Project · {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <p className="label-meta">{p.domain} · {p.year}</p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
                      {p.title}
                    </h2>
                    <dl className="mt-6 space-y-5 border-l border-border pl-5">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Problem</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Approach</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{p.approach}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Result</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{p.result}</dd>
                      </div>
                    </dl>

                    {p.doi && (
                      <a
                        href={p.doi}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-6 inline-flex items-center gap-2 text-sm text-ink link-underline"
                      >
                        Read the paper
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
