import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.jpg.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Tours" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="Kridonelly Safaris logo" className="h-14 w-14 rounded-full object-cover" />
            <span className="hidden font-display text-lg font-bold text-secondary sm:block">Kridonelly Safaris</span>
          </Link>
          <nav className="flex gap-4 text-sm font-semibold uppercase tracking-wider sm:gap-7">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          <div>
            <img src={logo.url} alt="" className="h-20 w-20 rounded-full object-cover" />
            <p className="mt-3 font-display tracking-widest text-accent">Discover the wild heart of Africa</p>
          </div>
          <div className="text-sm opacity-90 space-y-2">
            <p className="font-display text-base">Explore</p>
            {nav.map((n) => <Link key={n.to} to={n.to} className="block hover:text-accent">{n.label}</Link>)}
          </div>
          <div className="text-sm opacity-90 space-y-2">
            <p className="font-display text-base">Get in touch</p>
            <p>24/7 on-ground support</p>
            <Link to="/contact" className="inline-block rounded bg-sunset px-4 py-2 font-semibold text-primary-foreground">Plan your safari</Link>
          </div>
        </div>
        <p className="border-t border-secondary-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} Kridonelly Safaris</p>
      </footer>
    </div>
  );
}

export function PageHero({ title, sub, img }: { title: string; sub: string; img: string }) {
  return (
    <section className="relative flex min-h-[45vh] items-end overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 text-primary-foreground">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-90">{sub}</p>
      </div>
    </section>
  );
}

export function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 h-1 w-10 bg-sunset" />
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
