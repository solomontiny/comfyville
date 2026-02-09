import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Spaces" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const showDark = isHome && !scrolled;

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
      <nav className="container flex items-center justify-between h-20">
        <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          <span className={showDark ? "text-white" : "text-foreground"}>Comfy</span>
          <span className="text-primary">ville</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-primary ${
                pathname === link.to
                  ? "text-primary"
                  : showDark
                  ? "text-white/80"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <span className={`text-xs font-light tracking-wide ${showDark ? "text-white/70" : "text-muted-foreground"}`}>
                <User size={12} className="inline mr-1" />
                {user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut()}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-primary flex items-center gap-1.5 ${
                  showDark ? "text-white/80" : "text-muted-foreground"
                }`}
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
            <div className="flex items-center gap-4">
              <Link
                to="/auth"
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-primary flex items-center gap-1.5 ${
                  showDark ? "text-white/80" : "text-muted-foreground"
                }`}
              >
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
          className={`md:hidden p-2 ${showDark ? "text-white" : "text-foreground"}`}
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
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase py-3 transition-colors border-b border-border/50 ${
                    pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="text-xs text-muted-foreground py-3 border-b border-border/50 font-light">
                    <User size={12} className="inline mr-1" /> {user.email}
                  </div>
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="text-sm font-medium tracking-wide uppercase py-3 text-muted-foreground text-left border-b border-border/50 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium tracking-wide uppercase py-3 text-muted-foreground border-b border-border/50 flex items-center gap-2"
                >
                  <LogIn size={14} /> Sign In
                </Link>
              )}

              <Link
                to="/listings"
                onClick={() => setOpen(false)}
                className="bg-primary text-primary-foreground px-5 py-3 rounded text-sm font-medium text-center mt-4 uppercase tracking-wide"
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
