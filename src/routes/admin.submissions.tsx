import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/submissions")({
  component: SubmissionsPage,
});

type Message = {
  id: string;
  name: string;
  email: string;
  collaboration: string | null;
  message: string;
  created_at: string;
};

const READ_KEY = "admin-read-messages";

function loadRead(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(READ_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function persistRead(set: Set<string>) {
  localStorage.setItem(READ_KEY, JSON.stringify([...set]));
}

function SubmissionsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Message | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Message | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(() => loadRead());

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setMessages((data as Message[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q) ||
        (m.collaboration ?? "").toLowerCase().includes(q)
    );
  }, [messages, query]);

  const unreadCount = messages.filter((m) => !readIds.has(m.id)).length;

  const openMessage = (m: Message) => {
    setActive(m);
    if (!readIds.has(m.id)) {
      const next = new Set(readIds);
      next.add(m.id);
      setReadIds(next);
      persistRead(next);
    }
  };

  const toggleRead = (m: Message) => {
    const next = new Set(readIds);
    if (next.has(m.id)) next.delete(m.id);
    else next.add(m.id);
    setReadIds(next);
    persistRead(next);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { error } = await supabase.from("messages").delete().eq("id", pendingDelete.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((m) => m.id !== pendingDelete.id));
      if (active?.id === pendingDelete.id) setActive(null);
    }
    setPendingDelete(null);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Inbox</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl text-foreground">Submissions</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {messages.length} total · {unreadCount} unread
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, message…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/40 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:grid">
          <div className="col-span-3">From</div>
          <div className="col-span-2">Topic</div>
          <div className="col-span-5">Message</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Mail className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              {messages.length === 0 ? "No submissions yet." : "No matches for your search."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((m) => {
              const unread = !readIds.has(m.id);
              return (
                <li key={m.id}>
                  <button
                    onClick={() => openMessage(m)}
                    className="grid w-full grid-cols-1 items-start gap-2 px-5 py-4 text-left transition-colors hover:bg-accent/50 md:grid-cols-12 md:gap-4 md:py-3"
                  >
                    <div className="col-span-3 flex items-center gap-2">
                      {unread && <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-label="unread" />}
                      <div className="min-w-0">
                        <div className={`truncate text-sm ${unread ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                          {m.name}
                        </div>
                        <div className="truncate font-mono text-[11px] text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-xs text-muted-foreground">
                      {m.collaboration ?? "—"}
                    </div>
                    <div className="col-span-5 truncate text-sm text-muted-foreground">{m.message}</div>
                    <div className="col-span-1 font-mono text-[11px] text-muted-foreground">
                      {new Date(m.created_at).toLocaleDateString()}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingDelete(m);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setPendingDelete(m);
                          }
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="flex w-full flex-col gap-0 sm:max-w-lg">
          <SheetHeader className="border-b border-border pb-4">
            <button
              onClick={() => setActive(null)}
              className="mb-3 flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>
            <SheetTitle className="font-serif text-2xl">{active?.name}</SheetTitle>
            <SheetDescription className="font-mono text-xs">{active?.email}</SheetDescription>
          </SheetHeader>
          {active && (
            <div className="flex-1 overflow-y-auto py-5">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Topic</dt>
                  <dd className="mt-1 text-foreground">{active.collaboration ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Received</dt>
                  <dd className="mt-1 text-foreground">{new Date(active.created_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</dt>
                  <dd className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-4 leading-relaxed text-foreground">
                    {active.message}
                  </dd>
                </div>
              </dl>
            </div>
          )}
          {active && (
            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
              <Button asChild variant="default" size="sm">
                <a href={`mailto:${active.email}?subject=Re:%20${encodeURIComponent(active.collaboration ?? "Your message")}`}>
                  Reply by email
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleRead(active)}>
                Mark as {readIds.has(active.id) ? "unread" : "read"}
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setPendingDelete(active)}>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the message from {pendingDelete?.name}. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
