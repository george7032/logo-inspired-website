import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Plan Your Safari — Kridonelly Safaris" },
      { name: "description", content: "Tell us your dates, budget and dream experiences and we'll craft your perfect African journey." },
      { property: "og:title", content: "Plan Your Safari — Kridonelly Safaris" },
      { property: "og:description", content: "Request a tailor-made safari itinerary." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero title="Plan Your Safari" sub="Share a few details and we'll get back to you with a tailored itinerary." img={hero} />
      <section className="mx-auto max-w-2xl px-4 py-16">
        {sent ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold text-secondary">Asante sana!</h2>
            <p className="mt-2 text-muted-foreground">Thanks for your enquiry — we'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <input placeholder="Phone / WhatsApp" className={field} />
              <input type="date" className={field} />
            </div>
            <select className={field} defaultValue="">
              <option value="" disabled>Type of trip</option>
              <option>Tailor-made itinerary</option><option>Group departure</option><option>Day trip</option>
              <option>Multi-day safari</option><option>Honeymoon / milestone</option><option>Corporate / MICE</option>
            </select>
            <textarea rows={5} placeholder="Tell us about your dream trip, group size and budget" className={field} />
            <button className="w-full rounded bg-sunset py-3 font-semibold text-primary-foreground">Send enquiry</button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
