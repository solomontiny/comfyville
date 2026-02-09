import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const ADMIN_WHATSAPP = "09037098493";
const ADMIN_EMAIL = "Villecomfy@gmail.com";
const ADMIN_PHONE = "+2349037098493";

const Footer = () => (
  <footer className="luxury-section-dark">
    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Comfyville" className="w-10 h-10 rounded-lg object-cover" />
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
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">Explore</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/listings", label: "All Spaces" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
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
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">Legal</h4>
          <div className="flex flex-col gap-3">
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

        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">Connect</h4>
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

      <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/30 font-light tracking-wide">
          © {new Date().getFullYear()} Comfyville. All rights reserved.
        </p>
        <p className="text-xs text-white/30 font-light tracking-wide">
          Designed for those who demand the extraordinary.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
