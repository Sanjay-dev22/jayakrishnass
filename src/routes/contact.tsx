import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { PROFILE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dr Jayakrishna S S" },
      {
        name: "description",
        content:
          "Open a research collaboration or send a message to Dr Jayakrishna S S.",
      },
      { property: "og:title", content: "Contact — Dr Jayakrishna S S" },
      {
        property: "og:description",
        content: "Open a research collaboration or send a message.",
      },
    ],
  }),
  component: ContactPage,
});

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  collaboration: z.string().max(80).optional(),
  message: z.string().trim().min(10, "Message is too short").max(5000),
});

const COLLAB_OPTIONS = [
  "General enquiry",
  "Research collaboration",
  "PhD / postdoc opportunity",
  "Speaking / talk invitation",
  "Press / media",
  "Other",
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      collaboration: fd.get("collaboration") || undefined,
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("messages").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Message received — I'll be in touch.");
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero
        index="§ Contact"
        kicker="Correspondence"
        title="Open a conversation."
        lede="Whether you want to collaborate, invite a talk, or simply ask about a method — the inbox is open."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Info */}
            <aside className="md:col-span-5">
              <p className="label-meta">Direct</p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-3 block font-serif text-2xl leading-tight text-ink link-underline md:text-3xl"
              >
                {PROFILE.email}
              </a>

              <div className="mt-12">
                <p className="label-meta">Affiliation</p>
                <p className="mt-3 text-base text-ink-soft">
                  {PROFILE.affiliation}.
                </p>
              </div>

              <div className="mt-12 space-y-3">
                <p className="label-meta">Elsewhere</p>
                <a href={PROFILE.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
                  Google Scholar <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href={PROFILE.orcid} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
                  ORCID <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="md:col-span-7">
              {done ? (
                <div className="border border-border bg-card p-10">
                  <p className="label-meta">Sent</p>
                  <h2 className="mt-3 font-serif text-3xl text-ink">Thank you.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Your message is in the inbox. I read everything and reply
                    personally — usually within a few days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDone(false)}
                    className="mt-6 text-sm text-ink link-underline"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <Field label="Name" name="name" autoComplete="name" required />
                  <Field label="Email" name="email" type="email" autoComplete="email" required />

                  <div>
                    <label htmlFor="collaboration" className="label-meta block">
                      Type of collaboration
                    </label>
                    <select
                      id="collaboration"
                      name="collaboration"
                      defaultValue=""
                      className="mt-3 w-full appearance-none border-0 border-b border-border bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
                    >
                      <option value="" disabled>Select…</option>
                      {COLLAB_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="label-meta block">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="mt-3 w-full resize-none border-0 border-b border-border bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink-muted/60 focus:border-ink"
                      placeholder="Tell me about your project, dataset, or idea…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-meta block">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-3 w-full border-0 border-b border-border bg-transparent py-3 text-base text-ink outline-none focus:border-ink"
      />
    </div>
  );
}
