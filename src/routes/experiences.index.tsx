import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTABanner } from "@/components/SiteLayout";
import { experiences } from "@/lib/experiences";
import { img, IMG } from "@/lib/packages";

export const Route = createFileRoute("/experiences/")({
  head: () => ({
    meta: [
      { title: "Travel Experiences — Adventure, Cultural, Romantic & Corporate | Kridonelly" },
      { name: "description", content: "Specialized travel in Kenya: mountain treks, cultural encounters, honeymoons and corporate retreats." },
      { property: "og:title", content: "Travel Experiences — Kridonelly Safaris" },
      { property: "og:description", content: "Adventure, cultural, romantic and corporate travel across Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Experiences" sub="Specialized journeys built around what moves you." img={img(IMG.hike, 1800)} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Niche travel" title="Choose your experience" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {experiences.map((e) => (
            <Link key={e.slug} to="/experiences/$category" params={{ category: e.slug }} className="group relative aspect-[16/10] overflow-hidden rounded-3xl">
              <img src={img(e.image, 900)} alt={e.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-overlay" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                <h3 className="text-2xl font-bold">{e.title}</h3>
                <p className="mt-1 opacity-90">{e.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTABanner title="Have something unique in mind?" sub="We design one-of-a-kind experiences on request." />
    </SiteLayout>
  ),
});
