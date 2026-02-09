import { Home, Clock, Star, Wifi, UtensilsCrossed, ShieldCheck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-apartments.jpg";

const ShortTermApartments = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Short-term & Serviced Apartments"
    heroSubtitle="Hotel-grade luxury meets the comfort of home. Experience premium temporary living in Nigeria's finest locations."
    introLabel="What We Offer"
    introTitle="Your Home Away From Home"
    introText="Experience the perfect blend of luxury and convenience with our serviced apartments. Ideal for business travelers, vacationers, and anyone seeking premium temporary living in Nigeria's finest locations."
    introText2="Every unit is meticulously designed with modern furnishings, high-speed internet, and 24/7 concierge support to ensure your stay is nothing short of exceptional."
    features={[
      { icon: Home, title: "Fully Furnished", text: "Move in with nothing but your luggage. Our apartments come fully equipped with modern furnishings, linens, and essentials." },
      { icon: Clock, title: "Flexible Stays", text: "Whether it's a weekend getaway or a month-long business trip, our flexible booking caters to your schedule." },
      { icon: Star, title: "5-Star Standards", text: "Hotel-grade amenities with the comfort and privacy of your own space—the best of both worlds." },
      { icon: Wifi, title: "High-Speed Connectivity", text: "Stay connected with reliable high-speed internet, smart TVs, and modern tech throughout every unit." },
      { icon: UtensilsCrossed, title: "Kitchen & Dining", text: "Cook your own meals or enjoy our curated dining options. Every apartment features a modern, fully-stocked kitchen." },
      { icon: ShieldCheck, title: "24/7 Security", text: "Rest easy with round-the-clock security, CCTV surveillance, and secure access control in every property." },
    ]}
    stats={[
      { value: "200+", label: "Apartments Available" },
      { value: "4.9★", label: "Average Rating" },
      { value: "10K+", label: "Happy Guests" },
      { value: "24/7", label: "Concierge Service" },
    ]}
    processTitle="Booking Made Simple"
    processSubtitle="How It Works"
    processSteps={[
      { step: "01", title: "Browse & Select", description: "Explore our curated collection of serviced apartments by location, size, and amenities." },
      { step: "02", title: "Book Instantly", description: "Reserve your apartment with flexible dates and transparent pricing—no hidden fees." },
      { step: "03", title: "Check In", description: "Arrive to a spotlessly clean, fully prepared apartment with a personalized welcome package." },
      { step: "04", title: "Enjoy Your Stay", description: "Relax with 24/7 support, housekeeping, and concierge services throughout your stay." },
    ]}
    quote="Better than any hotel I've stayed in. The apartment was stunning, the location perfect, and the service impeccable."
    quoteAuthor="— Business Traveler"
    ctaTitle="Book Your Perfect Stay"
    ctaText="Discover serviced apartments that redefine comfort and convenience."
  />
);

export default ShortTermApartments;
