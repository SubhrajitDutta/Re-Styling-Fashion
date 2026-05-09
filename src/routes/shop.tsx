import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X } from "lucide-react";
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
const COLORS = [
  { name: "Black", hex: "#000" },
  { name: "White", hex: "#fff" },
  { name: "Red", hex: "#dc2626" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Green", hex: "#16a34a" },
  { name: "Yellow", hex: "#facc15" },
  { name: "Pink", hex: "#ec4899" },
];
const BRANDS = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand))).sort();
const SORTS = [
  { id: "trending", label: "Trending" },
  { id: "price-asc", label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
  { id: "name", label: "Name A–Z" },
] as const;

function Shop() {
  const [cat, setCat] = useState("All");
  const [mode, setMode] = useState<"all" | "buy" | "rent">("all");
  const [size, setSize] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<typeof SORTS[number]["id"]>("trending");
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    let list = MOCK_PRODUCTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (mode === "rent" && !p.rentPerDay) return false;
      if (mode === "buy" && p.rentPerDay && p.price === 0) return false;
      if (size && p.size !== size) return false;
      if (condition && p.condition !== condition) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      if (query && !`${p.title} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [cat, mode, size, condition, brand, maxPrice, query, sort]);

  const activeChips: { label: string; clear: () => void }[] = [];
  if (cat !== "All") activeChips.push({ label: cat, clear: () => setCat("All") });
  if (size) activeChips.push({ label: `Size ${size}`, clear: () => setSize(null) });
  if (condition) activeChips.push({ label: condition, clear: () => setCondition(null) });
  if (brand) activeChips.push({ label: brand, clear: () => setBrand(null) });
  if (color) activeChips.push({ label: color, clear: () => setColor(null) });
  if (maxPrice < 10000) activeChips.push({ label: `≤ ₹${maxPrice}`, clear: () => setMaxPrice(10000) });

  const reset = () => {
    setCat("All"); setMode("all"); setSize(null); setCondition(null);
    setBrand(null); setColor(null); setMaxPrice(10000); setQuery("");
  };

  const Filters = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-bold">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </div>
        <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground underline">Reset</button>
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
          {CONDITIONS.map((c) => (
            <Pill key={c} active={condition === c} onClick={() => setCondition(condition === c ? null : c)}>{c}</Pill>
          ))}
        </div>
      </Group>

      <Group title="Brand">
        <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
          {BRANDS.map((b) => (
            <Pill key={b} active={brand === b} onClick={() => setBrand(brand === b ? null : b)}>{b}</Pill>
          ))}
        </div>
      </Group>

      <Group title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(color === c.name ? null : c.name)}
              title={c.name}
              className={`w-8 h-8 rounded-full border-2 transition hover:scale-110 ${color === c.name ? "border-primary ring-2 ring-primary/40" : "border-white/20"}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </Group>

      <Group title={`Max Price · ₹${maxPrice}`}>
        <input
          type="range" min={500} max={10000} step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>₹500</span><span>₹10,000</span>
        </div>
      </Group>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl">Shop the <span className="text-gradient">Drop</span></h1>
        <p className="text-muted-foreground mt-2">Pre-loved. Premium. Yours for a day or forever.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="px-4 py-3 rounded-2xl glass border border-border text-sm outline-none focus:border-primary"
        >
          {SORTS.map((s) => <option key={s.id} value={s.id} className="bg-background">{s.label}</option>)}
        </select>
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blush-grad text-white text-sm font-semibold"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeChips.map((c) => (
            <button key={c.label} onClick={c.clear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush-grad text-white text-xs font-semibold">
              {c.label} <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block glass rounded-3xl p-6 h-fit lg:sticky lg:top-20">
          {Filters}
        </aside>

        <div>
          <div className="text-xs text-muted-foreground mb-4">{items.length} items</div>
          {items.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="font-display font-bold text-xl mb-1">No fits match your filters</div>
              <p className="text-sm text-muted-foreground mb-4">Try widening the price or clearing a filter.</p>
              <button onClick={reset} className="px-5 py-2.5 rounded-full bg-blush-grad text-white text-sm font-semibold">Reset Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {items.map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border p-6 overflow-auto">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full glass">
              <X className="w-4 h-4" />
            </button>
            {Filters}
            <button onClick={() => setOpen(false)} className="mt-6 w-full px-5 py-3 rounded-2xl bg-blush-grad text-white font-semibold">
              Show {items.length} Items
            </button>
          </div>
        </div>
      )}
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
