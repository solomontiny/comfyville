import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ServicePageLayoutProps {
  heroImage: string;
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  introLabel: string;
  introTitle: string;
  introText: string;
  introText2?: string;
  features: Feature[];
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: ProcessStep[];
  stats?: Stat[];
  quote?: string;
  quoteAuthor?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaLabel?: string;
}

const ServicePageLayout = ({
  heroImage,
  heroLabel,
  heroTitle,
  heroSubtitle,
  introLabel,
  introTitle,
  introText,
  introText2,
  features,
  processTitle,
  processSubtitle,
  processSteps,
  stats,
  quote,
  quoteAuthor,
  ctaTitle = "Ready to Get Started?",
  ctaText = "Let Comfyville guide you every step of the way.",
  ctaLink = "/contact",
  ctaLabel = "Get in Touch",
}: ServicePageLayoutProps) => (
    <main className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <motion.img
          src={heroImage}
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="container relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-6" />
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">{heroLabel}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">{heroTitle}</h1>
            <p className="text-white/60 text-base md:text-lg font-light mt-4 max-w-xl">{heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && stats.length > 0 && (
        <section className="border-b border-border bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="py-10 px-6 text-center border-r border-border last:border-r-0"
                >
                  <p className="font-display text-3xl md:text-4xl font-bold gold-gradient-text">{stat.value}</p>
                  <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2 font-light">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="container py-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">{introLabel}</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">{introTitle}</h2>
          <div className="luxury-divider mb-8" />
          <p className="text-muted-foreground leading-relaxed text-lg font-light">{introText}</p>
          {introText2 && <p className="text-muted-foreground leading-relaxed text-lg font-light mt-4">{introText2}</p>}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="luxury-section-dark py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-8 border border-white/10 rounded-lg hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-5 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-500">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed font-light">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      {processSteps && processSteps.length > 0 && (
        <section className="container py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">{processSubtitle || "How It Works"}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{processTitle || "Our Process"}</h2>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-10 items-start group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] transition-all duration-500">
                    <span className="font-display text-sm font-bold gold-gradient-text">{step.step}</span>
                  </div>
                  {i < processSteps.length - 1 && <div className="w-[1px] h-16 bg-gradient-to-b from-primary/30 to-transparent" />}
                </div>
                <div className="pb-12">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Quote */}
      {quote && (
        <section className="luxury-section-dark py-20">
          <div className="container max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-primary text-5xl font-display mb-6">"</div>
              <p className="text-white/80 text-xl md:text-2xl font-display italic leading-relaxed">{quote}</p>
              {quoteAuthor && <p className="text-primary/70 text-xs tracking-[0.3em] uppercase mt-6">{quoteAuthor}</p>}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">{ctaTitle}</h2>
          <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">{ctaText}</p>
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded text-sm font-medium tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-300"
          >
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </main>
);

export default ServicePageLayout;
