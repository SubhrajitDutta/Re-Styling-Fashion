import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  rentPerDay?: number;
  image: string;
  condition: "Like New" | "Good" | "Fair";
  size: string;
  category: string;
}

export function ProductCard({ p, idx = 0 }: { p: Product; idx?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-3xl overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <button className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full glass-strong hover:bg-blush-grad transition">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-grad text-black">
          {p.condition}
        </div>
        {p.rentPerDay && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold glass-strong">
            <Clock className="w-3 h-3" /> Rent ₹{p.rentPerDay}/day
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.brand} · {p.size}</div>
        <h3 className="font-display font-bold text-sm mt-1 line-clamp-1">{p.title}</h3>
        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="text-[10px] text-muted-foreground">Buy</div>
            <div className="font-display font-extrabold text-lg text-gradient">₹{p.price}</div>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-blush-grad text-xs font-semibold transition">
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", title: "Vintage Cropped Denim Jacket", brand: "Levi's", price: 1499, rentPerDay: 99, image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&q=80", condition: "Like New", size: "M", category: "Women" },
  { id: "2", title: "Silk Slip Dress Midnight", brand: "Zara", price: 2299, rentPerDay: 149, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80", condition: "Like New", size: "S", category: "Women" },
  { id: "3", title: "Oversized Graphic Tee", brand: "H&M", price: 599, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", condition: "Good", size: "L", category: "Men" },
  { id: "4", title: "Sherwani Royal Maroon", brand: "Manyavar", price: 4999, rentPerDay: 399, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", condition: "Like New", size: "M", category: "Men" },
  { id: "5", title: "Y2K Cargo Pants", brand: "Urban", price: 899, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80", condition: "Good", size: "M", category: "Women" },
  { id: "6", title: "Sequin Party Mini", brand: "Forever 21", price: 1799, rentPerDay: 199, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80", condition: "Like New", size: "S", category: "Women" },
  { id: "7", title: "Linen Kurta Cream", brand: "FabIndia", price: 1299, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80", condition: "Good", size: "L", category: "Men" },
  { id: "8", title: "Leather Biker Jacket", brand: "Roadster", price: 3499, rentPerDay: 249, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", condition: "Good", size: "M", category: "Men" },
];
