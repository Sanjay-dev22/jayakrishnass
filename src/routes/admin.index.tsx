import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, BookText, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const [stats, setStats] = useState({ messages: 0, publications: 0, recentMessages: 0 });

  useEffect(() => {
    (async () => {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const [msgs, pubs, recent] = await Promise.all([
        supabase.from("messages").select("id", { count: "exact", head: true }),
        supabase.from("publications").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id", { count: "exact", head: true }).gte("created_at", since),
      ]);
      setStats({
        messages: msgs.count ?? 0,
        publications: pubs.count ?? 0,
        recentMessages: recent.count ?? 0,
      });
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Overview</p>
        <h1 className="mt-2 font-serif text-4xl text-foreground">Welcome back.</h1>
        <p className="mt-2 text-sm text-muted-foreground">A snapshot of your portfolio backend.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total submissions" value={stats.messages} icon={Mail} hint={`${stats.recentMessages} in last 7 days`} to="/admin/submissions" />
        <StatCard label="Publications" value={stats.publications} icon={BookText} hint="Journals + conferences" to="/admin/publications" />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <QuickAction
          title="Review new submissions"
          body="Read messages from collaborators and prospective students."
          to="/admin/submissions"
        />
        <QuickAction
          title="Manage publications"
          body="Add new papers, mark featured work, edit DOIs."
          to="/admin/publications"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  to,
}: {
  label: string;
  value: number;
  icon: typeof Mail;
  hint: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3 font-serif text-4xl text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </Link>
  );
}

function QuickAction({ title, body, to }: { title: string; body: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30"
    >
      <div>
        <div className="font-serif text-xl text-foreground">{title}</div>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
