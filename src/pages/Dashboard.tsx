import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { listings } from "@/data/listings";
import { CalendarDays, Heart, Clock, MapPin, ArrowRight, Star, Users, LogIn } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  listing_id: string;
  listing_title: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"appointments" | "favorites">("appointments");

  useEffect(() => {
    if (!user) return;
    const fetchAppointments = async () => {
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: true });
      if (data) setAppointments(data);
    };
    fetchAppointments();
  }, [user]);

  if (!user) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <LogIn size={40} className="mx-auto text-primary" />
          <h1 className="font-display text-2xl font-semibold text-foreground">Sign in to view your dashboard</h1>
          <p className="text-muted-foreground text-sm font-light">
            Your appointments and favorites are waiting for you.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
          >
            Sign In <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    );
  }

  const favoriteListings = listings.filter((l) =>
    favorites.some((f: any) => f.listing_id === l.id)
  );

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-600";
      case "cancelled": return "bg-destructive/10 text-destructive";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <main className="pt-20 md:pt-24">
      <section className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-[10px] font-medium tracking-[0.3em] uppercase mb-2">Dashboard</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Welcome, {user.user_metadata?.display_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-light">
            Manage your appointments and favorite spaces.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-8 mb-6 bg-muted rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-5 py-2.5 rounded text-sm font-medium tracking-wide transition-all duration-300 ${
              activeTab === "appointments"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarDays size={14} className="inline mr-2" />
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-5 py-2.5 rounded text-sm font-medium tracking-wide transition-all duration-300 ${
              activeTab === "favorites"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart size={14} className="inline mr-2" />
            Favorites ({favoriteListings.length})
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {appointments.length === 0 ? (
              <div className="luxury-card p-12 text-center">
                <CalendarDays size={40} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">No appointments yet</h3>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  Browse our spaces and schedule a viewing.
                </p>
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
                >
                  Explore Spaces <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              appointments.map((appt, i) => (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="luxury-card p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <Link
                        to={`/listings/${appt.listing_id}`}
                        className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {appt.listing_title}
                      </Link>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {format(new Date(appt.appointment_date), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {appt.appointment_time}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full tracking-wide uppercase w-fit ${statusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {favoriteListings.length === 0 ? (
              <div className="luxury-card p-12 text-center">
                <Heart size={40} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  Tap the heart icon on any listing to save it here.
                </p>
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
                >
                  Browse Spaces <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteListings.map((listing, i) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to={`/listings/${listing.id}`} className="group block luxury-card overflow-hidden rounded-lg">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1">
                          <Star size={11} className="text-primary fill-primary" />
                          {listing.rating}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={12} />
                          <span className="text-xs tracking-wide uppercase font-light">{listing.location}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                          {listing.title}
                        </h3>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <p className="text-sm font-semibold text-foreground">
                            ${listing.price} <span className="text-muted-foreground font-light text-xs">/ night</span>
                          </p>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Users size={12} /> {listing.guests} guests
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
