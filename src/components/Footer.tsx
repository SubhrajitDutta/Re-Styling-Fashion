import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Twitter, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blush-grad grid place-items-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold">re/styling</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Pre-loved fashion for the next generation. Buy. Rent. Donate. Slay.
          </p>
          <div className="flex gap-2 mt-4">
            {[Instagram, Twitter, Music2].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full glass hover:bg-white/10">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Shop", links: [["Buy", "/shop"], ["Rent", "/shop"], ["New drops", "/shop"]] },
          { title: "Community", links: [["Sell", "/sell"], ["Donate", "/donate"], ["Wallet", "/dashboard"]] },
          { title: "Legal", links: [["Privacy", "/policies"], ["Terms", "/policies"], ["Rental policy", "/policies"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-widest text-gradient-gold">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([l, to]) => (
                <li key={l}><Link to={to} className="text-sm text-muted-foreground hover:text-foreground">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 re/styling — circular fashion, infinite vibes.
      </div>
    </footer>
  );
}
