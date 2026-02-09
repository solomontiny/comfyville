import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
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
      <section className="container py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground text-sm mt-2">We'd love to hear from you. Reach out any way you prefer.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="Your Message"
              required
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@comfyville.com", href: "mailto:hello@comfyville.com" },
              { icon: Phone, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/1234567890" },
              { icon: MapPin, label: "Location", value: "Global — We operate worldwide", href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
