import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search } from "lucide-react";
import { ProductCard, MOCK_PRODUCTS } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop & Rent — Re-Stylin" },
      { name: "description", content: "Browse pre-loved fashion. Buy or rent for 1–2 days." },
    ],
  }),
  component: Shop,
});

const SIZES = ["XS", "S", "M", "L", "XL"];
const CATEGORIES = ["All", "Women", "Men"];
const CONDITIONS = ["Like New", "Good", "Fair"];
const COLORS = ["#000", "#fff", "#dc2626", "#2563eb", "#16a34a", "#facc15", "#ec4899"];

function Shop() {
  const [cat, setCat] = useState("All");
  const [mode, setMode] = useState<"all" | "buy" | "rent">("all");
  const [size, setSize] = useState<string | null>(null);

  const items = MOCK_PRODUCTS.filter((p) => {
    if (cat !== "All" && p.category !== cat) return false;
    if (mode === "rent" && !p.rentPerDay) return false;
    if (size && p.size !== size) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl">shop the <span className="text-gradient">drop</span></h1>
        <p className="text-muted-foreground mt-2">Pre-loved. Premium. Yours for a day or forever.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search drops, brands, vibes..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass border border-border outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex gap-2 glass rounded-2xl p-1">
          {(["all", "buy", "rent"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${mode === m ? "bg-blush-grad text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-20 space-y-6">
          <div className="flex items-center gap-2 font-display font-bold">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </div>

          <Group title="Category">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
              ))}
            </div>
          </Group>

          <Group title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Pill key={s} active={size === s} onClick={() => setSize(size === s ? null : s)}>{s}</Pill>
              ))}
            </div>
          </Group>

          <Group title="Condition">
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => <Pill key={c}>{c}</Pill>)}
            </div>
          </Group>

          <Group title="Color">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button key={c} className="w-8 h-8 rounded-full border-2 border-white/20 hover:scale-110 transition" style={{ background: c }} />
              ))}
            </div>
          </Group>

          <Group title="Price · ₹0 – ₹5000">
            <input type="range" min="0" max="5000" defaultValue="2500" className="w-full accent-primary" />
          </Group>

          <Group title="Fit">
            <div className="flex flex-wrap gap-2">
              {["Slim", "Regular", "Oversized", "Cropped"].map((f) => <Pill key={f}>{f}</Pill>)}
            </div>
          </Group>
        </aside>

        <div>
          <div className="text-xs text-muted-foreground mb-4">{items.length} items</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {items.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">{title}</div>
      {children}
    </div>
  );
}

function Pill({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${active ? "bg-blush-grad text-white" : "bg-white/5 hover:bg-white/10"}`}>
      {children}
    </button>
  );
}
