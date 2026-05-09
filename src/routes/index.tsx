import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Recycle, Coins, Zap, TrendingUp } from "lucide-react";
import { ProductCard, MOCK_PRODUCTS } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Re-Stylin — buy, rent, donate pre-loved fashion" },
      { name: "description", content: "Circular fashion marketplace for Gen Z. Rent that party fit. Sell your closet. Donate and earn points." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blush-grad opacity-30 blur-3xl animate-blob" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-hero opacity-40 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-24 pb-16 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-widest"
            >
              <Sparkles className="w-3 h-3 text-gradient-gold" /> Drop 02 · Live Now
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-6 font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9]"
            >
              Wear It<br />
              <span className="text-gradient">Once.</span><br />
              Love It <span className="text-gradient-gold">Always.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-muted-foreground max-w-md"
            >
              Rent the fit for tonight's party. Sell what you've outgrown. Donate and earn ₹ in your wallet. Fashion that loops.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/shop" className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-blush-grad text-white font-semibold glow hover:scale-105 transition">
                Shop the drop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/sell" className="px-6 py-3.5 rounded-full glass font-semibold hover:bg-white/10 transition">
                Sell your closet
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "12K+", l: "fits listed" },
                { n: "₹2L+", l: "donated value" },
                { n: "98%", l: "happy resellers" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-display font-extrabold text-gradient-gold">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="relative aspect-square max-w-lg mx-auto"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-3">
              {MOCK_PRODUCTS.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}
                  className={`relative rounded-3xl overflow-hidden glass ${i % 2 ? "mt-8" : ""}`}
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl">three vibes, <span className="text-gradient">one closet</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Rent for the night", desc: "Borrow that look for ₹99–₹399/day. Return it. Repeat the slay.", to: "/shop", grad: "bg-blush-grad" },
            { icon: TrendingUp, title: "Sell your closet", desc: "Upload, price, ship. Make money from clothes you don't wear.", to: "/sell", grad: "bg-hero" },
            { icon: Recycle, title: "Donate & earn", desc: "Give clothes to those in need. Get 5 points per item. 5 pts = ₹1.", to: "/donate", grad: "bg-gold-grad" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass rounded-3xl p-8 overflow-hidden hover:glow transition"
            >
              <div className={`w-14 h-14 rounded-2xl ${c.grad} grid place-items-center mb-5 group-hover:scale-110 transition`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <Link to={c.to} className="inline-flex items-center gap-1 text-sm font-semibold text-gradient">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gradient-gold font-bold">curated for you</div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2">trending fits</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.slice(0, 8).map((p, i) => <ProductCard key={p.id} p={p} idx={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 md:p-16 noise">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold-grad opacity-30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display font-black text-4xl md:text-6xl text-white">closet full,<br /> wallet fuller.</h2>
            <p className="mt-4 text-white/80">Sell your first item this week and we'll boost your listing for free.</p>
            <Link to="/sell" className="inline-flex items-center gap-2 mt-6 px-6 py-3.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
              Start selling <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
