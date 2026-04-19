import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { PROFILE, HIGHLIGHTS, DOMAINS, PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr Jayakrishna S S — AI Researcher in Phytopathology" },
      {
        name: "description",
        content:
          "Computer vision and deep-learning research for plant pathology, crop stress, and biodiversity monitoring.",
      },
      { property: "og:title", content: "Dr Jayakrishna S S — AI Researcher" },
      {
        property: "og:description",
        content: "AI for phytopathology, computer vision, and biodiversity monitoring.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-32">
          <div className="md:col-span-7">
            <p className="label-meta reveal">Vol. 01 · Researcher Portfolio</p>
            <h1 className="reveal reveal-delay-1 mt-6 font-serif text-5xl leading-[1.0] text-ink md:text-[5.5rem]">
              An interdisciplinary researcher building AI for the living world.
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              I design computer-vision and deep-learning pipelines that detect
              micro-parasites in plants, predict crop stress in real time, and
              monitor biodiversity from drones and satellites.
            </p>

            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/research"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
              >
                Explore the research
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="text-sm text-ink link-underline"
              >
                Open a collaboration →
              </Link>
            </div>
          </div>

          <div className="reveal reveal-delay-2 md:col-span-5">
            <div className="relative">
              <img
                src={heroPortrait}
                alt="Portrait of Dr Jayakrishna S S"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover grayscale-[0.15]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-paper/20 bg-gradient-to-t from-ink/60 to-transparent p-4 text-paper">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              {PROFILE.affiliation}.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="bg-paper px-6 py-10 md:px-10 md:py-14">
              <p className="font-serif text-5xl text-ink md:text-6xl">{h.value}</p>
              <p className="mt-3 label-meta">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured research */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-end justify-between border-b border-border pb-8">
            <div>
              <p className="label-meta">§ 01 — Featured</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                Selected research.
              </h2>
            </div>
            <Link to="/research" className="hidden text-sm text-ink link-underline md:inline">
              View all →
            </Link>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                to="/research"
                className="group block"
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
                  <span className="absolute left-3 top-3 bg-paper/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                    No. 0{i + 1}
                  </span>
                </div>
                <p className="mt-5 label-meta">{p.domain}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p.problem}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-meta">§ 02 — Domains</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                Where my work lives.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {DOMAINS.map((d, i) => (
                  <li key={d.title} className="grid grid-cols-12 gap-6 py-8">
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
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-10 border border-border bg-card p-10 md:grid-cols-12 md:p-16">
            <div className="md:col-span-8">
              <p className="label-meta">Open to collaboration</p>
              <p className="mt-4 font-serif text-3xl leading-tight text-ink md:text-5xl">
                Working on AI for plants, ecosystems, or microscopy?
                <span className="text-ink-muted"> Let’s talk.</span>
              </p>
            </div>
            <div className="flex items-end md:col-span-4 md:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
