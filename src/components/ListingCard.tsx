import { Link } from "react-router-dom";
import { Star, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Listing } from "@/data/listings";

const ListingCard = ({ listing, index = 0 }: { listing: Listing; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Link to={`/listings/${listing.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {!listing.available && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-background text-foreground text-xs font-medium px-3 py-1.5 rounded-full">Fully Booked</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="text-primary fill-primary" />
          {listing.rating}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin size={13} />
          <span className="text-xs">{listing.location}</span>
        </div>
        <h3 className="font-display text-base font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-semibold text-foreground">
            ${listing.price} <span className="text-muted-foreground font-normal text-xs">/ night</span>
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
