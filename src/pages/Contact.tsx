import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero header */}
      <section className="luxury-section-dark py-16 md:py-20">
        <div className="container px-5 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Reach Out</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white">Get in Touch</h1>
            <p className="text-white/40 text-sm mt-3 font-light max-w-md mx-auto">
              We'd love to hear from you. Reach out any way you prefer.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                Your Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                Message
              </label>
              <textarea
                placeholder="Tell us what you're looking for..."
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none font-light"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={14} />
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-6">Contact Info</p>
              <div className="luxury-divider mb-8" />
            </div>

            {[
              { icon: Mail, label: "Email", value: "Villecomfy@gmail.com", href: "mailto:Villecomfy@gmail.com" },
              { icon: Phone, label: "Phone", value: "+234 903 709 8493", href: "tel:+2349037098493" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/2349037098493" },
              { icon: MapPin, label: "Location", value: "Global — We operate worldwide", href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Follow Comfyville */}
            <div className="pt-4">
              <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Snapchat", href: "https://www.snapchat.com/add/comfyville?share_id=zrj8leHxDhM&locale=en-US" },
                  { label: "Instagram", href: "https://www.instagram.com/comfyville?igsh=MXYxa21tczdndXh2Mw==" },
                  { label: "Facebook", href: "https://www.facebook.com/share/r/17SnNd4brB/" },
                  { label: "TikTok", href: "https://www.tiktok.com/@comfyvillle?_r=1&_t=ZS-943PWpSoHhI" },
                  { label: "X (Twitter)", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
