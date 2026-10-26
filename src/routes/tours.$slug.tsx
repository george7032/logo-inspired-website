import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Clock, MapPin, Check, X } from "lucide-react";
import { SiteLayout, PackageCard, EnquiryForm, InfoCards } from "@/components/SiteLayout";
import { packages, img, waLink } from "@/lib/packages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const p = packages.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => ({
    meta: p ? [
      { title: `${p.title} — Kridonelly Safaris` },
      { name: "description", content: p.summary },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.summary },
      { property: "og:type", content: "article" },
      { property: "og:image", content: img(p.image, 1200) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img(p.image, 1200) },
    ] : [{ title: "Tour not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <SiteLayout><div className="py-32 text-center"><p className="text-2xl">Tour not found.</p><Link to="/tours/" className="text-primary">Back to tours</Link></div></SiteLayout>,
  component: Detail,
});

const faqs: [string, string][] = [
  ["What should I pack?", "Neutral clothing, a warm layer for early drives, sunscreen, hat and binoculars."],
  ["Is it safe for children?", "Yes. We provide child seats and family-friendly lodges."],
  ["How do I pay?", "A deposit secures your booking; the balance is due 30 days before travel. We accept cards, bank transfer and M-Pesa."],
];

function Detail() {
  const p = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mode, setMode] = useState<"Group Departure" | "Private">("Group Departure");
  const related = packages.filter((x) => x.slug !== p.slug && (x.destination === p.destination || x.type === p.type)).slice(0, 3);
  const today = new Date();
  const departures = [7, 21, 35, 49].map((d, i) => ({ date: new Date(today.getTime() + d * 864e5).toDateString(), seats: [5, 3, 7, 2][i] }));

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
          {p.gallery.slice(0, 4).map((g, i) => (
            <button key={g} onClick={() => setLightbox(g)} className={`overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img src={img(g, i === 0 ? 1200 : 600)} alt={p.title} className="h-full max-h-[460px] w-full object-cover transition hover:scale-105" />
            </button>
          ))}
        </div>
      </section>
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl p-2"><DialogTitle className="sr-only">{p.title}</DialogTitle>{lightbox && <img src={img(lightbox, 1600)} alt={p.title} className="w-full rounded" />}</DialogContent>
      </Dialog>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{p.type}</p>
          <h1 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl">{p.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{p.days} days</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{p.destination}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" />{p.rating} / 5</span>
          </div>
          <p className="mt-2 text-lg">From <span className="text-2xl font-bold text-primary">${p.priceFrom}</span> per person</p>

          <div className="mt-8"><InfoCards items={[
            { title: "What's included", text: p.included.slice(0, 5).join(" · ") },
            { title: "Best for", text: p.bestFor },
            { title: "Flexibility", text: p.flexibility },
          ]} /></div>

          <Tabs defaultValue="overview" className="mt-10">
            <TabsList className="flex h-auto flex-wrap justify-start">
              {["overview", "itinerary", "inclusions", "accommodation", "gallery", "faqs"].map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t === "itinerary" ? "Day-by-day" : t}</TabsTrigger>)}
            </TabsList>
            <TabsContent value="overview" className="pt-4">
              <p className="leading-relaxed">{p.summary}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">{p.highlights.map((h) => <li key={h} className="flex gap-2"><Check className="h-5 w-5 text-primary" />{h}</li>)}</ul>
            </TabsContent>
            <TabsContent value="itinerary">
              <Accordion type="single" collapsible defaultValue="0">
                {p.itinerary.map((d, i) => <AccordionItem key={d.day} value={String(i)}><AccordionTrigger>{d.day}</AccordionTrigger><AccordionContent>{d.text}</AccordionContent></AccordionItem>)}
              </Accordion>
            </TabsContent>
            <TabsContent value="inclusions" className="grid gap-6 pt-4 sm:grid-cols-2">
              <ul className="space-y-2"><li className="font-semibold">Included</li>{p.included.map((x) => <li key={x} className="flex gap-2"><Check className="h-5 w-5 text-primary" />{x}</li>)}</ul>
              <ul className="space-y-2"><li className="font-semibold">Not included</li>{p.notIncluded.map((x) => <li key={x} className="flex gap-2"><X className="h-5 w-5 text-destructive" />{x}</li>)}</ul>
            </TabsContent>
            <TabsContent value="accommodation" className="pt-4">{p.accommodation}</TabsContent>
            <TabsContent value="gallery" className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-3">
              {p.gallery.map((g) => <button key={g} onClick={() => setLightbox(g)}><img src={img(g, 500)} alt="" loading="lazy" className="aspect-square w-full rounded-lg object-cover" /></button>)}
            </TabsContent>
            <TabsContent value="faqs">
              <Accordion type="single" collapsible>{faqs.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
            </TabsContent>
          </Tabs>

          <h2 className="mt-12 text-2xl font-bold text-secondary">Route map</h2>
          <iframe title="Route map" className="mt-4 h-72 w-full rounded-2xl border border-border" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(p.destination === "Multiple" ? "Kenya" : p.destination + ", Kenya")}&z=7&output=embed`} />

          <h2 className="mt-12 text-2xl font-bold text-secondary">Upcoming departure dates</h2>
          <table className="mt-4 w-full overflow-hidden rounded-2xl border border-border text-sm">
            <thead className="bg-muted"><tr><th className="p-3 text-left">Date</th><th className="p-3 text-left">Seats left</th><th className="p-3 text-left">Price</th></tr></thead>
            <tbody>{departures.map((d) => <tr key={d.date} className="border-t border-border"><td className="p-3">{d.date}</td><td className="p-3">{d.seats}</td><td className="p-3">${p.priceFrom}</td></tr>)}</tbody>
          </table>

          <h2 id="book" className="mt-12 text-2xl font-bold text-secondary">Request this booking</h2>
          <div className="mt-4"><EnquiryForm topic={`${p.title} (${mode})`} submitLabel="Request booking" /></div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="text-3xl font-bold text-primary">${p.priceFrom} <span className="text-sm font-normal text-muted-foreground">per person</span></p>
            <div className="mt-4 grid grid-cols-2 rounded-full bg-muted p-1 text-sm font-semibold">
              {(["Group Departure", "Private"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-full py-2 ${mode === m ? "bg-background text-primary shadow" : ""}`}>{m}</button>)}
            </div>
            <label className="mt-4 block text-sm font-medium">Date<input type="date" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" /></label>
            <label className="mt-3 block text-sm font-medium">Travellers<input type="number" min={1} defaultValue={2} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2" /></label>
            <a href="#book" className="mt-5 block rounded-full bg-sunset py-3 text-center font-semibold text-primary-foreground">Request Booking</a>
            <a href={waLink(`Hi, I'd like to book the ${p.title} (${mode}).`)} target="_blank" rel="noreferrer" className="mt-3 block rounded-full bg-whatsapp py-3 text-center font-semibold text-primary-foreground">Book on WhatsApp</a>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20">
          <h2 className="text-2xl font-bold text-secondary">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PackageCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </SiteLayout>
  );
}
