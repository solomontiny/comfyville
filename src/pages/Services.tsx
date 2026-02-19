import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home, Settings, Landmark, Palette, GraduationCap } from "lucide-react";
import serviceSales from "@/assets/service-sales.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";
import serviceManagement from "@/assets/service-management.jpg";
import serviceLand from "@/assets/service-land.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceGuidance from "@/assets/service-guidance.jpg";

const services = [
  {
    icon: Building2,
    title: "Property Sales & Rentals",
    description: "Buy, sell, or rent premium properties across Nigeria with expert guidance and verified listings.",
    image: serviceSales,
    link: "/services/property-sales-rentals",
  },
  {
    icon: Home,
    title: "Short-term & Serviced Apartments",
    description: "Hotel-grade luxury meets home comfort. Fully furnished apartments for flexible stays.",
    image: serviceApartments,
    link: "/services/short-term-apartments",
  },
  {
    icon: Settings,
    title: "Property Management & Facility Care",
    description: "Comprehensive property oversight—from tenant management to maintenance and financial reporting.",
    image: serviceManagement,
    link: "/services/property-management",
  },
  {
    icon: Landmark,
    title: "Land & Investment Advisory",
    description: "Strategic land acquisition and investment guidance built on deep market intelligence.",
    image: serviceLand,
    link: "/services/land-investment",
  },
  {
    icon: Palette,
    title: "Luxury Interior & Design",
    description: "Transform spaces into masterpieces with bespoke design, premium materials, and expert craftsmanship.",
    image: serviceInterior,
    link: "/services/luxury-interior",
  },
  {
    icon: GraduationCap,
    title: "Investor & First-Time Buyer Guidance",
    description: "Expert support and education to help you make confident, well-informed real estate decisions.",
    image: serviceGuidance,
    link: "/services/investor-guidance",
  },
];

const Services = () => (
  <main className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="luxury-section-dark py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container px-5 md:px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-6 mx-auto" />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4">What We Do</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Our Services
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light mt-6 max-w-xl mx-auto">
            Comprehensive real estate solutions designed to protect your investment, elevate your lifestyle, and build lasting wealth.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="container px-5 md:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={service.link}
                className="group block luxury-card overflow-hidden h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-medium tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* CTA */}
    <section className="luxury-section-dark py-24">
      <div className="container px-5 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/60 font-light mb-8 max-w-md mx-auto">
            Our team is ready to help you find the perfect service for your needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded text-sm font-medium tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-300"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default Services;
