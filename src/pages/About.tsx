import { motion } from "framer-motion";
import { Shield, Heart, Globe } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";

const values = [
  { icon: Shield, title: "Trust & Transparency", desc: "Every listing is verified. Every review is real. No hidden fees, no surprises." },
  { icon: Heart, title: "Curated Comfort", desc: "We handpick every space for quality, design, and that unmistakable Comfyville feeling." },
  { icon: Globe, title: "Global Standard", desc: "From Lagos to London, our properties meet the same exacting luxury standard." },
];

const About = () => (
  <main className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
      <img src={heroImage} alt="About Comfyville" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-primary mb-6"
          />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white">About Comfyville</h1>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="container py-24 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Our Mission</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">Why Comfyville?</h2>
        <div className="luxury-divider mb-8" />
        <p className="text-muted-foreground leading-relaxed font-light text-base">
          We believe that where you stay should never be a compromise. Comfyville was born from a simple idea: everyone deserves luxury they can trust. We bridge the gap between premium hospitality and accessible short-stay living — offering verified, beautifully designed spaces that give you your money's worth, every single time.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4 font-light text-base">
          Whether you're a traveler seeking a memorable stay or an investor looking for premium property opportunities, Comfyville delivers a world-class experience from booking to checkout.
        </p>
      </motion.div>
    </section>

    {/* Values */}
    <section className="luxury-section-dark py-24">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Our Values</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">What We Stand For</h2>
          <div className="luxury-divider mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
