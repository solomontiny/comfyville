import { motion } from "framer-motion";
import { Linkedin, Mail, Quote } from "lucide-react";
import teamHero from "@/assets/team-hero.jpg";

const teamMembers = [
  {
    name: "Adebayo Ogunleye",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in luxury real estate, driving Comfyville's mission to redefine premium living across Africa.",
    initials: "AO",
  },
  {
    name: "Chioma Eze",
    role: "Head of Operations",
    bio: "Ensures seamless service delivery across all properties, from guest experience to facility management.",
    initials: "CE",
  },
  {
    name: "David Mensah",
    role: "Lead Interior Designer",
    bio: "Award-winning designer who transforms spaces into masterpieces, blending African artistry with contemporary luxury.",
    initials: "DM",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Investment Director",
    bio: "Financial strategist guiding clients through property investments with data-driven insights and market expertise.",
    initials: "FA",
  },
  {
    name: "Ngozi Adeyemi",
    role: "Client Relations Manager",
    bio: "The heartbeat of our guest experience — dedicated to making every client feel at home from first inquiry to checkout.",
    initials: "NA",
  },
  {
    name: "Emeka Obi",
    role: "Property Consultant",
    bio: "Connects discerning buyers with their ideal properties through deep market knowledge and personalized service.",
    initials: "EO",
  },
  {
    name: "Amara Kone",
    role: "Marketing & Brand Lead",
    bio: "Crafts Comfyville's luxury narrative across digital and physical touchpoints with creative precision.",
    initials: "AK",
  },
  {
    name: "Tunde Bakare",
    role: "Technical Director",
    bio: "Drives innovation in our booking platform and smart property integrations for a seamless digital experience.",
    initials: "TB",
  },
];

const values = [
  { title: "Excellence", desc: "We settle for nothing less than extraordinary in every detail." },
  { title: "Integrity", desc: "Transparency and trust are the foundation of every relationship." },
  { title: "Innovation", desc: "We embrace new ideas to continuously elevate the living experience." },
  { title: "Community", desc: "We build lasting connections between people, places, and purpose." },
];

const OurTeam = () => (
  <main className="pt-20 md:pt-24">
    {/* Hero */}
    <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
      <motion.img
        src={teamHero}
        alt="The Comfyville team"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container px-5 md:px-8 relative z-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-6" />
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">Our People</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            The Minds Behind{" "}
            <span className="italic font-light gold-gradient-text">Comfyville</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light mt-4 max-w-xl">
            A passionate team of industry experts committed to redefining luxury living.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Intro */}
    <section className="container px-5 md:px-8 py-16 md:py-24 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Who We Are</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
          Built on Passion, Driven by Purpose
        </h2>
        <div className="luxury-divider mb-8" />
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          At Comfyville, our strength lies in our people. Each team member brings a unique blend of expertise,
          creativity, and dedication to delivering exceptional real estate experiences. Together, we're shaping
          the future of luxury living in Africa and beyond.
        </p>
      </motion.div>
    </section>

    {/* Team Grid */}
    <section className="luxury-section-dark py-16 md:py-24">
      <div className="container px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Leadership</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">Meet the Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative border border-white/10 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              {/* Placeholder avatar */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="font-display text-5xl md:text-6xl font-bold gold-gradient-text opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {member.initials}
                </span>
                {/* Hover overlay with links */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="LinkedIn">
                    <Linkedin size={14} className="text-white" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Email">
                    <Mail size={14} className="text-white" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary/70 text-xs tracking-[0.15em] uppercase mt-1 mb-3">{member.role}</p>
                <p className="text-white/50 text-sm leading-relaxed font-light">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="container px-5 md:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Our Values</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">What Guides Us</h2>
        <div className="luxury-divider mx-auto mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="luxury-card p-8 text-center"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">{value.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Quote */}
    <section className="luxury-section-dark py-20">
      <div className="container px-5 md:px-8 max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Quote size={32} className="text-primary/40 mx-auto mb-6" />
          <p className="text-white/80 text-xl md:text-2xl font-display italic leading-relaxed">
            "Our team isn't just building properties — we're building dreams. Every member brings heart, expertise, and an unwavering commitment to excellence."
          </p>
          <p className="text-primary/70 text-xs tracking-[0.3em] uppercase mt-6">— Adebayo Ogunleye, Founder</p>
        </motion.div>
      </div>
    </section>
  </main>
);

export default OurTeam;
