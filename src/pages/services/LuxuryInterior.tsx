import { Palette, Sofa, Lamp, Ruler, Gem, PaintBucket, Box, Eye, Monitor } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import fallbackImage from "@/assets/service-interior.jpg";
import { useServiceImage } from "@/hooks/useServiceImages";

const LuxuryInterior = () => {
  const heroImage = useServiceImage("luxury-interior", fallbackImage);
  return (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Luxury Interiors & 3D Visualizations"
    heroSubtitle="Transforming spaces into masterpieces. From bespoke interiors to photorealistic 3D renders — see your dream space before it's built."
    introLabel="What We Offer"
    introTitle="Design Meets Technology"
    introText="We blend cutting-edge 3D visualization technology with world-class interior design. See your property come alive with photorealistic renders of both interiors and exteriors before a single material is sourced."
    introText2="From initial concept to final installation, we manage every element — color palettes, material sourcing, custom furniture, lighting design, spatial planning, and immersive 3D walkthroughs — with meticulous attention to detail."
    features={[
      { icon: Palette, title: "Bespoke Interior Design", text: "Custom interior concepts that reflect your personality, lifestyle, and the character of your space." },
      { icon: Box, title: "3D Interior Visualization", text: "Photorealistic 3D renders of your interior spaces — experience every room, texture, and finish before construction begins." },
      { icon: Eye, title: "3D Exterior Visualization", text: "Stunning exterior renders that showcase your building's architecture, landscaping, and street presence from every angle." },
      { icon: Sofa, title: "Furniture Curation", text: "Access exclusive furniture collections and custom pieces from local artisans and international brands." },
      { icon: Lamp, title: "Lighting Design", text: "Strategic lighting plans that create ambience, highlight architectural features, and enhance daily living." },
      { icon: Ruler, title: "Space Planning", text: "Maximize every square foot with intelligent layouts that balance aesthetics with functionality." },
      { icon: Monitor, title: "Virtual Walkthroughs", text: "Interactive 3D tours that let you walk through your future space and make informed design decisions." },
      { icon: PaintBucket, title: "Material Selection", text: "From premium finishes to sustainable materials, we guide you through choices that elevate your space." },
      { icon: Gem, title: "Luxury Finishing", text: "High-end detailing and finishing touches that transform properties into showpieces of refined living." },
    ]}
    stats={[
      { value: "120+", label: "Projects Completed" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "200+", label: "3D Renders Delivered" },
      { value: "15+", label: "Award Nominations" },
    ]}
    processTitle="Design & Visualization Process"
    processSubtitle="From Vision to Reality"
    processSteps={[
      { step: "01", title: "Inspiration & Brief", description: "We explore your style preferences, functional needs, and budget to create a comprehensive design brief." },
      { step: "02", title: "3D Concept & Renders", description: "Our team creates photorealistic 3D interior and exterior visualizations, mood boards, and material samples for your review." },
      { step: "03", title: "Refinement & Approval", description: "Refine every detail through interactive 3D walkthroughs until every element is exactly as you envision." },
      { step: "04", title: "Procurement & Build", description: "We source materials, coordinate with contractors, and manage the entire build-out process." },
      { step: "05", title: "Styling & Handover", description: "Final styling, quality inspection, and a grand reveal of your beautifully transformed space." },
    ]}
    quote="They showed us our dream home in 3D before a single brick was laid. The final result was identical to the renders — absolutely stunning."
    quoteAuthor="— Delighted Homeowner"
    ctaTitle="Visualize Your Dream Space"
    ctaText="Let our designers create photorealistic 3D renders and transform your vision into reality."
  />
  );
};

export default LuxuryInterior;
