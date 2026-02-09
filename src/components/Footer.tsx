import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary border-t border-border">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="font-display text-xl font-semibold text-foreground">
            Comfy<span className="text-primary">ville</span>
          </Link>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Premium short-stays & property investments. Your money's worth, every time.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Explore</h4>
          <div className="flex flex-col gap-2.5">
            {[{ to: "/listings", label: "All Spaces" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Legal</h4>
          <div className="flex flex-col gap-2.5">
            {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map((l) => (
              <span key={l} className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">{l}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Connect</h4>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "#" },
              { icon: MessageCircle, href: "https://wa.me/1234567890" },
              { icon: Mail, href: "mailto:hello@comfyville.com" },
              { icon: Phone, href: "tel:+1234567890" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-6 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Comfyville. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
