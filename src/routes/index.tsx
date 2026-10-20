import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Compass, Sparkles, Car, BedDouble, Headphones, ShieldCheck, Award, Route as RouteIcon, Building } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SiteLayout, SectionHeading, PackageCard, CTABanner, TestimonialCard } from "@/components/SiteLayout";
import { packages, testimonials, img, IMG } from "@/lib/packages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kridonelly Safaris — Tailor-made Safaris in Kenya & East Africa" },
      { name: "description", content: "Tailor-made safaris, group departures, transport and lodge booking across Kenya and East Africa with Nairobi-based Kridonelly Safaris." },
      { property: "og:title", content: "Kridonelly Safaris — Your Journey Into the Wild" },
      { property: "og:description", content: "Tailor-made safaris, group departures and seamless travel across Kenya & East Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const offers = [
  { icon: Compass, title: "Curated Tours & Packages", to: "/tours" },
  { icon: Sparkles, title: "Specialized Travel", to: "/experiences" },
  { icon: Car, title: "Transport & Mobility", to: "/transport" },
  { icon: BedDouble, title: "Hospitality & Stays", to: "/stays" },
  { icon: Headphones, title: "Client Support", to: "/support" },
] as const;

const why = [
  { icon: Headphones, title: "24/7 on-ground support", text: "A real person on call day and night throughout your trip." },
  { icon: Award, title: "Licensed expert guides", text: "Experienced, certified driver-guides who know every corner of the parks." },
  { icon: RouteIcon, title: "Fully customized itineraries", text: "Your dates, budget and pace — built from scratch around you." },
  { icon: ShieldCheck, title: "Vetted lodges & vehicles", text: "Every camp and 4x4 personally inspected for comfort and safety." },
];

const styles = [
  { title: "Adventure", img: IMG.hike, to: "/experiences/adventure" },
  { title: "Cultural", img: IMG.culture, to: "/experiences/cultural" },
  { title: "Romantic", img: IMG.romance, to: "/experiences/romantic" },
  { title: "Corporate", img: IMG.conference, to: "/experiences/corporate" },
  { title: "Family", img: IMG.family, to: "/tours" },
];

const steps = ["Tell us your dream", "Get a custom itinerary", "Confirm and pay securely", "Travel with 24/7 support"];

function Index() {
  const navigate = useNavigate();
  const featured = ["3-day-maasai-mara-classic-safari", "amboseli-kilimanjaro-views", "samburu-wildlife-escape", "diani-beach-extension"].map((s) => packages.find((p) => p.slug === s)!);
  return (
    <SiteLayout>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={hero} alt="Savanna at sunset with elephants and a safari vehicle" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 text-primary-foreground">
          <p className="font-display tracking-[0.3em] text-accent">Kridonelly Safaris</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">Your Journey Into the Wild, Perfectly Crafted.</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Tailor-made safaris, group departures and seamless travel across Kenya & East Africa.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/tours" className="rounded-full bg-sunset px-6 py-3 font-semibold text-primary-foreground shadow-lg">Explore Safaris</Link>
            <Link to="/plan-my-trip" className="rounded-full border border-primary-foreground/60 px-6 py-3 font-semibold hover:bg-primary-foreground/10">Plan My Trip</Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4">
        <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/plan-my-trip" }); }} className="grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Destination", <select key="d" className="w-full bg-transparent"><option>Maasai Mara</option><option>Amboseli</option><option>Samburu</option><option>Diani Beach</option><option>Mount Kenya</option></select>],
            ["Travel dates", <input key="t" type="date" className="w-full bg-transparent" />],
            ["Travellers", <input key="n" type="number" min={1} defaultValue={2} className="w-full bg-transparent" />],
            ["Budget", <select key="b" className="w-full bg-transparent"><option>Under $500</option><option>$500 – $1,500</option><option>$1,500 – $3,000</option><option>$3,000+</option></select>],
          ].map(([l, el]) => (
            <label key={l as string} className="rounded-lg border border-input px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{l}<div className="mt-1 text-sm font-normal normal-case text-foreground">{el}</div></label>
          ))}
          <button className="rounded-lg bg-sunset px-4 py-3 font-semibold text-primary-foreground">Get a Quote</button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading center eyebrow="What we offer" title="Everything for your trip, in one place" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {offers.map((o) => (
            <Link key={o.title} to={o.to} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <o.icon className="mx-auto h-9 w-9 text-primary" />
              <p className="mt-3 font-semibold text-secondary">{o.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Featured packages" title="Our most-loved journeys" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
          <Link to="/tours" className="mt-8 inline-block font-semibold text-primary">See all safaris →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading center eyebrow="Why choose us" title="Travel with people who know Kenya" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <div key={w.title} className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sunset text-primary-foreground"><w.icon /></div>
              <h3 className="mt-4 font-semibold text-secondary">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <SectionHeading eyebrow="Travel styles" title="Find your kind of journey" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {styles.map((s) => (
            <Link key={s.title} to={s.to} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={img(s.img, 500)} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-overlay" />
              <p className="absolute bottom-4 left-4 font-display text-xl text-primary-foreground">{s.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s} className="rounded-2xl border border-secondary-foreground/15 p-6">
                <p className="font-display text-4xl text-accent">0{i + 1}</p>
                <p className="mt-3 text-lg font-semibold">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading center eyebrow="Testimonials" title="What our travellers say" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">{testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}</div>
      </section>

      <CTABanner title="Ready for your safari? Let's design it together." sub="Tell us your dream trip and get a free custom itinerary within 24 hours." />

      <section className="grid grid-cols-3 md:grid-cols-6">
        {[IMG.lion, IMG.beach, IMG.giraffe, IMG.camp, IMG.amboseli, IMG.culture].map((i) => (
          <img key={i} src={img(i, 400)} alt="Safari moment" loading="lazy" className="aspect-square w-full object-cover" />
        ))}
      </section>
      <Building className="hidden" />
    </SiteLayout>
  );
}
