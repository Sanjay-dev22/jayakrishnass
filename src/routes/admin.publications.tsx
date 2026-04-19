import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Star, Pencil, Trash2, ExternalLink } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export const Route = createFileRoute("/admin/publications")({
  component: PublicationsAdmin,
});

type Pub = {
  id: string;
  kind: "journal" | "conference";
  title: string;
  venue: string;
  citation: string | null;
  impact: string | null;
  doi: string | null;
  year: string;
  featured: boolean;
  sort_order: number;
};

const pubSchema = z.object({
  kind: z.enum(["journal", "conference"]),
  title: z.string().trim().min(1, "Required").max(500),
  venue: z.string().trim().min(1, "Required").max(300),
  citation: z.string().trim().max(200).optional().or(z.literal("")),
  impact: z.string().trim().max(20).optional().or(z.literal("")),
  doi: z.string().trim().max(500).optional().or(z.literal("")),
  year: z.string().trim().regex(/^\d{4}$/, "Use a 4-digit year"),
  featured: z.boolean(),
});

type FormData = z.infer<typeof pubSchema>;

const empty: FormData = {
  kind: "journal",
  title: "",
  venue: "",
  citation: "",
  impact: "",
  doi: "",
  year: String(new Date().getFullYear()),
  featured: false,
};

function PublicationsAdmin() {
  const [pubs, setPubs] = useState<Pub[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"journal" | "conference">("journal");
  const [editing, setEditing] = useState<Pub | null>(null);
  const [creating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Pub | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false })
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    setPubs((data as Pub[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => pubs.filter((p) => p.kind === tab), [pubs, tab]);

  const toggleFeatured = async (p: Pub) => {
    const { error } = await supabase.from("publications").update({ featured: !p.featured }).eq("id", p.id);
    if (error) return toast.error(error.message);
    setPubs((prev) => prev.map((x) => (x.id === p.id ? { ...x, featured: !p.featured } : x)));
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    const { error } = await supabase.from("publications").delete().eq("id", pendingDelete.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Publication removed");
      setPubs((prev) => prev.filter((p) => p.id !== pendingDelete.id));
    }
    setPendingDelete(null);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Library</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground">Publications</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {pubs.filter((p) => p.kind === "journal").length} journals ·{" "}
            {pubs.filter((p) => p.kind === "conference").length} conferences
          </p>
        </div>
        <Button onClick={() => setCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add publication
        </Button>
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "journal" | "conference")}>
        <TabsList>
          <TabsTrigger value="journal">Journals</TabsTrigger>
          <TabsTrigger value="conference">Conferences</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {loading ? (
              <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                No {tab === "journal" ? "journal articles" : "conference papers"} yet. Click “Add publication” above.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((p) => (
                  <li key={p.id} className="grid grid-cols-12 gap-4 px-5 py-4">
                    <div className="col-span-12 md:col-span-8">
                      <div className="flex items-start gap-2">
                        {p.featured && <Star className="mt-1 h-3.5 w-3.5 flex-shrink-0 fill-foreground text-foreground" />}
                        <div className="min-w-0">
                          <div className="font-serif text-base leading-snug text-foreground md:text-lg">{p.title}</div>
                          <div className="mt-1 text-xs italic text-muted-foreground">
                            {p.venue}
                            {p.citation && <span className="not-italic"> · {p.citation}</span>}
                            <span className="not-italic"> · {p.year}</span>
                            {p.impact && <span className="not-italic"> · IF {p.impact}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 flex items-center justify-end gap-1 md:col-span-4">
                      <Button variant="ghost" size="icon" onClick={() => toggleFeatured(p)} aria-label="Toggle featured">
                        <Star className={`h-4 w-4 ${p.featured ? "fill-foreground" : ""}`} />
                      </Button>
                      {p.doi && (
                        <Button variant="ghost" size="icon" asChild aria-label="Open DOI">
                          <a href={p.doi} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setEditing(p)} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPendingDelete(p)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <PublicationDialog
        open={creating || !!editing}
        initial={editing ?? { ...empty, kind: tab }}
        mode={editing ? "edit" : "create"}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        onSaved={() => {
          setCreating(false);
          setEditing(null);
          load();
        }}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this publication?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingDelete?.title}” will be removed permanently and disappear from the public site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function PublicationDialog({
  open,
  initial,
  mode,
  onClose,
  onSaved,
}: {
  open: boolean;
  initial: Pub | FormData;
  mode: "create" | "edit";
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setErrors({});
      setForm({
        kind: initial.kind,
        title: initial.title ?? "",
        venue: initial.venue ?? "",
        citation: initial.citation ?? "",
        impact: initial.impact ?? "",
        doi: initial.doi ?? "",
        year: initial.year ?? String(new Date().getFullYear()),
        featured: initial.featured ?? false,
      });
    }
  }, [open, initial]);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSave = async () => {
    const parsed = pubSchema.safeParse(form);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      for (const issue of parsed.error.issues) e[issue.path.join(".")] = issue.message;
      setErrors(e);
      return;
    }
    setErrors({});
    setSaving(true);
    const payload = {
      ...parsed.data,
      citation: parsed.data.citation || null,
      impact: parsed.data.impact || null,
      doi: parsed.data.doi || null,
    };
    const { error } =
      mode === "edit" && "id" in initial
        ? await supabase.from("publications").update(payload).eq("id", (initial as Pub).id)
        : await supabase.from("publications").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "edit" ? "Publication updated" : "Publication added");
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {mode === "edit" ? "Edit publication" : "Add publication"}
          </DialogTitle>
          <DialogDescription>Visible on the public Publications page.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Type</Label>
              <div className="flex rounded-md border border-input">
                {(["journal", "conference"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => update("kind", k)}
                    className={`flex-1 px-3 py-1.5 text-xs capitalize transition-colors ${
                      form.kind === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="year" className="text-xs uppercase tracking-wider text-muted-foreground">Year</Label>
              <Input id="year" value={form.year} onChange={(e) => update("year", e.target.value)} maxLength={4} />
              {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
            </div>
          </div>

          <Field label="Title" error={errors.title}>
            <Textarea value={form.title} onChange={(e) => update("title", e.target.value)} rows={3} />
          </Field>
          <Field label="Venue" error={errors.venue}>
            <Input value={form.venue} onChange={(e) => update("venue", e.target.value)} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Citation (optional)" error={errors.citation}>
              <Input value={form.citation} onChange={(e) => update("citation", e.target.value)} placeholder="234, 110277" />
            </Field>
            <Field label="Impact factor (optional)" error={errors.impact}>
              <Input value={form.impact} onChange={(e) => update("impact", e.target.value)} placeholder="8.9" />
            </Field>
          </div>

          <Field label="DOI / URL (optional)" error={errors.doi}>
            <Input value={form.doi} onChange={(e) => update("doi", e.target.value)} placeholder="https://doi.org/…" />
          </Field>

          <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2">
            <div>
              <Label className="text-sm">Featured</Label>
              <p className="text-xs text-muted-foreground">Highlight this publication on the site.</p>
            </div>
            <Switch checked={form.featured} onCheckedChange={(v) => update("featured", v)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : mode === "edit" ? "Save changes" : "Add publication"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
