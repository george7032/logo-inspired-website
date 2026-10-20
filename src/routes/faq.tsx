import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTABanner } from "@/components/SiteLayout";
import { img, IMG } from "@/lib/packages";
import { meta } from "@/lib/meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => meta("Safari FAQ — Kridonelly Safaris", "Answers about booking and payments, safaris, transport, health and safety, and cancellations for travel in Kenya."),
  component: Faq,
});

const groups: [string, [string, string][]][] = [
  ["Booking & Payments", [["How do I book?", "Send an enquiry or WhatsApp us; we send a custom quote, and a deposit confirms your trip."], ["Which payment methods do you accept?", "Card, bank transfer and M-Pesa."]]],
  ["Safaris", [["When is the best time to visit?", "July–October for the migration; January–March is also excellent and quieter."], ["Are safaris suitable for children?", "Yes — we recommend family-friendly lodges and shorter drives."]]],
  ["Transport", [["Is airport pickup included?", "It's included in most packages and available separately at fixed rates."], ["Do vehicles have pop-up roofs?", "Yes, all our safari vehicles do."]]],
  ["Health & Safety", [["Do I need vaccinations?", "Yellow fever may be required depending on your route; consult your doctor and see our Travel Support page."], ["Is Kenya safe?", "Yes. Our guides and 24/7 support team look after you throughout."]]],
  ["Cancellations", [["What is your cancellation policy?", "Cancellation terms depend on the lodges booked; we share them clearly with your quote."], ["Can I change my dates?", "Yes, subject to availability — just let us know as early as possible."]]],
];

function Faq() {
  return (
    <SiteLayout>
      <PageHero title="Frequently Asked Questions" sub="Everything you need to know before you travel." img={img(IMG.zebra, 1800)} />
      <section className="mx-auto max-w-3xl space-y-10 px-4 py-16">
        {groups.map(([g, qs]) => (
          <div key={g}>
            <h2 className="text-2xl font-bold text-secondary">{g}</h2>
            <Accordion type="single" collapsible>{qs.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
          </div>
        ))}
      </section>
      <CTABanner title="Still have a question?" to="/contact" label="Contact us" />
    </SiteLayout>
  );
}
