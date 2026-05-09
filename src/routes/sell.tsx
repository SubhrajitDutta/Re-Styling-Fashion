import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Upload, Camera, Tag, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell your closet — re/styling" },
      { name: "description", content: "List pre-owned clothing in minutes." },
    ],
  }),
  component: Sell,
});

const CONDITIONS = ["Like New", "Good", "Fair"] as const;
const GENDERS = ["Women", "Men"] as const;
const TYPES = {
  Women: ["Western", "Ethnic", "Fusion", "Formals", "Party", "Sportswear"],
  Men: ["Formal", "Casual", "Ethnic", "Sportswear", "Streetwear"],
};

function Sell() {
  const [gender, setGender] = useState<typeof GENDERS[number]>("Women");
  const [condition, setCondition] = useState<typeof CONDITIONS[number]>("Like New");
  const [type, setType] = useState<string>("Western");
  const [photos, setPhotos] = useState<string[]>([]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))].slice(0, 6));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-xs uppercase tracking-widest text-gradient-gold font-bold">section 01</div>
        <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-2">sell your <span className="text-gradient">closet</span></h1>
        <p className="text-muted-foreground mt-2">Upload photos, set a vibe, set a price. We handle the rest.</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <form onSubmit={(e) => e.preventDefault()} className="glass-strong rounded-3xl p-6 md:p-8 space-y-6">
          {/* Photos */}
          <Section icon={Camera} title="Photos">
            <div className="grid grid-cols-3 gap-3">
              {photos.map((p, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                  <img src={p} className="w-full h-full object-cover" />
                </div>
              ))}
              {photos.length < 6 && (
                <label className="aspect-square rounded-2xl border-2 border-dashed border-border grid place-items-center cursor-pointer hover:bg-white/5 transition">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
                  <div className="text-center">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-[10px] text-muted-foreground">Add photo</div>
                  </div>
                </label>
              )}
            </div>
          </Section>

          {/* Gender */}
          <Section icon={Sparkles} title="Category">
            <div className="flex gap-2 mb-3">
              {GENDERS.map((g) => (
                <button key={g} type="button" onClick={() => { setGender(g); setType(TYPES[g][0]); }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold ${gender === g ? "bg-blush-grad text-white" : "glass"}`}>
                  {g}'s
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPES[gender].map((t) => (
                <button key={t} type="button" onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${type === t ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"}`}>
                  {t}
                </button>
              ))}
            </div>
          </Section>

          {/* Condition */}
          <Section title="Condition">
            <div className="grid grid-cols-3 gap-2">
              {CONDITIONS.map((c) => (
                <button key={c} type="button" onClick={() => setCondition(c)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold ${condition === c ? "bg-gold-grad text-black" : "glass"}`}>
                  {c}
                </button>
              ))}
            </div>
          </Section>

          {/* Title + price */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Title" placeholder="Vintage cropped jacket" />
            <Input label="Brand" placeholder="Levi's" />
            <Input label="Size" placeholder="M" />
            <Input label="Color" placeholder="Black" />
            <Input label="Sell price (₹)" type="number" placeholder="1499" />
            <Input label="Rent / day (₹) — optional" type="number" placeholder="99" />
          </div>

          <Section icon={Tag} title="Description">
            <textarea rows={4} placeholder="Tell buyers about the fit, the story, the vibe..."
              className="w-full p-4 rounded-2xl bg-input/60 border border-border focus:border-primary outline-none text-sm resize-none" />
          </Section>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blush-grad font-semibold glow hover:scale-[1.01] transition">
            List it <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <aside className="space-y-4">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-bold text-xl mb-3">Why sell here?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• 0% listing fee for your first 3 items</li>
              <li>• Get paid in 24 hrs after delivery</li>
              <li>• Optional rental — earn while you wait for a buyer</li>
              <li>• Boosted reach for verified sellers</li>
            </ul>
          </div>
          <div className="glass rounded-3xl p-6 bg-blush-grad/10">
            <div className="text-xs uppercase tracking-widest text-gradient-gold font-bold">Pro tip</div>
            <p className="text-sm mt-2">Natural daylight + a clean background = 3× faster sales. We're not joking.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon?: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest font-bold text-muted-foreground">
        {Icon && <Icon className="w-3.5 h-3.5" />} {title}
      </div>
      {children}
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...props} className="mt-1 w-full px-4 py-3 rounded-2xl bg-input/60 border border-border focus:border-primary outline-none text-sm" />
    </label>
  );
}
