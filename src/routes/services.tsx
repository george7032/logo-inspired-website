import { createFileRoute } from "@tanstack/react-router";
import leopard from "@/assets/leopard.jpg";
import { SiteLayout, PageHero, Card } from "@/components/SiteLayout";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Travel Services — Kridonelly Safaris" },
      { name: "description", content: "Airport transfers, 4x4 safari vehicle hire, ticketing, lodge reservations and 24/7 ground support." },
      { property: "og:title", content: "Travel Services — Kridonelly Safaris" },
      { property: "og:description", content: "Transport, accommodation and round-the-clock support for your trip." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <SiteLayout>
      <PageHero title="Our Services" sub="Everything you need for a smooth journey, handled by one trusted team." img={leopard} />
      {services.map((g, i) => (
        <section key={g.group} className={i % 2 ? "bg-muted" : ""}>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-3xl font-bold text-secondary">{g.group}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{g.items.map((t) => <Card key={t.title} {...t} />)}</div>
          </div>
        </section>
      ))}
    </SiteLayout>
  );
}
