import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Home, Settings, Landmark, Palette, GraduationCap,
  MessageCircle, X, ChevronLeft, ChevronRight, ShoppingBag
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAllServiceImages } from "@/hooks/useServiceImages";
import serviceSales from "@/assets/service-sales.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";
import serviceManagement from "@/assets/service-management.jpg";
import serviceLand from "@/assets/service-land.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceGuidance from "@/assets/service-guidance.jpg";

const ADMIN_WHATSAPP = "2349037098493";

const fallbacks: Record<string, string> = {
  "property-sales-rentals": serviceSales,
  "short-term-apartments": serviceApartments,
  "property-management": serviceManagement,
  "land-investment": serviceLand,
  "luxury-interior": serviceInterior,
  "investor-guidance": serviceGuidance,
};

const serviceData = [
  {
    key: "property-sales-rentals",
    icon: Building2,
    title: "Property Sales & Rentals",
    description: "Buy, sell, or rent premium properties across Nigeria with expert guidance and verified listings.",
    link: "/services/property-sales-rentals",
  },
  {
    key: "short-term-apartments",
    icon: Home,
    title: "Short-term & Serviced Apartments",
    description: "Hotel-grade luxury meets home comfort. Fully furnished apartments for flexible stays.",
    link: "/services/short-term-apartments",
  },
  {
    key: "property-management",
    icon: Settings,
    title: "Property Management & Facility Care",
    description: "Comprehensive property oversight—from tenant management to maintenance and financial reporting.",
    link: "/services/property-management",
  },
  {
    key: "land-investment",
    icon: Landmark,
    title: "Land & Investment Advisory",
    description: "Strategic land acquisition and investment guidance built on deep market intelligence.",
    link: "/services/land-investment",
  },
  {
    key: "luxury-interior",
    icon: Palette,
    title: "Luxury Interiors & 3D Visualizations",
    description: "Transform spaces with bespoke design, 3D interior & exterior renders, and expert craftsmanship.",
    link: "/services/luxury-interior",
  },
  {
    key: "investor-guidance",
    icon: GraduationCap,
    title: "Investor & First-Time Buyer Guidance",
    description: "Expert support and education to help you make confident, well-informed real estate decisions.",
    link: "/services/investor-guidance",
  },
];

interface ServiceProperty {
  id: string;
  service_key: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

const Store = () => {
  const { images: serviceImages } = useAllServiceImages();
  const [properties, setProperties] = useState<ServiceProperty[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from("service_properties")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) setProperties(data as ServiceProperty[]);
    };
    fetchProperties();
  }, []);

  const getPropertyImages = (serviceKey: string) =>
    properties.filter((p) => p.service_key === serviceKey);

  const openWhatsApp = (serviceTitle: string) => {
    const msg = `Hi FullSky Properties! I'm interested in your ${serviceTitle} service. I'd like to get a free consultation.`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const selectedProperties = selectedService ? getPropertyImages(selectedService) : [];
  const selectedData = serviceData.find((s) => s.key === selectedService);

  const openLightbox = (imgs: ServiceProperty[], idx: number) => {
    setLightboxImage(imgs[idx].image_url);
    setLightboxIdx(idx);
  };

  return (
    <main className="pt-16 md:pt-24">
      {/* Hero */}
      <section className="luxury-section-dark py-14 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="container px-5 md:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1px] bg-primary mb-5 sm:mb-6 mx-auto" />
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <ShoppingBag size={14} className="text-primary sm:w-4 sm:h-4" />
              <p className="text-white/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase">Free Services</p>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Our Service Store
            </h1>
            <p className="text-white/60 text-xs sm:text-base md:text-lg font-light mt-3 sm:mt-6 max-w-xl mx-auto leading-relaxed">
              Browse our services, view property galleries, and get a free consultation — no charges, no commitments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container px-4 sm:px-5 md:px-8 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2">Browse & Inquire</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            Explore Our Services
          </h2>
          <p className="text-muted-foreground text-sm font-light mt-3 max-w-md mx-auto">
            Click on any service to see property images and get in touch for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {serviceData.map((service, i) => {
            const Icon = service.icon;
            const imgSrc = serviceImages[service.key] || fallbacks[service.key];
            const propCount = getPropertyImages(service.key).length;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="group luxury-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={16} className="text-primary" />
                      </div>
                    </div>
                    {propCount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary/90 text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {propCount} {propCount === 1 ? "photo" : "photos"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        {propCount > 0 && (
                          <button
                            onClick={() => setSelectedService(service.key)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-muted text-foreground px-3 py-2.5 rounded hover:bg-muted/80 transition-colors"
                          >
                            View Gallery
                          </button>
                        )}
                        <Link
                          to={service.link}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium border border-border text-foreground px-3 py-2.5 rounded hover:border-primary hover:text-primary transition-colors"
                        >
                          Details <ArrowRight size={12} />
                        </Link>
                      </div>
                      <button
                        onClick={() => openWhatsApp(service.title)}
                        className="w-full inline-flex items-center justify-center gap-2 text-xs font-medium bg-[#25D366] text-white px-3 py-2.5 rounded hover:bg-[#25D366]/90 transition-colors"
                      >
                        <MessageCircle size={14} /> Free Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedService && selectedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-5 flex items-center justify-between z-10">
                <div>
                  <p className="text-primary text-[10px] font-medium tracking-[0.3em] uppercase">Gallery</p>
                  <h2 className="font-display text-base sm:text-lg font-semibold text-foreground">{selectedData.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                {selectedProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-sm font-light">No property images yet for this service.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {selectedProperties.map((prop, idx) => (
                      <button
                        key={prop.id}
                        onClick={() => openLightbox(selectedProperties, idx)}
                        className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                      >
                        <img
                          src={prop.image_url}
                          alt={prop.title || "Property"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        {prop.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-white text-[10px] sm:text-xs font-medium truncate">{prop.title}</p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => openWhatsApp(selectedData.title)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium bg-[#25D366] text-white px-4 py-3 rounded hover:bg-[#25D366]/90 transition-colors"
                  >
                    <MessageCircle size={16} /> Get Free Consultation
                  </button>
                  <Link
                    to={selectedData.link}
                    onClick={() => setSelectedService(null)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium border border-border text-foreground px-4 py-3 rounded hover:border-primary hover:text-primary transition-colors"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>
            {selectedProperties.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const prev = (lightboxIdx - 1 + selectedProperties.length) % selectedProperties.length;
                    setLightboxIdx(prev);
                    setLightboxImage(selectedProperties[prev].image_url);
                  }}
                  className="absolute left-2 sm:left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = (lightboxIdx + 1) % selectedProperties.length;
                    setLightboxIdx(next);
                    setLightboxImage(selectedProperties[next].image_url);
                  }}
                  className="absolute right-2 sm:right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <motion.img
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightboxImage}
              alt="Property"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="luxury-section-dark py-16 sm:py-20 md:py-24">
        <div className="container px-4 sm:px-5 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 sm:mb-4">
              All Consultations Are Free
            </h2>
            <p className="text-white/60 font-light mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              No hidden fees, no obligations. Reach out to us and let's discuss how we can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => openWhatsApp("real estate")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded text-sm font-medium tracking-[0.15em] uppercase hover:bg-[#25D366]/90 transition-all duration-300"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 sm:px-10 py-3.5 sm:py-4 rounded text-sm font-medium tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-300"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Store;
