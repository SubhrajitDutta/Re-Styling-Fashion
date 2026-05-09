import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Sparkles, User, Menu, X } from "lucide-react";
import { useState } from "react";

interface Props {
  onAuthClick: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop & Rent" },
  { to: "/sell", label: "Sell" },
  { to: "/donate", label: "Donate" },
  { to: "/dashboard", label: "Wallet" },
];

export function Navbar({ onAuthClick }: Props) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blush-grad grid place-items-center glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight">
            Re<span className="text-gradient">-</span>Stylin
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="navpill"
                    className="absolute inset-0 bg-blush-grad rounded-full opacity-20"
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:grid place-items-center w-10 h-10 rounded-full glass hover:bg-white/10 transition">
            <Heart className="w-4 h-4" />
          </button>
          <button className="grid place-items-center w-10 h-10 rounded-full glass hover:bg-white/10 transition relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] grid place-items-center bg-gold-grad text-black rounded-full font-bold">2</span>
          </button>
          <button
            onClick={onAuthClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blush-grad text-white text-sm font-semibold glow hover:scale-105 transition"
          >
            <User className="w-4 h-4" /> Sign in
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden grid place-items-center w-10 h-10 rounded-full glass">
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-border overflow-hidden"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); onAuthClick(); }}
              className="mt-2 px-4 py-3 rounded-xl bg-blush-grad text-white font-semibold"
            >
              Sign in
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
