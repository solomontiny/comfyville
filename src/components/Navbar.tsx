import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpeg";

const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Spaces" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const moreLinks = [
  { to: "/mission-vision", label: "Mission & Vision" },
  { to: "/our-team", label: "Our Team" },
  { to: "/join-team", label: "Careers" },
];

const serviceLinks = [
  { to: "/services/property-sales-rentals", label: "Property Sales & Rentals" },
  { to: "/services/short-term-apartments", label: "Short-term & Serviced Apartments" },
  { to: "/services/property-management", label: "Property Management & Facility Care" },
  { to: "/services/land-investment", label: "Land & Investment Advisory" },
  { to: "/services/luxury-interior", label: "Luxury Interior & Design Support" },
  { to: "/services/investor-guidance", label: "Guidance for Investors & First-Time Buyers" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = pathname === "/";
  const showDark = isHome && !scrolled;
  const isServiceActive = pathname.startsWith("/services");
  const isMoreActive = moreLinks.some((l) => pathname === l.to);

  const linkClass = (active: boolean) =>
    `text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-primary ${
      active ? "text-primary" : showDark ? "text-white/80" : "text-muted-foreground"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : isHome
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-xl border-b border-border"
      }`}
    >
      <nav className="container px-5 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Comfyville" className="w-10 h-10 rounded-lg object-cover" />
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            <span className={showDark ? "text-white" : "text-foreground"}>Comfy</span>
            <span className="text-primary">ville</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {primaryLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(pathname === link.to)}>
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => { setServicesOpen(!servicesOpen); setMoreOpen(false); }}
              className={`${linkClass(isServiceActive)} flex items-center gap-1`}
            >
              Services <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-72 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
                >
                  <Link
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className={`block px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary/5 hover:text-primary border-b border-border ${
                      pathname === "/services" ? "text-primary bg-primary/5" : "text-foreground"
                    }`}
                  >
                    View All Services
                  </Link>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setServicesOpen(false)}
                      className={`block px-5 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary border-b border-border/50 last:border-0 ${
                        pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => { setMoreOpen(!moreOpen); setServicesOpen(false); }}
              className={`${linkClass(isMoreActive)} flex items-center gap-1`}
            >
              More <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-56 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-5 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary border-b border-border/50 last:border-0 ${
                        pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="flex items-center gap-4 ml-2">
              <Link
                to="/dashboard"
                className={`${linkClass(pathname === "/dashboard")} flex items-center gap-1.5`}
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className={`${linkClass(false)} flex items-center gap-1.5`}
              >
                <LogOut size={14} /> Sign Out
              </button>
              <Link
                to="/listings"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-2">
              <Link to="/auth" className={`${linkClass(false)} flex items-center gap-1.5`}>
                <LogIn size={14} /> Sign In
              </Link>
              <Link
                to="/listings"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${showDark ? "text-white" : "text-foreground"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container px-5 md:px-8 py-4 flex flex-col">
              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg transition-all duration-200 ${
                    pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground active:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services */}
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                  isServiceActive ? "text-primary bg-primary/5" : "text-muted-foreground active:bg-muted"
                }`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-muted/30 rounded-lg mb-1"
                  >
                    <Link
                      to="/services"
                      onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                      className={`block text-sm py-2.5 px-4 font-semibold transition-colors ${
                        pathname === "/services" ? "text-primary" : "text-foreground"
                      }`}
                    >
                      View All Services
                    </Link>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                        className={`block text-sm py-2.5 px-4 transition-colors ${
                          pathname === link.to ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* More links in mobile */}
              {moreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg transition-all duration-200 ${
                    pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground active:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border/50 mt-2 pt-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className={`text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        pathname === "/dashboard" ? "text-primary bg-primary/5" : "text-muted-foreground active:bg-muted"
                      }`}
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setOpen(false); }}
                      className="text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg text-muted-foreground text-left flex items-center gap-2 w-full active:bg-muted transition-all duration-200"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium tracking-wide uppercase py-3 px-2 rounded-lg text-muted-foreground flex items-center gap-2 active:bg-muted transition-all duration-200"
                  >
                    <LogIn size={14} /> Sign In
                  </Link>
                )}
              </div>

              <Link
                to="/listings"
                onClick={() => setOpen(false)}
                className="bg-primary text-primary-foreground px-5 py-3.5 rounded-lg text-sm font-medium text-center mt-3 uppercase tracking-wide hover:bg-primary/90 transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
