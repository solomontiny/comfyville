import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    <section className="bg-secondary py-20">
      <div className="container max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Get New Listings First
          </h2>
          <p className="text-muted-foreground text-sm mt-2 mb-6">
            Be the first to discover our latest premium spaces.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
