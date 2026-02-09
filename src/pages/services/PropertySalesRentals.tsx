import { motion } from "framer-motion";
import { Building2, Key, TrendingUp, Shield, MapPin, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";

const features = [
  { icon: Building2, title: "Premium Listings", text: "Access curated residential and commercial properties in prime Nigerian locations, handpicked for quality and value." },
  { icon: Key, title: "Hassle-Free Rentals", text: "From tenant screening to lease agreements, we handle the details so you enjoy seamless rental experiences." },
  { icon: TrendingUp, title: "Market-Driven Pricing", text: "Our pricing strategies are grounded in real-time market analysis, ensuring competitive yet fair deals." },
  { icon: Shield, title: "Verified Properties", text: "Every listing undergoes thorough verification—legal checks, structural inspections, and neighborhood assessments." },
  { icon: MapPin, title: "Prime Locations", text: "We focus on high-demand areas with strong appreciation potential, connectivity, and lifestyle amenities." },
  { icon: CheckCircle, title: "End-to-End Support", text: "From first viewing to final handover, our dedicated team guides you through every step of the process." },
];

const PropertySalesRentals = () => (
  <main className="pt-20 md:pt-24">
    <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
      <img src={heroImage} alt="Property Sales & Rentals" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-6" />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our Services</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white">Property Sales & Rentals</h1>
        </motion.div>
      </div>
    </section>

    <section className="container py-24 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">What We Offer</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">Find Your Perfect Property</h2>
        <div className="luxury-divider mb-8" />
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          Whether you're looking to buy your dream home, sell a valuable asset, or find the perfect rental, Comfyville connects you with premium opportunities across Nigeria. Our expert team ensures every transaction is smooth, transparent, and rewarding.
        </p>
      </motion.div>
    </section>

    <section className="luxury-section-dark py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-5">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default PropertySalesRentals;
