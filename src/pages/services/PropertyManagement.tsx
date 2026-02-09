import { Settings, Wrench, ClipboardList, Users, BarChart3, Sparkles } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-management.jpg";

const PropertyManagement = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Property Management & Facility Care"
    heroSubtitle="Protecting your investment while maximizing returns. We handle the details so you enjoy the rewards."
    introLabel="What We Offer"
    introTitle="We Take Care of Your Investment"
    introText="Owning property should be rewarding, not stressful. Comfyville's property management services handle everything from day-to-day operations to long-term strategy, ensuring your asset grows in value while you focus on what matters."
    introText2="Our dedicated team of property managers, maintenance professionals, and financial analysts work together to deliver comprehensive oversight that protects and enhances your portfolio."
    features={[
      { icon: ClipboardList, title: "Comprehensive Oversight", text: "We manage every aspect of your property—from tenant relations to maintenance schedules—so you don't have to." },
      { icon: Wrench, title: "Maintenance & Repairs", text: "Our network of vetted contractors ensures prompt, quality repairs and regular upkeep to preserve property value." },
      { icon: Users, title: "Tenant Management", text: "Screening, onboarding, rent collection, and dispute resolution—all handled professionally on your behalf." },
      { icon: BarChart3, title: "Financial Reporting", text: "Transparent monthly reports covering income, expenses, and occupancy rates to keep you informed." },
      { icon: Sparkles, title: "Facility Enhancement", text: "Proactive upgrades and renovations to keep your property competitive and attractive in the market." },
      { icon: Settings, title: "Compliance & Legal", text: "We ensure your property meets all regulatory requirements, from safety codes to lease compliance." },
    ]}
    stats={[
      { value: "150+", label: "Properties Managed" },
      { value: "95%", label: "Occupancy Rate" },
      { value: "₦500M+", label: "Rent Collected" },
      { value: "48hr", label: "Avg. Response Time" },
    ]}
    processTitle="Our Management Approach"
    processSubtitle="The Process"
    processSteps={[
      { step: "01", title: "Property Assessment", description: "We conduct a thorough evaluation of your property's condition, market position, and revenue potential." },
      { step: "02", title: "Strategy Development", description: "A customized management plan covering pricing, tenant targeting, maintenance schedules, and financial goals." },
      { step: "03", title: "Active Management", description: "Day-to-day operations including tenant communication, rent collection, maintenance coordination, and inspections." },
      { step: "04", title: "Reporting & Optimization", description: "Regular performance reports and proactive recommendations to maximize your property's value and income." },
    ]}
    quote="Since partnering with Comfyville, my rental income has increased by 30% and I haven't had to deal with a single tenant issue."
    quoteAuthor="— Property Investor"
    ctaTitle="Let Us Manage Your Property"
    ctaText="Focus on what matters while we handle the rest."
  />
);

export default PropertyManagement;
