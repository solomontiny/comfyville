import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MessageCircle, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const ADMIN_WHATSAPP = "2349037098493";
const ADMIN_EMAIL = "Villecomfy@gmail.com";
const ADMIN_PHONE = "+2349037098493";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="luxury-section-dark">
      <div className="container px-5 md:px-8 py-16 md:py-20">
        {/* Logo section - prominent and centered on mobile */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-0 md:hidden">
          <Link to="/" className="flex flex-col items-center gap-3" onClick={scrollToTop}>
            <img src={logo} alt="Comfyville" className="w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ring-primary/20" />
            <span className="font-display text-3xl font-semibold">
              <span className="text-white">Comfy</span>
              <span className="text-primary">ville</span>
            </span>
          </Link>
          <p className="text-white/50 text-sm mt-3 leading-relaxed font-light max-w-xs">
            Premium short-stays & property investments. Curated luxury, verified quality.
          </p>
          <div className="luxury-divider mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Desktop logo - hidden on mobile */}
          <div className="hidden md:block md:col-span-1">
            <Link to="/" className="flex items-center gap-3" onClick={scrollToTop}>
              <img src={logo} alt="Comfyville" className="w-12 h-12 rounded-xl object-cover shadow-lg ring-2 ring-primary/20" />
              <span className="font-display text-3xl font-semibold">
                <span className="text-white">Comfy</span>
                <span className="text-primary">ville</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm mt-4 leading-relaxed font-light">
              Premium short-stays & property investments. Curated luxury, verified quality, unforgettable experiences.
            </p>
            <div className="luxury-divider mt-6" />
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 md:mb-6">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/listings", label: "All Spaces" },
                { to: "/about", label: "About Us" },
                { to: "/mission-vision", label: "Mission & Vision" },
                { to: "/contact", label: "Contact" },
                { to: "/join-team", label: "Join Our Team" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-white/50 hover:text-primary transition-colors duration-300 font-light"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 md:mb-6">Services</h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/services"
                className="text-sm text-white/60 hover:text-primary transition-colors duration-300 font-medium"
              >
                All Services
              </Link>
              {[
                { to: "/services/property-sales-rentals", label: "Sales & Rentals" },
                { to: "/services/short-term-apartments", label: "Short-term Apartments" },
                { to: "/services/property-management", label: "Property Management" },
                { to: "/services/land-investment", label: "Land & Investment" },
                { to: "/services/luxury-interior", label: "Luxury Interior" },
                { to: "/services/investor-guidance", label: "Investor Guidance" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-white/50 hover:text-primary transition-colors duration-300 font-light"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 md:mb-6">Legal</h4>
            <div className="flex flex-col gap-2.5">
              {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map((l) => (
                <span
                  key={l}
                  className="text-sm text-white/50 cursor-pointer hover:text-primary transition-colors duration-300 font-light"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 md:mb-6">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: `https://wa.me/${ADMIN_WHATSAPP}` },
                { icon: Mail, href: `mailto:${ADMIN_EMAIL}` },
                { icon: Phone, href: `tel:${ADMIN_PHONE}` },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4 font-light">{ADMIN_EMAIL}</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-white/30 font-light tracking-wide">
            © {new Date().getFullYear()} Comfyville. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/30 font-light tracking-wide hidden sm:block">
              Designed for those who demand the extraordinary.
            </p>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;