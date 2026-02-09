import { Building2, Key, TrendingUp, Shield, MapPin, CheckCircle } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-sales.jpg";

const PropertySalesRentals = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Property Sales & Rentals"
    heroSubtitle="Premium real estate transactions powered by expertise, trust, and an unwavering commitment to your satisfaction."
    introLabel="What We Offer"
    introTitle="Find Your Perfect Property"
    introText="Whether you're looking to buy your dream home, sell a valuable asset, or find the perfect rental, Comfyville connects you with premium opportunities across Nigeria. Our expert team ensures every transaction is smooth, transparent, and rewarding."
    introText2="With deep market knowledge and a curated portfolio spanning residential, commercial, and mixed-use properties, we match the right people with the right spaces—every time."
    features={[
      { icon: Building2, title: "Premium Listings", text: "Access curated residential and commercial properties in prime Nigerian locations, handpicked for quality and value." },
      { icon: Key, title: "Hassle-Free Rentals", text: "From tenant screening to lease agreements, we handle the details so you enjoy seamless rental experiences." },
      { icon: TrendingUp, title: "Market-Driven Pricing", text: "Our pricing strategies are grounded in real-time market analysis, ensuring competitive yet fair deals." },
      { icon: Shield, title: "Verified Properties", text: "Every listing undergoes thorough verification—legal checks, structural inspections, and neighborhood assessments." },
      { icon: MapPin, title: "Prime Locations", text: "We focus on high-demand areas with strong appreciation potential, connectivity, and lifestyle amenities." },
      { icon: CheckCircle, title: "End-to-End Support", text: "From first viewing to final handover, our dedicated team guides you through every step of the process." },
    ]}
    stats={[
      { value: "500+", label: "Properties Sold" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "15+", label: "Prime Locations" },
      { value: "₦2B+", label: "Total Value Transacted" },
    ]}
    processTitle="How We Work"
    processSubtitle="Your Journey"
    processSteps={[
      { step: "01", title: "Consultation", description: "We begin with an in-depth consultation to understand your needs, budget, and preferred locations." },
      { step: "02", title: "Property Matching", description: "Our team curates a shortlist of verified properties that align perfectly with your requirements." },
      { step: "03", title: "Viewing & Inspection", description: "Schedule guided tours with our agents who provide honest insights about each property." },
      { step: "04", title: "Negotiation & Closing", description: "We handle pricing negotiations, legal documentation, and ensure a smooth handover process." },
    ]}
    quote="Comfyville didn't just find us a house—they found us a home. The process was seamless from start to finish."
    quoteAuthor="— A Satisfied Homeowner"
    ctaTitle="Ready to Find Your Dream Property?"
    ctaText="Let our experts guide you to the perfect home or investment opportunity."
  />
);

export default PropertySalesRentals;
