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
    <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
      <img src={heroImage} alt="About Comfyville" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary-foreground/70 text-xs tracking-widest uppercase mb-2">Our Story</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">About Comfyville</h1>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="container py-20 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Why Comfyville?</h2>
        <p className="text-muted-foreground leading-relaxed">
          We believe that where you stay should never be a compromise. Comfyville was born from a simple idea: everyone deserves luxury they can trust. We bridge the gap between premium hospitality and accessible short-stay living — offering verified, beautifully designed spaces that give you your money's worth, every single time.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Whether you're a traveler seeking a memorable stay or an investor looking for premium property opportunities, Comfyville delivers a world-class experience from booking to checkout.
        </p>
      </motion.div>
    </section>

    {/* Values */}
    <section className="bg-secondary py-20">
      <div className="container">
        <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-12">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 text-center border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
