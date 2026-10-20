import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Wifi, Utensils, Waves, Trees } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading, CTABanner } from "@/components/SiteLayout";
import { img, IMG, waLink } from "@/lib/packages";
import { meta } from "@/lib/meta";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/stays")({
  head: () => meta("Lodges, Camps & Hotels in Kenya — Kridonelly Safaris", "We book vetted luxury tented camps, boutique hotels, eco-lodges and full-board vacation rentals across Kenya at the best rates."),
  component: Stays,
});

type Stay = { name: string; region: string; category: string; budget: string; image: string; gallery: string[]; desc: string; amenities: string[]; nearby: string };
const stays: Stay[] = [
  { name: "Mara Riverside Tented Camp", region: "Maasai Mara", category: "Luxury Tented Camps", budget: "$$$", image: IMG.camp, gallery: [IMG.camp, IMG.mara, IMG.lion], desc: "Spacious canvas suites on the Mara River with private decks.", amenities: ["Full board", "Wi-Fi", "Pool"], nearby: "Game drives, balloon safaris, Maasai village" },
  { name: "Kilima View Lodge", region: "Amboseli", category: "Eco-Lodges", budget: "$$", image: IMG.amboseli, gallery: [IMG.amboseli, IMG.elephants], desc: "Solar-powered lodge facing Kilimanjaro.", amenities: ["Full board", "Nature trails"], nearby: "Observation Hill, elephant herds" },
  { name: "Samburu River Lodge", region: "Samburu", category: "Luxury Tented Camps", budget: "$$$", image: IMG.giraffe, gallery: [IMG.giraffe, IMG.zebra], desc: "Riverside tents among doum palms.", amenities: ["Full board", "Pool", "Wi-Fi"], nearby: "Samburu Special Five, cultural visits" },
  { name: "Nakuru Lakeside Hotel", region: "Nakuru", category: "Boutique Hotels", budget: "$$", image: IMG.resort, gallery: [IMG.resort, IMG.pool], desc: "Boutique hotel above Lake Nakuru.", amenities: ["Breakfast", "Wi-Fi", "Pool"], nearby: "Rhino sanctuary, flamingos" },
  { name: "Diani Beach Villa", region: "Coast", category: "Full-Board Vacation Rentals", budget: "$$$", image: IMG.beach, gallery: [IMG.beach, IMG.pool], desc: "Private villa with chef, steps from the sand.", amenities: ["Private chef", "Pool", "Wi-Fi"], nearby: "Snorkelling, dhow cruises, Shimba Hills" },
  { name: "Westlands Family Apartments", region: "Nairobi", category: "Family Apartments", budget: "$", image: IMG.pool, gallery: [IMG.pool, IMG.resort], desc: "Serviced 2- and 3-bedroom apartments.", amenities: ["Kitchen", "Wi-Fi", "Pool"], nearby: "Malls, Giraffe Centre, National Park" },
];
const icon: Record<string, typeof Wifi> = { "Wi-Fi": Wifi, Pool: Waves, "Full board": Utensils, "Private chef": Utensils, Breakfast: Utensils, Kitchen: Utensils, "Nature trails": Trees };

function Stays() {
  const [region, setRegion] = useState("All");
  const [cat, setCat] = useState("All");
  const [budget, setBudget] = useState("All");
  const [open, setOpen] = useState<Stay | null>(null);
  const list = stays.filter((s) => (region === "All" || s.region === region) && (cat === "All" || s.category === cat) && (budget === "All" || s.budget === budget));
  const sel = (l: string, v: string, set: (s: string) => void, o: string[]) => (
    <label className="text-xs font-semibold uppercase text-muted-foreground">{l}<select value={v} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm normal-case text-foreground">{["All", ...o].map((x) => <option key={x}>{x}</option>)}</select></label>
  );
  return (
    <SiteLayout>
      <PageHero title="Hospitality & Stays" sub="Luxury tented camps, boutique hotels, eco-lodges, family apartments and full-board rentals." img={img(IMG.resort, 1800)} />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3">
          {sel("Region", region, setRegion, ["Maasai Mara", "Amboseli", "Samburu", "Nakuru", "Coast", "Nairobi"])}
          {sel("Category", cat, setCat, ["Luxury Tented Camps", "Boutique Hotels", "Eco-Lodges", "Family Apartments", "Full-Board Vacation Rentals"])}
          {sel("Budget", budget, setBudget, ["$", "$$", "$$$"])}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <button onClick={() => setOpen(s)} className="block w-full"><img src={img(s.image, 700)} alt={s.name} loading="lazy" className="aspect-[4/3] w-full object-cover" /></button>
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{s.category} · {s.budget}</p>
                <h3 className="mt-1 text-lg font-semibold text-secondary">{s.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{s.region}</p>
                <div className="mt-3 flex gap-3 text-muted-foreground">{s.amenities.map((a) => { const I = icon[a] ?? Wifi; return <I key={a} className="h-5 w-5" aria-label={a} />; })}</div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setOpen(s)} className="flex-1 rounded-full border border-primary py-2 text-sm font-semibold text-primary">Details</button>
                  <a href={waLink(`Hi, I'd like to enquire about ${s.name}.`)} target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-sunset py-2 text-center text-sm font-semibold text-primary-foreground">Enquire</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {list.length === 0 && <p className="py-12 text-center text-muted-foreground">No stays match — ask us and we'll find one.</p>}
      </section>
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open && <>
            <DialogTitle>{open.name}</DialogTitle>
            <div className="grid grid-cols-2 gap-2">{open.gallery.map((g) => <img key={g} src={img(g, 500)} alt="" className="aspect-video w-full rounded-lg object-cover" />)}</div>
            <p>{open.desc}</p>
            <p className="text-sm"><b>Amenities:</b> {open.amenities.join(", ")}</p>
            <p className="text-sm"><b>Nearby:</b> {open.nearby}</p>
            <a href={waLink(`Hi, I'd like to enquire about ${open.name}.`)} target="_blank" rel="noreferrer" className="rounded-full bg-sunset py-3 text-center font-semibold text-primary-foreground">Enquire on WhatsApp</a>
          </>}
        </DialogContent>
      </Dialog>
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="All-inclusive" title="Full-board vacation packages" sub="One price covers your lodging, daily chef-curated meals and hand-picked local excursions, so you can simply relax." />
        </div>
      </section>
      <CTABanner title="Let us book it for you: vetted properties, best rates." to="/contact" label="Contact us" />
    </SiteLayout>
  );
}
