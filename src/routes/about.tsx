import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Leaf } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading, CTABanner } from "@/components/SiteLayout";
import { img, IMG } from "@/lib/packages";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us — Kridonelly Safaris, Nairobi", "Meet the Nairobi-based team behind Kridonelly Safaris: our story, mission, expert guides and commitment to sustainable travel."),
  component: About,
});

const team = [
  { name: "Lead Safari Guide", cert: "KPSGA Silver-certified guide", img: IMG.lion },
  { name: "Travel Designer", cert: "10+ years crafting East Africa itineraries", img: IMG.camp },
  { name: "Operations Manager", cert: "Fleet & 24/7 ground support", img: IMG.car },
];
const timeline = [["Founded", "Started in Nairobi with a passion for sharing Kenya."], ["First fleet", "Added our own 4x4 Land Cruisers."], ["Beyond safaris", "Launched transport, stays and corporate travel."], ["Today", "Hundreds of happy travellers from around the world."]];

function About() {
  return (
    <SiteLayout>
      <PageHero title="About Kridonelly Safaris" sub="A Nairobi-based team sharing the wild heart of Africa." img={img(IMG.elephants, 1800)} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our story" title="Born from a love of the wild" />
          <p className="mt-4 leading-relaxed text-muted-foreground">Kridonelly Safaris was created to give travellers authentic, seamless journeys across Kenya and East Africa — from the plains of the Maasai Mara to the beaches of Diani.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground"><b className="text-foreground">Our mission:</b> craft every trip around the traveller, look after them 24/7, and leave a positive mark on the places and people we visit.</p>
        </div>
        <img src={img(IMG.mara, 900)} alt="Maasai Mara" loading="lazy" className="rounded-3xl object-cover shadow-lg" />
      </section>
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Our team" title="The people behind your journey" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {team.map((t) => (
              <div key={t.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img src={img(t.img, 600)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5"><h3 className="font-semibold text-secondary">{t.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><BadgeCheck className="h-4 w-4 text-primary" />{t.cert}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Sustainability" title="Travel that gives back" />
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {["We work with community-owned conservancies and local guides.", "Plastic-free safari vehicles with refillable water.", "Part of every booking supports local schools and conservation.", "Licensed and registered tour operator in Kenya."].map((x) => <li key={x} className="flex gap-2"><Leaf className="h-5 w-5 shrink-0 text-primary" />{x}</li>)}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Milestones" title="Our journey so far" />
          <ol className="mt-6 space-y-6 border-l-2 border-primary pl-6">
            {timeline.map(([t, x]) => <li key={t}><p className="font-semibold text-secondary">{t}</p><p className="text-sm text-muted-foreground">{x}</p></li>)}
          </ol>
        </div>
      </section>
      <CTABanner title="Let's plan your Kenya story." />
    </SiteLayout>
  );
}
