import { createFileRoute } from "@tanstack/react-router";
import { Shield, RefreshCw, AlertTriangle, FileText } from "lucide-react";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [{ title: "Policies — re/styling" }],
  }),
  component: Policies,
});

const sections = [
  {
    icon: Shield,
    title: "Privacy Policy",
    body: "We collect only the data needed to deliver your orders and improve your experience. We never sell your personal information. Encrypted payments, GDPR-aligned data handling, full deletion on request.",
  },
  {
    icon: RefreshCw,
    title: "Return & Rental Policy",
    body: "Purchases: 7-day returns for unworn items with tags. Rentals: 1 or 2 day periods, return by 11 PM on the final day. Late returns are charged ₹100/day. Free dry-cleaning on every rental.",
  },
  {
    icon: AlertTriangle,
    title: "Damage Liability",
    body: "Renters are responsible for the items during the rental period. Minor wear is expected. If an item is returned damaged, stained beyond cleaning, or in poor condition, the renter is liable for the FULL market value of the item, charged to the payment method on file.",
  },
  {
    icon: FileText,
    title: "Terms of Service",
    body: "By using re/styling you agree to our community guidelines: honest listings, accurate condition labels, respectful interactions. Violations may result in account suspension. Points have no cash value outside the platform.",
  },
];

function Policies() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <h1 className="font-display font-extrabold text-4xl md:text-6xl mb-2">policies</h1>
      <p className="text-muted-foreground mb-10">Clear rules. No fine print.</p>
      <div className="space-y-4">
        {sections.map((s) => (
          <details key={s.title} className="glass rounded-3xl p-6 group">
            <summary className="flex items-center gap-3 cursor-pointer list-none">
              <div className="w-10 h-10 rounded-xl bg-blush-grad grid place-items-center">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl flex-1">{s.title}</h2>
              <span className="text-muted-foreground group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
