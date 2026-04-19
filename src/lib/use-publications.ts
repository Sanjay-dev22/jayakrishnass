import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { JOURNALS, CONFERENCES } from "@/lib/site-data";

export type PublicationItem = {
  id: string;
  kind: "journal" | "conference";
  title: string;
  venue: string;
  citation: string | null;
  impact: string | null;
  doi: string | null;
  year: string;
  featured: boolean;
};

/**
 * Hybrid loader: prefer DB rows; fall back to hard-coded site-data when DB is empty.
 */
export function usePublications() {
  const [journals, setJournals] = useState<PublicationItem[]>([]);
  const [conferences, setConferences] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("year", { ascending: false })
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        setJournals(
          JOURNALS.map((j, i) => ({
            id: `seed-j-${i}`,
            kind: "journal",
            title: j.title,
            venue: j.venue,
            citation: j.citation,
            impact: j.impact,
            doi: j.doi,
            year: j.year,
            featured: false,
          }))
        );
        setConferences(
          CONFERENCES.map((c, i) => ({
            id: `seed-c-${i}`,
            kind: "conference",
            title: c.title,
            venue: c.venue,
            citation: null,
            impact: null,
            doi: c.doi,
            year: c.year,
            featured: false,
          }))
        );
      } else {
        const rows = data as PublicationItem[];
        setJournals(rows.filter((r) => r.kind === "journal"));
        setConferences(rows.filter((r) => r.kind === "conference"));
      }
      setLoading(false);
    })();
  }, []);

  return { journals, conferences, loading };
}
