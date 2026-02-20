import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { Bell, Camera, Clock, CalendarDays, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Notification } from "@/hooks/useNotifications";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardHeaderProps {
  user: User;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  lastSignIn: string | null;
  avatarUrl?: string | null;
  onAvatarUpdate?: (url: string) => void;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const getInitials = (user: User) => {
  const name = user.user_metadata?.display_name || user.email || "";
  return name
    .split(/[\s@]/)
    .slice(0, 2)
    .map((s: string) => s[0]?.toUpperCase())
    .join("");
};

const DashboardHeader = ({ user, notifications, unreadCount, markAsRead, markAllAsRead, lastSignIn, avatarUrl, onAvatarUpdate }: DashboardHeaderProps) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "User";

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB.");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${ext}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Add cache-buster
      const url = `${publicUrl}?t=${Date.now()}`;

      // Update profile
      await supabase
        .from("profiles")
        .update({ avatar_url: url })
        .eq("user_id", user.id);

      onAvatarUpdate?.(url);
      toast.success("Profile picture updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload photo.");
    } finally {
      setUploading(false);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden luxury-section-dark p-4 sm:p-6 md:p-8"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-start justify-between gap-3 sm:gap-4">
        {/* Left: Avatar + Greeting */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="gold-gradient-text text-lg sm:text-xl md:text-2xl font-display font-bold">
                  {getInitials(user)}
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
            </button>
          </div>

          <div className="min-w-0">
            <p className="text-primary/70 text-[10px] font-medium tracking-[0.3em] uppercase mb-0.5">Dashboard</p>
            <h1 className="font-display text-base sm:text-xl md:text-2xl font-semibold text-white truncate">
              {getGreeting()}, <span className="gold-gradient-text">{displayName}</span>
            </h1>
            {lastSignIn && (
              <p className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/50 mt-1 font-light">
                <Clock size={11} />
                <span className="hidden sm:inline">Last login:</span> {format(new Date(lastSignIn), "dd/MM/yy HH:mm")}
              </p>
            )}
          </div>
        </div>

        {/* Right: Notifications + History */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/30 transition-all"
          >
            <Bell size={16} className="sm:w-[18px] sm:h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] sm:text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/30 transition-all">
            <CalendarDays size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {showNotifs && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="absolute top-full right-2 sm:right-4 mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[24rem] bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
              <h3 className="font-display text-sm font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-medium text-primary hover:underline uppercase tracking-wider"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setShowNotifs(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground font-light">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`w-full text-left p-3 sm:p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${
                      !n.is_read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.is_read ? "bg-primary" : "bg-transparent"}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {format(new Date(n.created_at), "MMM d, HH:mm")}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardHeader;
