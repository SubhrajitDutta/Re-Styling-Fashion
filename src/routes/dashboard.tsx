import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Coins, Gift, Recycle, ShoppingBag, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Wallet — Re-Stylin" },
      { name: "description", content: "Track your Re-Styling Points and orders." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const points = 245;
  const inr = (points / 5).toFixed(0);

  const activity = [
    { icon: Recycle, label: "Donated 3 items", date: "May 2", points: "+15" },
    { icon: ShoppingBag, label: "Bought · Vintage Denim", date: "Apr 28", points: "-50" },
    { icon: Gift, label: "Welcome bonus", date: "Apr 20", points: "+100" },
    { icon: Recycle, label: "Donated 2 items", date: "Apr 12", points: "+10" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-16">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="font-display font-extrabold text-4xl md:text-6xl mb-8">
        your <span className="text-gradient">wallet</span>
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 relative overflow-hidden rounded-3xl bg-hero p-8 noise"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold-grad opacity-40 blur-3xl" />
          <div className="relative flex items-center gap-3 text-white/80 text-xs uppercase tracking-widest font-bold">
            <Coins className="w-4 h-4" /> Re-Styling Points
          </div>
          <div className="relative mt-4 flex items-baseline gap-3">
            <div className="font-display font-black text-7xl text-white">{points}</div>
            <div className="text-white/70">points</div>
          </div>
          <div className="relative text-gradient-gold font-display font-bold text-xl mt-2">≈ ₹{inr} to spend</div>
          <Link to="/shop" className="relative inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full bg-white text-black font-semibold text-sm">
            Redeem now
          </Link>
        </motion.div>

        <div className="space-y-4">
          {[
            { icon: Recycle, label: "Donations", value: "12" },
            { icon: ShoppingBag, label: "Orders", value: "5" },
            { icon: TrendingUp, label: "Active listings", value: "3" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blush-grad grid place-items-center">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-display font-extrabold text-2xl">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-6 md:p-8">
        <h2 className="font-display font-bold text-2xl mb-4">Recent activity</h2>
        <div className="divide-y divide-border">
          {activity.map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-xl glass grid place-items-center">
                <a.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{a.label}</div>
                <div className="text-xs text-muted-foreground">{a.date}</div>
              </div>
              <div className={`font-display font-extrabold ${a.points.startsWith("+") ? "text-gradient-gold" : "text-muted-foreground"}`}>
                {a.points}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
