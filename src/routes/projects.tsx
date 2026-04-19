import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dr Jayakrishna S S" },
      {
        name: "description",
        content:
          "Project showcase: nematode detection, harmful algae detection, Rhizopus fungus and more — visual research outputs.",
      },
      { property: "og:title", content: "Projects — Dr Jayakrishna S S" },
      {
        property: "og:description",
        content: "Visual showcase of AI-for-plant-science projects.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [idx, setIdx] = useState(0);
  const total = PROJECTS.length;

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const current = PROJECTS[idx];

  return (
    <>
      <PageHero
        index="§ Projects"
        kicker="Visual showcase"
        title="Work, in pictures."
        lede="A rotating slideshow of project outputs — microscopy, drone imagery and AI overlays. Replace these with your own captures any time."
      />

      {/* Slideshow */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <div className="relative overflow-hidden bg-muted">
                <img
                  key={current.slug}
                  src={current.image}
                  alt={current.title}
                  width={1200}
                  height={900}
                  className="reveal aspect-[4/3] w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex gap-2 bg-paper/90 px-3 py-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIdx((i) => (i - 1 + total) % total)}
                    aria-label="Previous"
                    className="border border-ink bg-paper p-2 text-ink hover:bg-ink hover:text-paper"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdx((i) => (i + 1) % total)}
                    aria-label="Next"
                    className="border border-ink bg-paper p-2 text-ink hover:bg-ink hover:text-paper"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* dots */}
              <div className="mt-6 flex gap-1.5">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    aria-label={`Show ${p.title}`}
                    onClick={() => setIdx(i)}
                    className={`h-1 flex-1 transition-all ${
                      i === idx ? "bg-ink" : "bg-border hover:bg-ink-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <p className="label-meta">{current.domain} · {current.year}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
                {current.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {current.problem}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink"> Approach · </span>
                {current.approach}
              </p>
              {current.doi && (
                <a
                  href={current.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-ink link-underline"
                >
                  Read the paper
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid index */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between border-b border-border pb-6">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">All projects</h2>
            <p className="label-meta">{total} entries</p>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => {
                  setIdx(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group block text-left"
              >
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 label-meta">{p.year} · {p.domain}</p>
                <h3 className="mt-2 font-serif text-xl text-ink">{p.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
