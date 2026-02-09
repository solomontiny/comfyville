import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Users, Bed, Bath, MessageCircle, ArrowLeft, Check } from "lucide-react";
import { listings } from "@/data/listings";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  if (!listing) {
    return (
      <main className="pt-20 container py-20 text-center">
        <h1 className="font-display text-2xl text-foreground">Listing not found</h1>
        <Link to="/listings" className="text-primary text-sm mt-4 inline-block hover:underline">
          ← Back to all spaces
        </Link>
      </main>
    );
  }

  const tomorrow = addDays(startOfDay(new Date()), 1);
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const total = nights * listing.price;

  const whatsappUrl = `https://wa.me/${listing.whatsapp.replace("+", "")}?text=${encodeURIComponent(
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
      <div className="container py-8">
        <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> All Spaces
        </Link>

        {/* Gallery */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 aspect-[16/10] rounded-xl overflow-hidden">
            <img src={listing.images[selectedImage]} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex md:flex-col gap-3">
            {listing.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`flex-1 rounded-xl overflow-hidden border-2 transition-colors ${
                  i === selectedImage ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover aspect-[4/3] md:aspect-auto" />
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MapPin size={14} />
                {listing.location}
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">{listing.title}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Bed size={14} /> {listing.beds} beds</span>
                <span className="flex items-center gap-1"><Bath size={14} /> {listing.baths} baths</span>
                <span className="flex items-center gap-1"><Users size={14} /> {listing.guests} guests</span>
                <span className="flex items-center gap-1"><Star size={14} className="text-primary fill-primary" /> {listing.rating} ({listing.reviews})</span>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">About this space</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{listing.description}</p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {listing.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-muted px-5 py-3 rounded-lg hover:bg-muted/80 transition-colors"
            >
              <MessageCircle size={16} className="text-primary" />
              Message on WhatsApp
            </a>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-5">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-semibold text-foreground">${listing.price}</span>
                <span className="text-muted-foreground text-sm">/ night</span>
              </div>

              <div>
                <p className="text-xs font-medium text-foreground mb-2">Check-in</p>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(d) => {
                    setCheckIn(d);
                    if (checkOut && d && !isBefore(d, checkOut)) setCheckOut(undefined);
                  }}
                  disabled={(date) => isBefore(date, tomorrow)}
                  className="rounded-lg border border-border pointer-events-auto"
                />
              </div>

              {checkIn && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Check-out</p>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => isBefore(date, addDays(checkIn, 1))}
                    className="rounded-lg border border-border pointer-events-auto"
                  />
                </div>
              )}

              {nights > 0 && (
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
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
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {listing.available ? "Request to Book" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListingDetail;
