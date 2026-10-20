import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero, PackageCard, CTABanner } from "@/components/SiteLayout";
import { packages, img, IMG } from "@/lib/packages";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Safaris & Tours in Kenya — Kridonelly Safaris" },
      { name: "description", content: "Browse bespoke safaris, group departures, day trips and multi-day expeditions across Kenya. Filter by destination, duration and budget." },
      { property: "og:title", content: "Safaris & Tours — Kridonelly Safaris" },
      { property: "og:description", content: "Bespoke safaris, group departures, day trips and multi-day expeditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tours,
});

const uniq = (k: "type" | "destination" | "style") => ["All", ...new Set(packages.map((p) => p[k]))];

function Tours() {
  const [type, setType] = useState("All");
  const [dest, setDest] = useState("All");
  const [style, setStyle] = useState("All");
  const [dur, setDur] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("Popular");

  const list = useMemo(() => {
    const r = packages.filter((p) =>
      (type === "All" || p.type === type) && (dest === "All" || p.destination === dest) && (style === "All" || p.style === style) &&
      (dur === "All" || (dur === "1 day" ? p.days === 1 : dur === "2-3 days" ? p.days >= 2 && p.days <= 3 : p.days >= 4)) &&
      (budget === "All" || (budget === "Under $500" ? p.priceFrom < 500 : budget === "$500-$1,000" ? p.priceFrom >= 500 && p.priceFrom <= 1000 : p.priceFrom > 1000)));
    if (sort === "Price low-high") r.sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sort === "Duration") r.sort((a, b) => a.days - b.days);
    else r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [type, dest, style, dur, budget, sort]);

  const sel = (label: string, value: string, set: (v: string) => void, opts: string[]) => (
    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}
      <select value={value} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm normal-case text-foreground">
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <SiteLayout>
      <PageHero title="Safaris & Tours" sub="From a single day with giraffes to a week across Kenya's greatest parks — find your journey or let us build one." img={img(IMG.lion, 1800)} />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
          {sel("Tour type", type, setType, uniq("type"))}
          {sel("Destination", dest, setDest, uniq("destination"))}
          {sel("Duration", dur, setDur, ["All", "1 day", "2-3 days", "4+ days"])}
          {sel("Budget", budget, setBudget, ["All", "Under $500", "$500-$1,000", "Over $1,000"])}
          {sel("Travel style", style, setStyle, uniq("style"))}
          {sel("Sort by", sort, setSort, ["Popular", "Price low-high", "Duration"])}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} trips found</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        {list.length === 0 && <p className="py-12 text-center text-muted-foreground">No trips match those filters — we can build one for you.</p>}
      </section>
      <CTABanner title="Can't find what you want? We build trips from scratch." />
    </SiteLayout>
  );
}
