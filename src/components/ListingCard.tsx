import { Link } from "react-router-dom";
import { Star, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Listing } from "@/data/listings";

const ListingCard = ({ listing, index = 0 }: { listing: Listing; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
  >
    <Link to={`/listings/${listing.id}`} className="group block luxury-card overflow-hidden rounded-lg">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {!listing.available && (
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-background text-foreground text-xs font-medium px-4 py-2 rounded tracking-wide uppercase">
              Fully Booked
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1">
          <Star size={11} className="text-primary fill-primary" />
          {listing.rating}
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin size={12} />
          <span className="text-xs tracking-wide uppercase font-light">{listing.location}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-sm font-semibold text-foreground">
            ${listing.price}{" "}
            <span className="text-muted-foreground font-light text-xs">/ night</span>
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Users size={12} />
            {listing.guests} guests
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ListingCard;
