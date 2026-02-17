import { motion } from "framer-motion";
import { Eye, Target, Home, Award, Globe, Gem } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";

const missions = [
  {
    icon: Globe,
    text: "To be the leading brand in hospitality service, rental, and real estate in Nigeria and globally.",
  },
  {
    icon: Home,
    text: "To provide veritable options to help our clients make the best decisions with respect to hospitality and luxury living.",
  },
  {
    icon: Gem,
    text: "To provide the home-away-from-home ambience by approving only the most excellent, value-tested products and services.",
  },
  {
    icon: Award,
    text: "To deliver quality and innovative solutions to ensure absolute value.",
  },
];

const MissionVision = () => (
  <main className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
      <img src={heroImage} alt="Mission & Vision" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container px-5 md:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-primary mb-6"
          />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our Purpose</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white">Mission & Vision</h1>
        </motion.div>
      </div>
    </section>

    {/* Vision */}
    <section className="container px-5 md:px-8 py-16 md:py-24 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Eye size={22} className="text-primary" />
          </div>
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase">Our Vision</p>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
          Where We're Headed
        </h2>
        <div className="luxury-divider mb-8" />
        <blockquote className="font-display text-2xl md:text-3xl italic text-foreground leading-relaxed font-light border-l-2 border-primary pl-6">
          Giving access to the highest level of luxury and hospitality possible globally.
        </blockquote>
      </motion.div>
    </section>

    {/* Mission */}
    <section className="luxury-section-dark py-24">
      <div className="container px-5 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
              <Target size={22} className="text-primary" />
            </div>
          </div>
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Our Mission</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">What Drives Us</h2>
          <div className="luxury-divider mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {missions.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-8 border border-white/10 rounded-lg hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-5">
                <Icon size={20} className="text-primary" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed font-light">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default MissionVision;
