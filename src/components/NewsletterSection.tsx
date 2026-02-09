import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! New listings, delivered first.");
      setEmail("");
    }
  };

  return (
    <section className="luxury-section-dark py-24">
      <div className="container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Stay Informed
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
            Get New Listings First
          </h2>
          <p className="text-white/50 text-sm mt-3 mb-8 font-light">
            Be the first to discover our latest premium spaces and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors font-light"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3.5 rounded text-sm font-medium hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2 tracking-wide"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
