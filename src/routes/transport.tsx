import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Plane, Train, Ship } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading, EnquiryForm } from "@/components/SiteLayout";
import { img, IMG, waLink } from "@/lib/packages";
import { meta } from "@/lib/meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/transport")({
  head: () => meta("Airport Transfers, Safari Vehicle Hire & Tickets — Kridonelly Safaris", "Fixed-rate JKIA transfers, 4x4 Land Cruiser and safari van hire with driver-guides, plus flights, SGR and ferry tickets in Kenya."),
  component: Transport,
});

const transfers = [["JKIA → Nairobi CBD", 35], ["JKIA → Karen", 45], ["JKIA → Westlands", 40], ["JKIA → Wilson Airport", 35]] as const;
const fleet = [
  { name: "Land Cruiser 4x4", seats: 7, features: "Pop-up roof, charging ports, fridge, radio", rate: 250 },
  { name: "Pop-top Safari Van", seats: 7, features: "Pop-up roof, window seats for all", rate: 170 },
  { name: "Executive Sedan", seats: 3, features: "Air-conditioned, Wi-Fi, bottled water", rate: 90 },
  { name: "Minibus", seats: 14, features: "Ideal for groups and conferences", rate: 200 },
];
const rates: Record<string, number> = { "Executive Sedan": 1, "Pop-top Safari Van": 1.7, "Land Cruiser 4x4": 2.4, Minibus: 2 };
const places: Record<string, number> = { "Nairobi CBD": 0, JKIA: 18, Karen: 20, Naivasha: 90, Nakuru: 160, Amboseli: 240, "Maasai Mara": 270, Mombasa: 480 };

function Transport() {
  const [from, setFrom] = useState("JKIA");
  const [to, setTo] = useState("Maasai Mara");
  const [v, setV] = useState("Land Cruiser 4x4");
  const km = Math.abs((places[from] ?? 0) - (places[to] ?? 0)) || 15;
  const base = Math.max(30, Math.round(km * 0.9 * (rates[v] ?? 1)));
  const sel = (val: string, set: (s: string) => void, opts: string[], label: string) => (
    <label className="text-sm font-medium">{label}<select value={val} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2">{opts.map((o) => <option key={o}>{o}</option>)}</select></label>
  );
  return (
    <SiteLayout>
      <PageHero title="Transport & Mobility" sub="Reliable airport transfers, safari vehicles with driver-guides and every ticket you need." img={img(IMG.car, 1800)} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="01" title="Airport transfers & chauffeur services" sub="Meet-and-greet at arrivals with a name board, help with luggage and flight tracking — we wait if you're delayed." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {transfers.map(([r, p]) => <div key={r} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><p className="font-semibold text-secondary">{r}</p><p className="mt-2 text-2xl font-bold text-primary">${p}</p><p className="text-xs text-muted-foreground">fixed rate, sedan, up to 3 guests</p></div>)}
        </div>
        <div className="mt-8"><EnquiryForm topic="Airport transfer" submitLabel="Book transfer" fields={[
          { name: "Name", label: "Your name", required: true },
          { name: "Flight number", label: "Flight number", required: true },
          { name: "Pickup time", label: "Pickup date & time", type: "datetime-local", required: true },
          { name: "Route", label: "Route", options: transfers.map((t) => t[0]) },
          { name: "Passengers", label: "Passengers", type: "number" },
          { name: "Luggage", label: "Pieces of luggage", type: "number" },
        ]} /></div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="02" title="Safari & vehicle hire" sub="All vehicles are available with a licensed driver-guide." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((f) => (
              <div key={f.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary">{f.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm"><Users className="h-4 w-4" />{f.seats} seats · driver-guide included</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.features}</p>
                <p className="mt-3 text-sm">From <b className="text-primary">${f.rate}</b>/day</p>
                <a href={waLink(`Hi, I'd like a quote for the ${f.name}.`)} target="_blank" rel="noreferrer" className="mt-4 block rounded-full bg-sunset py-2 text-center text-sm font-semibold text-primary-foreground">Request Quote</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="03" title="Domestic ticketing" />
          <ul className="mt-6 space-y-3">
            {[[Plane, "Regional flights & bush charters to the Mara, Samburu, Lamu and the coast"], [Train, "SGR Madaraka Express, Nairobi–Mombasa"], [Ship, "Likoni and Lamu ferry crossings"]].map(([I, t]) => {
              const Icon = I as typeof Plane;
              return <li key={t as string} className="flex gap-3"><Icon className="h-5 w-5 text-primary" />{t as string}</li>;
            })}
          </ul>
          <div className="mt-6"><EnquiryForm topic="Domestic ticketing" fields={[
            { name: "Name", label: "Your name", required: true },
            { name: "Ticket type", label: "Ticket type", options: ["Flight", "Bush charter", "SGR train", "Ferry"] },
            { name: "Route", label: "From – to" },
            { name: "Date", label: "Date", type: "date" },
          ]} /></div>
        </div>
        <div>
          <SectionHeading eyebrow="04" title="Price estimator" />
          <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            {sel(from, setFrom, Object.keys(places), "Pickup")}
            {sel(to, setTo, Object.keys(places), "Drop-off")}
            {sel(v, setV, Object.keys(rates), "Vehicle type")}
            <div className="rounded-xl bg-muted p-5 text-center">
              <p className="text-sm text-muted-foreground">Estimated one-way price</p>
              <p className="text-3xl font-bold text-primary">${base} – ${Math.round(base * 1.25)}</p>
              <p className="mt-1 text-xs text-muted-foreground">This is an estimate only. Final price confirmed on booking.</p>
            </div>
          </div>
          <h3 className="mt-10 text-xl font-bold text-secondary">FAQs</h3>
          <Accordion type="single" collapsible>
            {([["How long will the driver wait?", "Up to 60 minutes after landing at no extra charge; we track your flight."], ["Do you have child seats?", "Yes, free on request — tell us the children's ages."], ["What if my flight is delayed?", "We monitor flights and adjust pickup automatically."], ["How can I pay?", "Card, bank transfer, M-Pesa or cash to the driver."]] as [string, string][]).map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
