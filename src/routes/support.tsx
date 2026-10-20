import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/SiteLayout";
import { img, IMG, waLink, PHONE } from "@/lib/packages";
import { meta } from "@/lib/meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/support")({
  head: () => meta("24/7 Travel Support & Kenya Travel Advice — Kridonelly Safaris", "Round-the-clock emergency support plus guides on Kenya entry requirements, health, packing, currency, tipping, M-Pesa and the best time to visit."),
  component: Support,
});

const guides: [string, string][] = [
  ["Entry requirements & eTA", "Most visitors need a Kenya Electronic Travel Authorisation (eTA) applied for online before travel. Your passport must be valid for 6 months."],
  ["Health & vaccinations", "Yellow fever certificate may be required. Malaria prophylaxis is recommended for most safari areas — consult your doctor."],
  ["Currency, tipping & M-Pesa", "The currency is the Kenyan Shilling (KES). US dollars are widely accepted. Tipping guides about $10–15 per day is customary. M-Pesa mobile money is used everywhere."],
  ["Safety tips", "Stay in the vehicle during game drives, follow your guide's instructions, and keep valuables in your lodge safe."],
  ["Best time to visit by region", "Maasai Mara: Jul–Oct (migration). Amboseli & Samburu: Jun–Oct and Jan–Feb. Coast: Dec–Mar and Jul–Oct."],
];
const checklist = ["Passport & eTA", "Neutral-coloured clothing", "Warm fleece for early drives", "Hat & sunglasses", "Sunscreen & insect repellent", "Binoculars", "Camera & spare batteries", "Swimwear (beach)", "Hiking boots (trekking)", "Medication & first aid"];

function Support() {
  const [ticked, setTicked] = useState<string[]>([]);
  return (
    <SiteLayout>
      <PageHero title="Travel Support" sub="We're with you before, during and after your trip — 24 hours a day." img={img(IMG.camp, 1800)} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-secondary p-8 text-secondary-foreground">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><AlertTriangle className="text-accent" />24/7 emergency support</h2>
          <p className="mt-2 opacity-90">Flight delays, medical issues or last-minute itinerary changes — call or message us anytime.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full bg-sunset px-5 py-3 font-semibold text-primary-foreground"><Phone className="h-4 w-4" />{PHONE}</a>
            <a href={waLink("Hi, I need urgent help with my trip.")} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-primary-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Travel advisory" title="Know before you go" />
          <Accordion type="single" collapsible className="mt-4">{guides.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
          <button onClick={() => window.print()} className="mt-6 rounded-full border border-primary px-5 py-3 font-semibold text-primary">Print / save Pre-Trip Briefing</button>
        </div>
        <div>
          <SectionHeading eyebrow="Packing checklist" title={`Ready to pack? ${ticked.length}/${checklist.length}`} />
          <ul className="mt-6 space-y-2">
            {checklist.map((c) => (
              <li key={c}><label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <input type="checkbox" checked={ticked.includes(c)} onChange={() => setTicked(ticked.includes(c) ? ticked.filter((x) => x !== c) : [...ticked, c])} className="h-4 w-4 accent-[var(--primary)]" />
                <span className={ticked.includes(c) ? "line-through opacity-60" : ""}>{c}</span>
              </label></li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
