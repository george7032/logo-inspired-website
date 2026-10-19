import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import leopard from "@/assets/leopard.jpg";
import { SiteLayout, Card } from "@/components/SiteLayout";
import { tours } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kridonelly Safaris — Discover the Wild Heart of Africa" },
      { name: "description", content: "Tailor-made safaris, group departures, day trips and multi-day expeditions across Kenya with Kridonelly Safaris." },
      { property: "og:title", content: "Kridonelly Safaris — Discover the Wild Heart of Africa" },
      { property: "og:description", content: "Tailor-made safaris, group departures and expeditions across Kenya." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <img src={hero} alt="Savanna at sunset with elephants and a safari vehicle" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="relative mx-auto max-w-6xl px-4 text-primary-foreground">
          <p className="font-display tracking-[0.3em] text-accent">Kridonelly Safaris</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">Discover the wild heart of Africa</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Bespoke safaris, unforgettable encounters and seamless travel — crafted around you.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/tours" className="rounded bg-sunset px-6 py-3 font-semibold text-primary-foreground shadow-lg">Explore tours</Link>
            <Link to="/contact" className="rounded border border-primary-foreground/60 px-6 py-3 font-semibold hover:bg-primary-foreground/10">Plan my trip</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Curated tours & packages</p>
        <h2 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl">Journeys for every traveler</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((t) => <Card key={t.title} {...t} />)}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2">
          <img src={leopard} alt="Leopard resting on a rock" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-lg object-cover shadow-xl" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Featured package</p>
            <h2 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl">3-Day Maasai Mara Classic Safari</h2>
            <dl className="mt-8 space-y-6">
              <div><dt className="font-display font-semibold text-primary">What's included</dt><dd className="mt-1 text-muted-foreground">4x4 transport, licensed safari guide, 2 nights lodge accommodation, all meals, and park entrance fees.</dd></div>
              <div><dt className="font-display font-semibold text-primary">Best for</dt><dd className="mt-1 text-muted-foreground">First-time safari-goers, families, and wildlife photography enthusiasts.</dd></div>
              <div><dt className="font-display font-semibold text-primary">Flexibility</dt><dd className="mt-1 text-muted-foreground">Available as a scheduled group departure or a private customized tour.</dd></div>
            </dl>
            <Link to="/contact" className="mt-8 inline-block rounded bg-sunset px-6 py-3 font-semibold text-primary-foreground">Book this safari</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-secondary">More than tours</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Airport transfers, 4x4 vehicle hire, lodge bookings, domestic ticketing and 24/7 on-ground support — we handle every detail.</p>
        <Link to="/services" className="mt-8 inline-block rounded border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">View all services</Link>
      </section>
    </SiteLayout>
  );
}
