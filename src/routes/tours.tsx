import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { SiteLayout, PageHero, Card } from "@/components/SiteLayout";
import { tours, niche } from "@/lib/site-data";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Tours & Packages — Kridonelly Safaris" },
      { name: "description", content: "Bespoke itineraries, group departures, day trips, safaris, adventure, cultural, romantic and corporate travel." },
      { property: "og:title", content: "Tours & Packages — Kridonelly Safaris" },
      { property: "og:description", content: "Curated tours and specialized travel across Africa." },
    ],
  }),
  component: Tours,
});

function Tours() {
  return (
    <SiteLayout>
      <PageHero title="Tours & Packages" sub="From a half-day excursion to a two-week expedition, every journey is shaped around you." img={hero} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-secondary">Curated tours</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">{tours.map((t) => <Card key={t.title} {...t} />)}</div>
      </section>
      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-secondary">Specialized & niche travel</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">{niche.map((t) => <Card key={t.title} {...t} />)}</div>
        </div>
      </section>
    </SiteLayout>
  );
}
