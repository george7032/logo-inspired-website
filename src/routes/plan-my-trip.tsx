import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Gift, Headphones } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { waLink } from "@/lib/packages";
import { meta } from "@/lib/meta";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/plan-my-trip")({
  head: () => meta("Plan My Trip — Free Custom Safari Quote | Kridonelly Safaris", "Tell us about your dream Kenya trip in five quick steps and get a free, no-obligation custom itinerary within 24 hours."),
  component: Plan,
});

const steps = ["Trip type", "Interests", "Dates & pace", "Budget & travellers", "Contact"];

function Plan() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [d, setD] = useState({ type: "", interests: [] as string[], flexible: false, date: "", length: "5", pace: "Balanced", budget: 1500, adults: 2, children: 0, ages: "", stay: "Mid-range", name: "", email: "", phone: "", country: "", notes: "" });
  const set = (k: keyof typeof d, v: unknown) => setD({ ...d, [k]: v });
  const chip = (v: string, on: boolean, click: () => void) => <button type="button" key={v} onClick={click} className={`rounded-full border px-4 py-2 text-sm font-semibold ${on ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{v}</button>;
  const input = "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2";

  function submit() {
    const msg = `Hi Kridonelly Safaris, please plan my trip:
Trip type: ${d.type}
Interests: ${d.interests.join(", ")}
Dates: ${d.flexible ? "Flexible" : d.date} · ${d.length} days · ${d.pace}
Budget: $${d.budget} pp · ${d.adults} adults, ${d.children} children ${d.ages}
Stay style: ${d.stay}
Name: ${d.name} · ${d.email} · ${d.phone} · ${d.country}
Requests: ${d.notes}`;
    window.open(waLink(msg), "_blank");
    setDone(true);
  }

  const canNext = [d.type, d.interests.length, true, true, d.name && d.email][step];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-center text-4xl font-bold text-secondary">Plan My Trip</h1>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary" />No obligation</span>
          <span className="flex items-center gap-1"><Gift className="h-4 w-4 text-primary" />Free custom quote</span>
          <span className="flex items-center gap-1"><Headphones className="h-4 w-4 text-primary" />24/7 support</span>
        </div>
        {done ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center shadow">
            <p className="font-display text-2xl text-secondary">Thank you, {d.name.split(" ")[0]}!</p>
            <p className="mt-3 text-muted-foreground">Your trip details are ready in WhatsApp — press send there. Our travel designer will reply within 24 hours.</p>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow sm:p-8">
            <p className="text-sm font-semibold text-primary">Step {step + 1} of 5 · {steps[step]}</p>
            <Progress value={((step + 1) / 5) * 100} className="mt-2" />
            <div className="mt-8 min-h-[220px]">
              {step === 0 && <div className="flex flex-wrap gap-3">{["Honeymoon", "Family", "Friends", "Solo", "Corporate", "Special occasion"].map((t) => chip(t, d.type === t, () => set("type", t)))}</div>}
              {step === 1 && <div className="flex flex-wrap gap-3">{["Wildlife", "Beach", "Mountains", "Culture", "Photography", "Food"].map((t) => chip(t, d.interests.includes(t), () => set("interests", d.interests.includes(t) ? d.interests.filter((x) => x !== t) : [...d.interests, t])))}</div>}
              {step === 2 && <div className="grid gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={d.flexible} onChange={(e) => set("flexible", e.target.checked)} />My dates are flexible</label>
                {!d.flexible && <label>Start date<input type="date" value={d.date} onChange={(e) => set("date", e.target.value)} className={input} /></label>}
                <label>Trip length (days)<input type="number" min={1} value={d.length} onChange={(e) => set("length", e.target.value)} className={input} /></label>
                <div className="flex flex-wrap gap-3">{["Relaxed", "Balanced", "Action-packed"].map((p) => chip(p, d.pace === p, () => set("pace", p)))}</div>
              </div>}
              {step === 3 && <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">Budget per person: <b className="text-primary">${d.budget.toLocaleString()}</b><input type="range" min={300} max={10000} step={100} value={d.budget} onChange={(e) => set("budget", +e.target.value)} className="mt-2 w-full accent-[var(--primary)]" /></label>
                <label>Adults<input type="number" min={1} value={d.adults} onChange={(e) => set("adults", +e.target.value)} className={input} /></label>
                <label>Children<input type="number" min={0} value={d.children} onChange={(e) => set("children", +e.target.value)} className={input} /></label>
                {d.children > 0 && <label className="sm:col-span-2">Children's ages<input value={d.ages} onChange={(e) => set("ages", e.target.value)} className={input} /></label>}
                <label className="sm:col-span-2">Accommodation style<select value={d.stay} onChange={(e) => set("stay", e.target.value)} className={input}><option>Budget</option><option>Mid-range</option><option>Luxury</option></select></label>
              </div>}
              {step === 4 && <div className="grid gap-4 sm:grid-cols-2">
                <label>Name *<input value={d.name} onChange={(e) => set("name", e.target.value)} className={input} /></label>
                <label>Email *<input type="email" value={d.email} onChange={(e) => set("email", e.target.value)} className={input} /></label>
                <label>Phone / WhatsApp<input value={d.phone} onChange={(e) => set("phone", e.target.value)} className={input} /></label>
                <label>Country<input value={d.country} onChange={(e) => set("country", e.target.value)} className={input} /></label>
                <label className="sm:col-span-2">Special requests<textarea rows={3} value={d.notes} onChange={(e) => set("notes", e.target.value)} className={input} /></label>
              </div>}
            </div>
            <div className="mt-8 flex justify-between">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-input px-6 py-2 font-semibold disabled:opacity-40">Back</button>
              {step < 4
                ? <button disabled={!canNext} onClick={() => setStep(step + 1)} className="rounded-full bg-sunset px-6 py-2 font-semibold text-primary-foreground disabled:opacity-40">Next</button>
                : <button disabled={!canNext} onClick={submit} className="rounded-full bg-sunset px-6 py-2 font-semibold text-primary-foreground disabled:opacity-40">Send my trip request</button>}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
