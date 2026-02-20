import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useNotifications } from "@/hooks/useNotifications";
import { supabase } from "@/integrations/supabase/client";
import { listings } from "@/data/listings";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { ArrowRight, LogIn } from "lucide-react";

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
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastSignIn, setLastSignIn] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("last_sign_in_at, avatar_url")
        .eq("user_id", user.id)
        .single();
      if (data?.last_sign_in_at) setLastSignIn(data.last_sign_in_at);
      if (data?.avatar_url) setAvatarUrl(data.avatar_url);

      await supabase
        .from("profiles")
        .update({ last_sign_in_at: new Date().toISOString() })
        .eq("user_id", user.id);
    };

    fetchAppointments();
    fetchProfile();
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

  return (
    <main className="pt-20 md:pt-24">
      <section className="container px-4 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        <DashboardHeader
          user={user}
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          lastSignIn={lastSignIn}
          avatarUrl={avatarUrl}
          onAvatarUpdate={setAvatarUrl}
        />
        <DashboardTabs
          appointments={appointments}
          setAppointments={setAppointments}
          favoriteListings={favoriteListings}
          userId={user.id}
        />
      </section>
    </main>
  );
};

export default Dashboard;
