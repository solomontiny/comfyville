import { motion } from "framer-motion";
import { Users, Briefcase, Heart, Send, MapPin, Clock, Star, ArrowRight, Sparkles, Globe, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const positions = [
  {
    title: "Property Consultant",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "Help clients find their dream properties. Strong communication and real estate knowledge required.",
    tag: "Sales",
  },
  {
    title: "Interior Designer",
    location: "Remote",
    type: "Contract",
    description: "Create stunning luxury interiors for our premium listings. 3+ years experience required.",
    tag: "Design",
  },
  {
    title: "Marketing Specialist",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description: "Drive brand awareness and lead generation through digital marketing campaigns.",
    tag: "Marketing",
  },
  {
    title: "Customer Success Manager",
    location: "Remote",
    type: "Full-time",
    description: "Ensure exceptional experiences for our clients from booking to checkout.",
    tag: "Operations",
  },
];

const perks = [
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive health and wellness coverage for you and your family." },
  { icon: Clock, title: "Flexible Hours", desc: "Work-life balance with flexible scheduling and remote options." },
  { icon: Star, title: "Growth Path", desc: "Clear career progression with mentorship and learning opportunities." },
  { icon: Briefcase, title: "Competitive Pay", desc: "Industry-leading compensation with performance-based bonuses." },
  { icon: Globe, title: "Global Exposure", desc: "Work with international clients and luxury properties worldwide." },
  { icon: Zap, title: "Innovation Culture", desc: "Shape the future of real estate with cutting-edge tools and ideas." },
];

const stats = [
  { value: "50+", label: "Team Members" },
  { value: "12", label: "Countries" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9★", label: "Glassdoor" },
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
      {/* Full-viewport Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden luxury-section-dark">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles size={28} className="text-primary" />
            </motion.div>

            <p className="text-primary text-xs font-medium tracking-[0.4em] uppercase mb-6">
              We're Hiring
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]">
              Build the
              <br />
              <span className="italic font-light gold-gradient-text">Future</span> with us
            </h1>
            <p className="text-white/40 mt-8 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light">
              Join a team obsessed with redefining luxury living. Your talent, our vision — extraordinary outcomes.
            </p>
            <div className="luxury-divider mx-auto mt-8" />

            <motion.a
              href="#positions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 mt-10 text-primary text-sm font-medium tracking-wider uppercase hover:gap-3 transition-all duration-300"
            >
              View Open Roles <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats ribbon */}
      <section className="border-y border-border/50 bg-background">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold gold-gradient-text">{stat.value}</p>
                <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture — staggered editorial layout */}
      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-4">Our Culture</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight">
              Where ambition meets <span className="italic font-light gold-gradient-text">purpose</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-base leading-relaxed font-light">
              At Comfyville, we believe exceptional spaces start with exceptional people. We cultivate an environment where creativity flourishes, ideas are valued, and every team member has the autonomy to make an impact.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed font-light">
              From our offices in Lagos to remote contributors across the globe, we're united by a shared passion for luxury living and outstanding service.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="positions" className="luxury-section-dark py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Openings</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white">
              Open <span className="italic font-light gold-gradient-text">Positions</span>
            </h2>
            <div className="luxury-divider mx-auto mt-5" />
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {positions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-primary transition-colors">{pos.title}</h3>
                    <span className="text-[10px] font-medium tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">{pos.tag}</span>
                  </div>
                  <p className="text-white/40 text-sm font-light leading-relaxed">{pos.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {pos.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {pos.type}</span>
                  </div>
                </div>
                <a
                  href="#apply"
                  className="flex items-center gap-2 text-primary text-xs font-medium tracking-wider uppercase hover:gap-3 transition-all duration-300 shrink-0"
                >
                  Apply <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form — editorial split */}
      <section id="apply" className="container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-4">Apply Now</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight">
              Ready to make <br />
              <span className="italic font-light gold-gradient-text">your mark?</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-base leading-relaxed font-light">
              We'd love to hear from you. Fill out the form and our talent team will review your application within 48 hours.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Submit your application</p>
                  <p className="text-xs text-muted-foreground font-light">Fill in your details and tell us about yourself.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">We review & connect</p>
                  <p className="text-xs text-muted-foreground font-light">Our team reviews every application personally.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Join the team</p>
                  <p className="text-xs text-muted-foreground font-light">Welcome aboard — let's build something extraordinary.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border/50 bg-card/50">
              <div>
                <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">Position of Interest *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Send size={16} /> Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default JoinTeam;
