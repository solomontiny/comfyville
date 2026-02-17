import { motion } from "framer-motion";
import { Users, Briefcase, Heart, Send, MapPin, Clock, Star, ArrowRight, Sparkles, Globe, Zap, Quote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import careersHero from "@/assets/careers-hero.jpg";
import careersCulture from "@/assets/careers-culture.jpg";

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

const teamMembers = [
  { name: "Adebayo Okonkwo", role: "CEO & Founder", initials: "AO" },
  { name: "Chidinma Eze", role: "Head of Sales", initials: "CE" },
  { name: "James Hartwell", role: "Creative Director", initials: "JH" },
  { name: "Fatima Bello", role: "Client Relations", initials: "FB" },
  { name: "Daniel Osei", role: "Property Manager", initials: "DO" },
  { name: "Amara Nwosu", role: "Interior Lead", initials: "AN" },
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
      {/* Full-viewport Hero with Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={careersHero}
          alt="Our team collaboration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container px-5 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-8"
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
            <p className="text-white/50 mt-8 text-base md:text-xl max-w-xl mx-auto leading-relaxed font-light">
              Join a team obsessed with redefining luxury living. Your talent, our vision — extraordinary outcomes.
            </p>
            <div className="luxury-divider mx-auto mt-8" />

            <motion.a
              href="#positions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 mt-10 bg-primary text-primary-foreground px-8 py-4 rounded text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-all duration-300"
            >
              View Open Roles <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Stats ribbon */}
      <section className="border-y border-border/50 bg-background">
        <div className="container px-5 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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

      {/* Culture — editorial layout with image */}
      <section className="container px-5 md:px-8 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            {/* Culture image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 rounded-xl overflow-hidden aspect-[4/3] relative group"
            >
              <img
                src={careersCulture}
                alt="Our luxury workspace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">Our Lagos Headquarters</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-4 md:p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
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

      {/* Meet the Team */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container px-5 md:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Our People</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
              Meet the <span className="italic font-light gold-gradient-text">Team</span>
            </h2>
            <div className="luxury-divider mx-auto mt-5" />
            <p className="text-muted-foreground text-sm font-light mt-4 max-w-lg mx-auto">
              The passionate professionals behind every exceptional Comfyville experience.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group text-center"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-2xl md:text-3xl font-bold gold-gradient-text">{member.initials}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h4 className="font-display text-sm font-semibold text-foreground leading-tight">{member.name}</h4>
                <p className="text-muted-foreground text-[11px] tracking-wide uppercase mt-0.5 font-light">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Quote */}
      <section className="luxury-section-dark py-16 md:py-20">
        <div className="container px-5 md:px-8 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Quote size={32} className="text-primary/40 mx-auto mb-6" />
            <blockquote className="font-display text-xl md:text-3xl italic text-white leading-relaxed font-light">
              "Working at Comfyville isn't just a job — it's a calling. We're building something that transforms how people experience luxury."
            </blockquote>
            <div className="luxury-divider mx-auto my-6" />
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase">— Adebayo Okonkwo, Founder</p>
          </motion.div>
        </div>
      </section>

      {/* Open positions */}
      <section id="positions" className="py-16 md:py-32 relative">
        <div className="container px-5 md:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Openings</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
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
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{pos.title}</h3>
                    <span className="text-[10px] font-medium tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">{pos.tag}</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">{pos.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground/60">
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
      <section id="apply" className="luxury-section-dark py-16 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-4">Apply Now</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
                Ready to make <br />
                <span className="italic font-light gold-gradient-text">your mark?</span>
              </h2>
              <p className="text-white/50 mt-6 text-base leading-relaxed font-light">
                We'd love to hear from you. Fill out the form and our talent team will review your application within 48 hours.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  { num: "1", title: "Submit your application", desc: "Fill in your details and tell us about yourself." },
                  { num: "2", title: "We review & connect", desc: "Our team reviews every application personally." },
                  { num: "3", title: "Join the team", desc: "Welcome aboard — let's build something extraordinary." },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">{step.num}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{step.title}</p>
                      <p className="text-xs text-white/40 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <div>
                  <label className="text-xs font-medium tracking-wide uppercase text-white/70 mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide uppercase text-white/70 mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide uppercase text-white/70 mb-2 block">Position of Interest *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    <option value="" className="bg-background text-foreground">Select a position</option>
                    {positions.map((p) => (
                      <option key={p.title} value={p.title} className="bg-background text-foreground">{p.title}</option>
                    ))}
                    <option value="other" className="bg-background text-foreground">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wide uppercase text-white/70 mb-2 block">Cover Note</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
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
        </div>
      </section>
    </main>
  );
};

export default JoinTeam;
