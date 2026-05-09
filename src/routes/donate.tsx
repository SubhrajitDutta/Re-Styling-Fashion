import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Coins, Truck, Gift, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate & earn — re-stylin" },
      { name: "description", content: "Donate clothes, earn 5 points each. 5 points = ₹1." },
    ],
  }),
  component: Donate,
});

function Donate() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="text-xs uppercase tracking-widest text-gradient-gold font-bold">section 03</div>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl mt-3">give. <span className="text-gradient">glow.</span> earn.</h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Donate clothing you no longer wear to families in need. Every item earns you 5 Re-Styling Points.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          { icon: Gift, title: "1. Pack it", desc: "Box up gently-used clothes. Min 3 items per pickup." },
          { icon: Truck, title: "2. We collect", desc: "Free doorstep pickup in 50+ cities." },
          { icon: Coins, title: "3. Earn points", desc: "5 points per item credited within 24 hrs of pickup." },
        ].map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-blush-grad grid place-items-center mb-4">
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 noise">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold-grad opacity-30 blur-3xl" />
          <Heart className="w-10 h-10 text-white mb-4" />
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">your closet, <br /> someone's smile.</h2>
          <p className="mt-4 text-white/80 max-w-md">Last year, our community donated 8,400+ items to NGOs across India.</p>
          <div className="mt-8 flex gap-6">
            <div>
              <div className="text-3xl font-display font-black text-white">8.4K</div>
              <div className="text-xs text-white/70">items donated</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-gradient-gold">42K</div>
              <div className="text-xs text-white/70">points earned</div>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="glass-strong rounded-3xl p-8 space-y-4">
          <h3 className="font-display font-bold text-2xl">Schedule a pickup</h3>
          <Input label="Full name" placeholder="Your name" />
          <Input label="Phone" type="tel" placeholder="+91 ..." />
          <Input label="Pickup address" placeholder="Street, city, pincode" />
          <Input label="Number of items" type="number" placeholder="3" />
          <textarea rows={3} placeholder="Any notes for our pickup partner..."
            className="w-full p-4 rounded-2xl bg-input/60 border border-border focus:border-primary outline-none text-sm resize-none" />
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gold-grad text-black font-semibold glow-gold hover:scale-[1.01] transition">
            Book free pickup <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
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
