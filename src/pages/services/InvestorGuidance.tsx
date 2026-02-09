import { GraduationCap, Compass, HandCoins, BookOpen, Users, Target } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-guidance.jpg";

const InvestorGuidance = () => (
  <ServicePageLayout
    heroImage={heroImage}
    heroLabel="Our Services"
    heroTitle="Investor & First-Time Buyer Guidance"
    heroSubtitle="Empowering you with knowledge, confidence, and expert support to make your first—or next—real estate move."
    introLabel="What We Offer"
    introTitle="Your Journey Starts Here"
    introText="Entering the real estate market can be overwhelming. Comfyville provides the guidance, education, and support that investors and first-time buyers need to make confident, well-informed decisions that build lasting wealth."
    introText2="Whether you're buying your first property or expanding a portfolio, our tailored programs demystify the process and connect you with the resources, mentors, and opportunities that accelerate your success."
    features={[
      { icon: Compass, title: "Market Navigation", text: "We simplify Nigeria's real estate landscape, helping you understand trends, hotspots, and pricing dynamics." },
      { icon: HandCoins, title: "Budget Planning", text: "Realistic financial planning tailored to your capacity—whether you're investing ₦5M or ₦500M." },
      { icon: BookOpen, title: "Educational Resources", text: "Access workshops, guides, and one-on-one sessions that build your real estate knowledge from the ground up." },
      { icon: GraduationCap, title: "First-Timer Programs", text: "Specialized programs for first-time buyers covering everything from mortgage options to property inspection." },
      { icon: Users, title: "Mentorship", text: "Connect with experienced investors and industry leaders who can share insights and strategies." },
      { icon: Target, title: "Goal-Oriented Plans", text: "Whether it's your first home or your tenth investment, we create actionable roadmaps aligned with your goals." },
    ]}
    stats={[
      { value: "1,000+", label: "Clients Guided" },
      { value: "85%", label: "First-Time Buyers" },
      { value: "50+", label: "Workshops Held" },
      { value: "₦10B+", label: "Client Investments" },
    ]}
    processTitle="Your Guidance Journey"
    processSubtitle="How We Help"
    processSteps={[
      { step: "01", title: "Free Consultation", description: "A no-obligation session to understand your goals, experience level, and financial situation." },
      { step: "02", title: "Education & Planning", description: "We provide resources, workshops, and a personalized investment roadmap tailored to your timeline." },
      { step: "03", title: "Property Selection", description: "Guided property tours with expert analysis on value, potential, and suitability for your goals." },
      { step: "04", title: "Ongoing Support", description: "Post-purchase guidance including property management tips, portfolio reviews, and market updates." },
    ]}
    quote="As a first-time buyer, I was terrified. Comfyville held my hand through every step and I now own my dream apartment."
    quoteAuthor="— First-Time Buyer"
    ctaTitle="Start Your Real Estate Journey"
    ctaText="Get expert guidance tailored to your goals and experience level."
  />
);

export default InvestorGuidance;
