import { Palette, Sofa, Lamp, Ruler, Gem, PaintBucket } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-interior.jpg";

const LuxuryInterior = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Luxury Interior & Design"
    heroSubtitle="Transforming spaces into masterpieces. Where vision meets craftsmanship and every detail tells your story."
    introLabel="What We Offer"
    introTitle="Spaces That Inspire"
    introText="Transform any property into a work of art. Our interior design team blends contemporary trends with timeless elegance, creating spaces that are as functional as they are breathtaking."
    introText2="From initial concept to final installation, we manage every element—color palettes, material sourcing, custom furniture, lighting design, and spatial planning—with meticulous attention to detail."
    features={[
      { icon: Palette, title: "Bespoke Design", text: "Custom interior concepts that reflect your personality, lifestyle, and the character of your space." },
      { icon: Sofa, title: "Furniture Curation", text: "Access exclusive furniture collections and custom pieces from local artisans and international brands." },
      { icon: Lamp, title: "Lighting Design", text: "Strategic lighting plans that create ambience, highlight architectural features, and enhance daily living." },
      { icon: Ruler, title: "Space Planning", text: "Maximize every square foot with intelligent layouts that balance aesthetics with functionality." },
      { icon: PaintBucket, title: "Material Selection", text: "From premium finishes to sustainable materials, we guide you through choices that elevate your space." },
      { icon: Gem, title: "Luxury Finishing", text: "High-end detailing and finishing touches that transform properties into showpieces of refined living." },
    ]}
    stats={[
      { value: "120+", label: "Projects Completed" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "50+", label: "Brand Partners" },
      { value: "15+", label: "Award Nominations" },
    ]}
    processTitle="Design Process"
    processSubtitle="From Vision to Reality"
    processSteps={[
      { step: "01", title: "Inspiration & Brief", description: "We explore your style preferences, functional needs, and budget to create a comprehensive design brief." },
      { step: "02", title: "Concept Development", description: "Our designers create mood boards, 3D renders, and material samples for your review and approval." },
      { step: "03", title: "Procurement & Build", description: "We source materials, coordinate with contractors, and manage the entire build-out process." },
      { step: "04", title: "Styling & Handover", description: "Final styling, quality inspection, and a grand reveal of your beautifully transformed space." },
    ]}
    quote="They turned our empty apartment into a magazine-worthy sanctuary. Every corner has purpose and beauty."
    quoteAuthor="— Delighted Homeowner"
    ctaTitle="Transform Your Space"
    ctaText="Let our designers create an interior that reflects your vision and lifestyle."
  />
);

export default LuxuryInterior;
