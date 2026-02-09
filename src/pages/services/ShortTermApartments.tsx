import { motion } from "framer-motion";
import { Home, Clock, Star, Wifi, UtensilsCrossed, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";

const features = [
  { icon: Home, title: "Fully Furnished", text: "Move in with nothing but your luggage. Our apartments come fully equipped with modern furnishings, linens, and essentials." },
  { icon: Clock, title: "Flexible Stays", text: "Whether it's a weekend getaway or a month-long business trip, our flexible booking caters to your schedule." },
  { icon: Star, title: "5-Star Standards", text: "Hotel-grade amenities with the comfort and privacy of your own space—the best of both worlds." },
  { icon: Wifi, title: "High-Speed Connectivity", text: "Stay connected with reliable high-speed internet, smart TVs, and modern tech throughout every unit." },
  { icon: UtensilsCrossed, title: "Kitchen & Dining", text: "Cook your own meals or enjoy our curated dining options. Every apartment features a modern, fully-stocked kitchen." },
  { icon: ShieldCheck, title: "24/7 Security", text: "Rest easy with round-the-clock security, CCTV surveillance, and secure access control in every property." },
];

const ShortTermApartments = () => (
  <main className="pt-20 md:pt-24">
    <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
      <img src={heroImage} alt="Short-term Apartments" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-6" />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our Services</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white">Short-term & Serviced Apartments</h1>
        </motion.div>
      </div>
    </section>

    <section className="container py-24 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">What We Offer</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">Your Home Away From Home</h2>
        <div className="luxury-divider mb-8" />
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          Experience the perfect blend of luxury and convenience with our serviced apartments. Ideal for business travelers, vacationers, and anyone seeking premium temporary living in Nigeria's finest locations.
        </p>
      </motion.div>
    </section>

    <section className="luxury-section-dark py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-5"><Icon size={20} className="text-primary" /></div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default ShortTermApartments;
