import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  CalendarDays, Users, MessageSquare, Mail, Shield, ArrowRight,
  LogIn, Clock, XCircle, CheckCircle, Loader2, Search, Download,
  ChevronDown, Image
} from "lucide-react";
import ServiceImageManager from "@/components/admin/ServiceImageManager";
import { toast } from "sonner";

interface AdminAppointment {
  id: string;
  listing_title: string;
  appointment_date: string;
  appointment_time: string;
  name: string;
  phone: string | null;
  status: string;
  created_at: string;
  user_id: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface ChatLog {
  id: string;
  user_email: string | null;
  messages: any;
  created_at: string;
  updated_at: string;
}

const statusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-green-500/10 text-green-600";
    case "cancelled": return "bg-destructive/10 text-destructive";
    default: return "bg-primary/10 text-primary";
  }
};

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"appointments" | "subscribers" | "chats" | "listings">("appointments");
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedChat, setExpandedChat] = useState<string | null>(null);

  // Check admin role
  useEffect(() => {
    if (!user) return;
    const checkAdmin = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, [user]);

  // Fetch data once admin confirmed
  useEffect(() => {
    if (!isAdmin) return;
    const fetchAll = async () => {
      setLoadingData(true);
      const [apptRes, subRes, chatRes] = await Promise.all([
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
        supabase.from("chat_logs").select("*").order("updated_at", { ascending: false }).limit(100),
      ]);
      if (apptRes.data) setAppointments(apptRes.data);
      if (subRes.data) setSubscribers(subRes.data);
      if (chatRes.data) setChatLogs(chatRes.data);
      setLoadingData(false);
    };
    fetchAll();
  }, [isAdmin]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status.");
    } else {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      toast.success(`Appointment ${newStatus}.`);
    }
    setUpdatingId(null);
  };

  const exportSubscribers = () => {
    const csv = ["Email,Subscribed At,Active"]
      .concat(subscribers.map((s) => `${s.email},${s.subscribed_at},${s.is_active}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <LogIn size={40} className="mx-auto text-primary" />
          <h1 className="font-display text-2xl font-semibold text-foreground">Sign in to access admin</h1>
          <Link to="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300">
            Sign In <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    );
  }

  if (isAdmin === null) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <Shield size={40} className="mx-auto text-destructive" />
          <h1 className="font-display text-2xl font-semibold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground text-sm font-light">You don't have admin privileges.</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300">
            Go to Dashboard <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    );
  }

  const filteredAppointments = appointments.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.listing_title.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: "appointments" as const, label: "Appointments", icon: CalendarDays, count: appointments.length },
    { key: "subscribers" as const, label: "Subscribers", icon: Mail, count: subscribers.length },
    { key: "chats" as const, label: "Chat Logs", icon: MessageSquare, count: chatLogs.length },
    { key: "listings" as const, label: "Listings", icon: Users, count: 6 },
  ];

  return (
    <main className="pt-20 md:pt-24">
      <section className="container px-4 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden luxury-section-dark p-4 sm:p-6 md:p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-primary/70 text-[10px] font-medium tracking-[0.3em] uppercase">Admin Panel</p>
              <h1 className="font-display text-xl sm:text-2xl font-semibold text-white">Comfyville Admin</h1>
            </div>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Appointments", value: appointments.length, color: "text-primary" },
              { label: "Subscribers", value: subscribers.length, color: "text-green-400" },
              { label: "Chat Sessions", value: chatLogs.length, color: "text-blue-400" },
              { label: "Pending", value: appointments.filter((a) => a.status === "pending").length, color: "text-amber-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center">
                <p className={`font-display text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-white/50 text-[10px] sm:text-xs tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-full overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none px-3 sm:px-5 py-2.5 rounded text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={14} className="inline mr-1.5" />
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search */}
        {activeTab === "appointments" && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        )}

        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <>
            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="luxury-card p-12 text-center">
                    <CalendarDays size={36} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-light">No appointments found.</p>
                  </div>
                ) : (
                  filteredAppointments.map((appt) => (
                    <div key={appt.id} className="luxury-card p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <p className="font-display text-sm sm:text-base font-semibold text-foreground truncate">{appt.listing_title}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Users size={12} /> {appt.name}</span>
                            <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {format(new Date(appt.appointment_date), "MMM d, yyyy")}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} /> {appt.appointment_time}</span>
                            {appt.phone && <span>📞 {appt.phone}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full tracking-wide uppercase ${statusColor(appt.status)}`}>
                            {appt.status}
                          </span>
                          {appt.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(appt.id, "confirmed")}
                                disabled={updatingId === appt.id}
                                className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-500 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle size={14} /> Confirm
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appt.id, "cancelled")}
                                disabled={updatingId === appt.id}
                                className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                              >
                                <XCircle size={14} /> Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Subscribers Tab */}
            {activeTab === "subscribers" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={exportSubscribers}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors border border-primary/30 px-4 py-2 rounded-lg"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                {subscribers.length === 0 ? (
                  <div className="luxury-card p-12 text-center">
                    <Mail size={36} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-light">No subscribers yet.</p>
                  </div>
                ) : (
                  <div className="luxury-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 sm:p-4 text-xs font-medium text-muted-foreground tracking-wider uppercase">Email</th>
                            <th className="text-left p-3 sm:p-4 text-xs font-medium text-muted-foreground tracking-wider uppercase">Date</th>
                            <th className="text-left p-3 sm:p-4 text-xs font-medium text-muted-foreground tracking-wider uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((sub) => (
                            <tr key={sub.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                              <td className="p-3 sm:p-4 text-foreground font-medium">{sub.email}</td>
                              <td className="p-3 sm:p-4 text-muted-foreground">{format(new Date(sub.subscribed_at), "MMM d, yyyy")}</td>
                              <td className="p-3 sm:p-4">
                                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase ${sub.is_active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                                  {sub.is_active ? "Active" : "Inactive"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Chat Logs Tab */}
            {activeTab === "chats" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {chatLogs.length === 0 ? (
                  <div className="luxury-card p-12 text-center">
                    <MessageSquare size={36} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-light">No chat conversations yet.</p>
                  </div>
                ) : (
                  chatLogs.map((log) => (
                    <div key={log.id} className="luxury-card overflow-hidden">
                      <button
                        onClick={() => setExpandedChat(expandedChat === log.id ? null : log.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{log.user_email || "Unknown user"}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Clock size={11} /> {format(new Date(log.updated_at), "MMM d, yyyy HH:mm")}
                            <span className="ml-2">{Array.isArray(log.messages) ? log.messages.length : 0} messages</span>
                          </p>
                        </div>
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expandedChat === log.id ? "rotate-180" : ""}`} />
                      </button>
                      {expandedChat === log.id && Array.isArray(log.messages) && (
                        <div className="border-t border-border p-4 space-y-2 max-h-80 overflow-y-auto bg-muted/20">
                          {log.messages.map((msg: any, i: number) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Listings Tab */}
            {activeTab === "listings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="luxury-card p-8 text-center">
                  <Eye size={36} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Listings Management</h3>
                  <p className="text-sm text-muted-foreground font-light mb-4">
                    Listings are currently managed through the codebase. Database-driven listings management coming soon.
                  </p>
                  <Link
                    to="/listings"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
                  >
                    View Current Listings <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
