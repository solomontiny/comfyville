import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Users, Bed, Bath, MessageCircle, ArrowLeft, Check, CalendarDays, Heart } from "lucide-react";
import { listings } from "@/data/listings";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import AppointmentModal from "@/components/AppointmentModal";
import { useFavorites } from "@/hooks/useFavorites";
import ProductRating from "@/components/ProductRating";

const ADMIN_WHATSAPP = "09037098493";

const FavoriteButton = ({ listingId }: { listingId: string }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(listingId);
  return (
    <button
      onClick={() => toggleFavorite(listingId)}
      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={18} className={favorited ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
};

const ListingDetail = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  if (!listing) {
    return (
      <main className="pt-20 container py-20 text-center">
        <h1 className="font-display text-3xl text-foreground">Listing not found</h1>
        <Link to="/listings" className="text-primary text-sm mt-4 inline-block hover:underline">
          ← Back to all spaces
        </Link>
      </main>
    );
  }

  const tomorrow = addDays(startOfDay(new Date()), 1);
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const total = nights * listing.price;

  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
    `Hi, I'm interested in booking "${listing.title}" at Comfyville.${checkIn ? ` Check-in: ${checkIn.toLocaleDateString()}` : ""}${checkOut ? `, Check-out: ${checkOut.toLocaleDateString()}` : ""}`
  )}`;

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    toast.success("Booking request sent! We'll confirm via WhatsApp shortly.");
  };

  return (
    <main className="pt-20 md:pt-24">
      {/* Gallery Hero */}
      <section className="container px-5 md:px-8 py-6 md:py-8">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 tracking-wide uppercase"
        >
          <ArrowLeft size={14} /> All Spaces
        </Link>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 aspect-[16/10] rounded-lg overflow-hidden">
            <img
              src={listing.images[selectedImage]}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="flex md:flex-col gap-3">
            {listing.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-1 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === selectedImage ? "border-primary" : "border-transparent hover:border-primary/30"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover aspect-[4/3] md:aspect-auto" loading="lazy" />
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container px-5 md:px-8 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wide uppercase">
                  <MapPin size={12} />
                  {listing.location}
                </div>
                <FavoriteButton listingId={listing.id} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{listing.title}</h1>
              <div className="flex items-center gap-5 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Bed size={14} /> {listing.beds} beds</span>
                <span className="flex items-center gap-1.5"><Bath size={14} /> {listing.baths} baths</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {listing.guests} guests</span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-primary fill-primary" /> {listing.rating} ({listing.reviews})
                </span>
              </div>
            </div>

            <div className="luxury-divider" />

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">About this space</h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{listing.description}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {listing.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm text-muted-foreground bg-muted px-4 py-3 rounded">
                    <Check size={14} className="text-primary flex-shrink-0" />
                    <span className="font-light">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground border border-border px-6 py-3.5 rounded hover:border-primary hover:text-primary transition-all duration-300 tracking-wide"
              >
                <MessageCircle size={16} className="text-primary" />
                Message on WhatsApp
              </a>
              <button
                onClick={() => setAppointmentOpen(true)}
                className="inline-flex items-center gap-2.5 text-sm font-medium bg-primary text-primary-foreground px-6 py-3.5 rounded hover:bg-primary/90 transition-all duration-300 tracking-wide uppercase"
              >
                <CalendarDays size={16} />
                Schedule Viewing
              </button>
            </div>

            {/* Product Rating */}
            <div className="luxury-card p-6">
              <ProductRating
                listingId={listing.id}
                listingTitle={listing.title}
                currentRating={listing.rating}
                totalReviews={listing.reviews}
              />
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 luxury-card p-6 space-y-5">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold text-foreground">${listing.price}</span>
                <span className="text-muted-foreground text-sm font-light">/ night</span>
              </div>

              <div className="luxury-divider" />

              <div>
                <p className="text-xs font-medium text-foreground mb-2 tracking-wide uppercase">Check-in</p>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(d) => {
                    setCheckIn(d);
                    if (checkOut && d && !isBefore(d, checkOut)) setCheckOut(undefined);
                  }}
                  disabled={(date) => isBefore(date, tomorrow)}
                  className="rounded border border-border pointer-events-auto"
                />
              </div>

              {checkIn && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2 tracking-wide uppercase">Check-out</p>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => isBefore(date, addDays(checkIn, 1))}
                    className="rounded border border-border pointer-events-auto"
                  />
                </div>
              )}

              {nights > 0 && (
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground font-light">
                    <span>${listing.price} × {nights} nights</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBook}
                disabled={!listing.available}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {listing.available ? "Request to Book" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        listingId={listing.id}
        listingTitle={listing.title}
        whatsappNumber={ADMIN_WHATSAPP}
      />
    </main>
  );
};

export default ListingDetail;
