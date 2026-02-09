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
      <section className="container py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Explore Spaces
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {filtered.length} {filtered.length === 1 ? "space" : "spaces"} available
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
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
            <span className="text-xs text-muted-foreground whitespace-nowrap">≤ ${maxPrice}/night</span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No spaces match your filters. Try adjusting your search.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Listings;
