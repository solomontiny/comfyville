import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, CheckCircle, Sparkles, Home, Clock } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";
import { listings } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  const featured = listings.filter((l) => l.available).slice(0, 3);

  return (
    <main>
      {/* Hero — Full viewport, dramatic overlay */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury living space"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        {/* Decorative gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[1px] bg-primary mb-8"
            />
            <p className="text-white/60 text-xs font-medium tracking-[0.35em] uppercase mb-6">
              Premium Short-Stays & Investments
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]">
              Your Money's{" "}
              <span className="italic font-light gold-gradient-text">Worth</span>
            </h1>
            <p className="text-white/50 mt-6 text-base md:text-lg max-w-md leading-relaxed font-light">
              Curated luxury spaces designed for comfort, style, and unforgettable experiences across the globe.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/listings"
                className="bg-primary text-primary-foreground px-8 py-4 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-3"
              >
                Book Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/listings"
                className="bg-white/5 backdrop-blur-sm text-white border border-white/15 px-8 py-4 rounded text-sm font-medium tracking-wide uppercase hover:bg-white/10 transition-all duration-300"
              >
                Explore Spaces
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-background">
        <div className="container py-6 flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {[
            { icon: Shield, label: "SSL Secured" },
            { icon: CheckCircle, label: "Verified Listings" },
            { icon: Star, label: "4.9 Avg Rating" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-muted-foreground">
              <Icon size={14} className="text-primary" />
              <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Comfyville */}
      <section className="container py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            The Comfyville Difference
          </h2>
          <div className="luxury-divider mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "Curated Excellence",
              desc: "Every space is handpicked and verified to meet our exacting luxury standards before it's listed.",
            },
            {
              icon: Home,
              title: "Global Properties",
              desc: "From beachfront villas to city penthouses — premium stays across the world's most coveted destinations.",
            },
            {
              icon: Clock,
              title: "Seamless Booking",
              desc: "Book in minutes with live availability, flexible cancellation, and dedicated concierge support.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="luxury-card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-2">Featured</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Handpicked Spaces
              </h2>
            </div>
            <Link
              to="/listings"
              className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors tracking-wide uppercase"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-6">Testimonial</p>
            <div className="flex justify-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-primary fill-primary" />
              ))}
            </div>
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-foreground leading-relaxed font-light">
              "Comfyville exceeded every expectation. The space was immaculate, the views breathtaking, and the booking process seamless."
            </blockquote>
            <div className="luxury-divider mx-auto my-6" />
            <p className="text-muted-foreground text-sm tracking-wide">— Sarah M., London</p>
          </motion.div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
};

export default Index;
