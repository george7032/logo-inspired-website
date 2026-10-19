import { Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Menu, X, MessageCircle, Star, MapPin, Clock, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { img, waLink, PHONE, type Pkg } from "@/lib/packages";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Safaris & Tours" },
  { to: "/experiences", label: "Experiences" },
  { to: "/transport", label: "Transport" },
  { to: "/stays", label: "Stays" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="Kridonelly Safaris logo" className="h-12 w-12 rounded-full object-cover" />
            <span className="hidden font-display text-base font-bold text-secondary sm:block">Kridonelly Safaris</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/plan-my-trip" className="rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground shadow">Plan My Trip</Link>
            <button aria-label="Menu" onClick={() => setOpen(!open)} className="p-2 lg:hidden">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-border px-4 py-3 lg:hidden">
            {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 font-semibold">{n.label}</Link>)}
            <Link to="/faq" onClick={() => setOpen(false)} className="block py-2 font-semibold">FAQ</Link>
            <Link to="/support" onClick={() => setOpen(false)} className="block py-2 font-semibold">Travel Support</Link>
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-xl transition hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
      <footer className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo.url} alt="" className="h-20 w-20 rounded-full object-cover" />
            <p className="mt-3 font-display tracking-widest text-accent">Discover the wild heart of Africa</p>
            <NewsletterForm />
          </div>
          <div className="space-y-2 text-sm opacity-90">
            <p className="font-display text-base">Quick links</p>
            {nav.map((n) => <Link key={n.to} to={n.to} className="block hover:text-accent">{n.label}</Link>)}
            <Link to="/faq" className="block hover:text-accent">FAQ</Link>
          </div>
          <div className="space-y-2 text-sm opacity-90">
            <p className="font-display text-base">Services</p>
            <Link to="/tours" className="block hover:text-accent">Safaris & group departures</Link>
            <Link to="/experiences" className="block hover:text-accent">Niche experiences</Link>
            <Link to="/transport" className="block hover:text-accent">Airport transfers & vehicle hire</Link>
            <Link to="/stays" className="block hover:text-accent">Lodge & hotel booking</Link>
            <Link to="/support" className="block hover:text-accent">24/7 travel support</Link>
          </div>
          <div className="space-y-2 text-sm opacity-90">
            <p className="font-display text-base">Contact</p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-accent"><Phone className="h-4 w-4" />{PHONE}</a>
            <a href={waLink()} className="flex items-center gap-2 hover:text-accent"><MessageCircle className="h-4 w-4" />WhatsApp us</a>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />Nairobi, Kenya</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4" />Support 24/7</p>
          </div>
        </div>
        <p className="border-t border-secondary-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} Kridonelly Safaris · Nairobi, Kenya</p>
      </footer>
    </div>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) return <p className="mt-4 text-sm text-accent">Thanks for subscribing!</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-4 flex gap-2">
      <input required type="email" placeholder="Your email" className="w-full rounded-full bg-secondary-foreground/10 px-4 py-2 text-sm placeholder:text-secondary-foreground/60" />
      <button className="rounded-full bg-sunset px-4 text-sm font-semibold text-primary-foreground">Join</button>
    </form>
  );
}

export function PageHero({ title, sub, img: src }: { title: string; sub: string; img: string }) {
  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 text-primary-foreground">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-90">{sub}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 h-1 w-10 bg-sunset" />
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <Link to="/tours/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={img(p.image, 700)} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {p.badge && <span className="absolute left-3 top-3 rounded-full bg-sunset px-3 py-1 text-xs font-bold text-primary-foreground">{p.badge}</span>}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{p.days} {p.days === 1 ? "day" : "days"} · {p.destination}</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{p.rating}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-secondary">{p.title}</h3>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-sm text-muted-foreground">From <span className="text-xl font-bold text-primary">${p.priceFrom}</span> pp</p>
          <span className="text-sm font-semibold text-primary group-hover:underline">View details →</span>
        </div>
      </div>
    </Link>
  );
}

export function CTABanner({ title, sub, to = "/plan-my-trip", label = "Plan My Trip" }: { title: string; sub?: string; to?: "/plan-my-trip" | "/contact"; label?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-3xl bg-sunset px-6 py-14 text-center text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        {sub && <p className="mx-auto mt-3 max-w-xl opacity-90">{sub}</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={to} className="rounded-full bg-background px-6 py-3 font-semibold text-primary">{label}</Link>
          <a href={waLink()} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/70 px-6 py-3 font-semibold">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}

export function TestimonialCard({ name, country, text }: { name: string; country: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
      <p className="mt-4 italic text-foreground/85">"{text}"</p>
      <p className="mt-4 font-semibold text-secondary">{name}</p>
      <p className="text-sm text-muted-foreground">{country}</p>
    </div>
  );
}

export type Field = { name: string; label: string; type?: string; options?: string[]; required?: boolean };

/** Sends the filled form to WhatsApp as a pre-written message. */
export function EnquiryForm({ topic, fields, submitLabel = "Send enquiry" }: { topic: string; fields?: Field[]; submitLabel?: string }) {
  const [sent, setSent] = useState(false);
  const f: Field[] = fields ?? [
    { name: "Name", label: "Your name", required: true },
    { name: "Email", label: "Email", type: "email", required: true },
    { name: "Phone / WhatsApp", label: "Phone / WhatsApp" },
    { name: "Travel dates", label: "Travel dates", type: "date" },
    { name: "Travellers", label: "Number of travellers", type: "number" },
    { name: "Message", label: "Tell us about your trip", type: "textarea" },
  ];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = f.map((x) => `${x.name}: ${data.get(x.name) || "-"}`);
    window.open(waLink(`Hi Kridonelly Safaris, enquiry about: ${topic}\n${lines.join("\n")}`), "_blank");
    setSent(true);
  }
  if (sent) return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <p className="font-display text-2xl text-secondary">Thank you!</p>
      <p className="mt-2 text-muted-foreground">Your enquiry has been prepared in WhatsApp. Press send there and our travel designer will reply within 24 hours.</p>
      <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-primary">Send another</button>
    </div>
  );
  const cls = "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm";
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2">
      {f.map((x) => (
        <label key={x.name} className={`text-sm font-medium ${x.type === "textarea" ? "sm:col-span-2" : ""}`}>
          {x.label}
          {x.type === "textarea" ? <textarea name={x.name} rows={4} className={cls} required={x.required} />
            : x.options ? <select name={x.name} className={cls} required={x.required}>{x.options.map((o) => <option key={o}>{o}</option>)}</select>
            : <input name={x.name} type={x.type ?? "text"} min={x.type === "number" ? 1 : undefined} className={cls} required={x.required} />}
        </label>
      ))}
      <button className="rounded-full bg-sunset px-6 py-3 font-semibold text-primary-foreground sm:col-span-2">{submitLabel}</button>
      <p className="text-xs text-muted-foreground sm:col-span-2">Submitting opens WhatsApp with your details filled in. Prefer email or a call? <Mail className="inline h-3 w-3" /> Reach us on {PHONE}.</p>
    </form>
  );
}

export function InfoCards({ items }: { items: { title: string; text: string }[] }) {
  return <div className="grid gap-5 md:grid-cols-3">{items.map((i) => <Card key={i.title} {...i} />)}</div>;
}
