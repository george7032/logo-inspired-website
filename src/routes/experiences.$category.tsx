import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, InfoCards, TestimonialCard, EnquiryForm } from "@/components/SiteLayout";
import { experiences } from "@/lib/experiences";
import { img } from "@/lib/packages";

export const Route = createFileRoute("/experiences/$category")({
  loader: ({ params }) => {
    const e = experiences.find((x) => x.slug === params.category);
    if (!e) throw notFound();
    return e;
  },
  head: ({ loaderData: e }) => ({
    meta: e ? [
      { title: `${e.title} Travel in Kenya — Kridonelly Safaris` },
      { name: "description", content: e.tagline },
      { property: "og:title", content: `${e.title} — Kridonelly Safaris` },
      { property: "og:description", content: e.tagline },
      { property: "og:type", content: "website" },
      { property: "og:image", content: img(e.image, 1200) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img(e.image, 1200) },
    ] : [{ title: "Not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <SiteLayout><p className="py-32 text-center text-2xl">Experience not found.</p></SiteLayout>,
  component: Page,
});

function Page() {
  const e = Route.useLoaderData();
  const corporate = e.slug === "corporate";
  return (
    <SiteLayout>
      <PageHero title={e.title} sub={e.tagline} img={img(e.image, 1800)} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Sample experiences" title="Ideas to get you started" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {e.items.map((i) => (
            <div key={i.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img src={img(i.image, 600)} alt={i.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-5"><h3 className="font-semibold text-secondary">{i.title}</h3><p className="mt-2 text-sm text-muted-foreground">{i.text}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-12"><InfoCards items={[{ title: "Included", text: e.included }, { title: "Best for", text: e.bestFor }, { title: "Flexibility", text: e.flexibility }]} /></div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 lg:grid-cols-3">
        <div>
          <TestimonialCard {...e.testimonial} />
          {corporate && <a href="/kridonelly-corporate-brochure.txt" download className="mt-6 block rounded-full border border-primary py-3 text-center font-semibold text-primary">Download corporate brochure</a>}
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-secondary">{corporate ? "Request a Corporate Proposal" : `Enquire about ${e.title}`}</h2>
          <div className="mt-4">
            <EnquiryForm topic={e.title} submitLabel={corporate ? "Request proposal" : "Send enquiry"} fields={corporate ? [
              { name: "Company", label: "Company name", required: true },
              { name: "Contact email", label: "Contact email", type: "email", required: true },
              { name: "Group size", label: "Group size", type: "number" },
              { name: "Dates", label: "Preferred dates", type: "date" },
              { name: "Budget", label: "Budget", options: ["Under $10k", "$10k-$50k", "$50k+", "Not sure yet"] },
              { name: "Objectives", label: "Objectives", type: "textarea" },
            ] : undefined} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
