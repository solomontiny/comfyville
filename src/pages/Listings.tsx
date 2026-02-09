import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { listings } from "@/data/listings";
import ListingCard from "@/components/ListingCard";

const types = ["all", "villa", "penthouse", "apartment", "cabin", "studio"] as const;

const Listings = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase());
      const matchType = type === "all" || l.type === type;
      const matchPrice = l.price <= maxPrice;
      return matchSearch && matchType && matchPrice;
    });
  }, [search, type, maxPrice]);

  return (
    <main className="pt-20 md:pt-24">
      {/* Page header */}
      <section className="luxury-section-dark py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">
              Our Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white">
              Explore Spaces
            </h1>
            <p className="text-white/40 text-sm mt-3 font-light">
              {filtered.length} {filtered.length === 1 ? "space" : "spaces"} available
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 pb-8 border-b border-border">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2.5 rounded text-xs font-medium capitalize tracking-wide transition-all duration-300 ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "all" ? "All Types" : t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={14} className="text-muted-foreground" />
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 accent-primary"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap font-light">
              ≤ ${maxPrice}/night
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground font-light">
              No spaces match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Listings;
