import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { usePublications } from "@/lib/use-publications";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Dr Jayakrishna S S" },
      {
        name: "description",
        content:
          "Peer-reviewed journal articles and conference papers in AI for phytopathology, computer vision and sustainable agriculture.",
      },
      { property: "og:title", content: "Publications — Dr Jayakrishna S S" },
      {
        property: "og:description",
        content: "Peer-reviewed journal and conference papers.",
      },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const { journals, conferences, loading } = usePublications();

  return (
    <>
      <PageHero
        index="§ Publications"
        kicker="Journals · Conferences"
        title="Peer-reviewed work."
        lede="A complete index of journal articles and conference papers, ordered by venue."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="label-meta">Part I</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Journals</h2>
              <p className="mt-3 text-sm text-ink-muted">
                Indexed Elsevier and Taylor &amp; Francis journals.
              </p>
            </div>

            <ol className="md:col-span-9 divide-y divide-border border-y border-border">
              {loading && journals.length === 0 ? (
                <li className="py-8 text-sm text-ink-muted">Loading…</li>
              ) : (
                journals.map((j, i) => (
                  <li key={j.id} className="grid grid-cols-12 gap-4 py-8 md:gap-8">
                    <span className="col-span-2 font-mono text-xs text-ink-muted md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-10 md:col-span-8">
                      <h3 className="font-serif text-xl leading-snug text-ink md:text-2xl">
                        {j.title}
                      </h3>
                      <p className="mt-2 text-sm italic text-ink-soft">
                        {j.venue}
                        <span className="not-italic text-ink-muted">
                          {j.citation ? ` · ${j.citation}` : ""} · {j.year}
                        </span>
                      </p>
                    </div>
                    <div className="col-span-12 flex items-start justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-start md:text-right">
                      {j.impact && <span className="font-mono text-xs text-ink">IF {j.impact}</span>}
                      {j.doi && (
                        <a
                          href={j.doi}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-xs text-ink link-underline"
                        >
                          DOI <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="label-meta">Part II</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Conferences</h2>
              <p className="mt-3 text-sm text-ink-muted">IEEE Xplore.</p>
            </div>
            <ol className="md:col-span-9 divide-y divide-border border-y border-border">
              {conferences.map((c, i) => (
                <li key={c.id} className="grid grid-cols-12 gap-4 py-8 md:gap-8">
                  <span className="col-span-2 font-mono text-xs text-ink-muted md:col-span-1">
                    C{String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 md:col-span-8">
                    <h3 className="font-serif text-xl leading-snug text-ink md:text-2xl">{c.title}</h3>
                    <p className="mt-2 text-sm italic text-ink-soft">
                      {c.venue}
                      <span className="not-italic text-ink-muted"> · {c.year}</span>
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:text-right">
                    {c.doi && (
                      <a
                        href={c.doi}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-ink link-underline"
                      >
                        Paper <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
