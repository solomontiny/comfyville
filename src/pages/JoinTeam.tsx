import { motion } from "framer-motion";
import { Users, Briefcase, Heart, Send, MapPin, Clock, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const positions = [
  {
    title: "Property Consultant",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "Help clients find their dream properties. Strong communication and real estate knowledge required.",
  },
  {
    title: "Interior Designer",
    location: "Remote",
    type: "Contract",
    description: "Create stunning luxury interiors for our premium listings. 3+ years experience required.",
  },
  {
    title: "Marketing Specialist",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "Drive brand awareness and lead generation through digital marketing campaigns.",
  },
  {
    title: "Customer Success Manager",
    location: "Remote",
    type: "Full-time",
    description: "Ensure exceptional experiences for our clients from booking to checkout.",
  },
];

const perks = [
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive health and wellness coverage for you and your family." },
  { icon: Clock, title: "Flexible Hours", desc: "Work-life balance with flexible scheduling and remote options." },
  { icon: Star, title: "Growth Path", desc: "Clear career progression with mentorship and learning opportunities." },
  { icon: Briefcase, title: "Competitive Pay", desc: "Industry-leading compensation with performance-based bonuses." },
];

const JoinTeam = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Application submitted! We'll get back to you soon.");
    setName("");
    setEmail("");
    setRole("");
    setMessage("");
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="luxury-section-dark py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary text-xs font-medium tracking-[0.35em] uppercase mb-4">Careers</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              Join Our <span className="italic font-light gold-gradient-text">Team</span>
            </h1>
            <p className="text-white/50 mt-5 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-light">
              Be part of a team that's redefining luxury real estate. We're looking for passionate individuals who share our vision.
            </p>
            <div className="luxury-divider mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Why join */}
      <section className="container py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Why Comfyville</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Perks & Benefits</h2>
          <div className="luxury-divider mx-auto mt-4" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-secondary py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Openings</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Open Positions</h2>
            <div className="luxury-divider mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {positions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card p-6 space-y-3"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">{pos.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {pos.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {pos.type}</span>
                </div>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{pos.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="container py-24">
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Apply</p>
            <h2 className="font-display text-3xl font-semibold text-foreground">Send Your Application</h2>
            <div className="luxury-divider mx-auto mt-4" />
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Position of Interest *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a position</option>
                {positions.map((p) => (
                  <option key={p.title} value={p.title}>{p.title}</option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Cover Note</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell us why you'd be a great fit..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Send size={16} /> Submit Application
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default JoinTeam;
