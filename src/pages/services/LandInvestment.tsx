import { Landmark, TrendingUp, FileText, MapPin, Scale, Lightbulb } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-land.jpg";

const LandInvestment = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Land & Investment Advisory"
    heroSubtitle="Strategic land acquisition and investment guidance built on deep market intelligence and unwavering integrity."
    introLabel="What We Offer"
    introTitle="Smart Investments, Solid Returns"
    introText="Navigate the Nigerian real estate investment landscape with confidence. From land acquisition to portfolio strategy, our advisory team provides the insight and expertise you need to make informed, profitable decisions."
    introText2="We specialize in identifying high-growth corridors and undervalued plots, conducting rigorous due diligence, and providing transparent guidance that puts your financial goals first."
    features={[
      { icon: MapPin, title: "Strategic Land Sourcing", text: "We identify high-potential land in emerging and established areas, perfect for development or long-term investment." },
      { icon: TrendingUp, title: "ROI Analysis", text: "Data-driven projections and market trends to help you understand your investment's growth potential." },
      { icon: FileText, title: "Due Diligence", text: "Comprehensive title verification, survey confirmation, and legal clearance before any transaction." },
      { icon: Scale, title: "Legal Advisory", text: "Expert legal guidance through documentation, government approvals, and ownership transfers." },
      { icon: Lightbulb, title: "Investment Strategy", text: "Tailored advisory services to help you build a diversified, risk-managed real estate portfolio." },
      { icon: Landmark, title: "Government Liaisons", text: "We navigate regulatory requirements and liaise with relevant government agencies on your behalf." },
    ]}
    stats={[
      { value: "300+", label: "Plots Acquired" },
      { value: "40%", label: "Avg. ROI Delivered" },
      { value: "100%", label: "Legal Clearance Rate" },
      { value: "8+", label: "States Covered" },
    ]}
    processTitle="Investment Process"
    processSubtitle="Step By Step"
    processSteps={[
      { step: "01", title: "Discovery Call", description: "We discuss your investment goals, risk tolerance, budget, and preferred locations to create a clear brief." },
      { step: "02", title: "Research & Sourcing", description: "Our team identifies and vets land opportunities that match your criteria, with full documentation." },
      { step: "03", title: "Due Diligence", description: "Comprehensive verification including title search, survey, environmental checks, and legal review." },
      { step: "04", title: "Acquisition & Handover", description: "We facilitate the purchase, handle documentation, and deliver your Certificate of Occupancy." },
    ]}
    quote="Comfyville helped me acquire three plots in Epe that have already appreciated by 60% in two years. Their advisory is gold."
    quoteAuthor="— Real Estate Investor"
    ctaTitle="Start Building Your Portfolio"
    ctaText="Let us help you identify and acquire high-value land investments."
  />
);

export default LandInvestment;
