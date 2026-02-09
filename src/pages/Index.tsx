import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-1.jpg";
import { listings } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  const featured = listings.filter((l) => l.available).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury living space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-4">
              Premium Short-Stays & Investments
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              Your Money's <br />
              <span className="italic text-gold-light">Worth</span>
            </h1>
            <p className="text-primary-foreground/70 mt-4 text-base md:text-lg max-w-md leading-relaxed">
              Curated luxury spaces designed for comfort, style, and unforgettable experiences.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/listings"
                className="bg-primary text-primary-foreground px-7 py-3.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Book Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/listings"
                className="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 px-7 py-3.5 rounded-lg text-sm font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                Explore Spaces
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border">
        <div className="container py-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { icon: Shield, label: "SSL Secured" },
            { icon: CheckCircle, label: "Verified Listings" },
            { icon: Star, label: "4.9 Avg Rating" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <Icon size={16} className="text-primary" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-xs font-medium tracking-widest uppercase mb-1">Featured</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Handpicked Spaces
            </h2>
          </div>
          <Link
            to="/listings"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-secondary py-20">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <blockquote className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed">
              "Comfyville exceeded every expectation. The space was immaculate, the views breathtaking, and the booking process seamless."
            </blockquote>
            <p className="text-muted-foreground text-sm mt-4">— Sarah M., London</p>
          </motion.div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
};

export default Index;
