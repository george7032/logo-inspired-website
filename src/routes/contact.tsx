import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { SiteLayout, PageHero, EnquiryForm } from "@/components/SiteLayout";
import { img, IMG, waLink, PHONE } from "@/lib/packages";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Kridonelly Safaris — Nairobi, Kenya", "Call or WhatsApp +254 799 034311 or send us an enquiry. Our Nairobi team replies within 24 hours."),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <PageHero title="Contact Us" sub="Tell us about your dream trip — we reply within 24 hours." img={img(IMG.amboseli, 1800)} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="space-y-5">
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex gap-3"><Phone className="text-primary" /><div><p className="font-semibold">Call us</p><p className="text-muted-foreground">{PHONE}</p></div></a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="flex gap-3"><MessageCircle className="text-primary" /><div><p className="font-semibold">WhatsApp</p><p className="text-muted-foreground">{PHONE}</p></div></a>
          <div className="flex gap-3"><MapPin className="text-primary" /><div><p className="font-semibold">Office</p><p className="text-muted-foreground">Nairobi, Kenya</p></div></div>
          <div className="flex gap-3"><Clock className="text-primary" /><div><p className="font-semibold">Hours</p><p className="text-muted-foreground">Mon–Sat 8am–6pm · Travel support 24/7</p></div></div>
          <iframe title="Nairobi map" loading="lazy" className="h-64 w-full rounded-2xl border border-border" src="https://maps.google.com/maps?q=Nairobi,Kenya&z=12&output=embed" />
        </div>
        <div className="lg:col-span-2"><EnquiryForm topic="General enquiry" /></div>
      </section>
    </SiteLayout>
  );
}
