import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Clock, MessageCircle, ArrowRight, LogIn } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, isBefore, startOfDay, format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  listingId?: string;
  listingTitle?: string;
  whatsappNumber?: string;
}

const ADMIN_WHATSAPP = "09037098493";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const AppointmentModal = ({
  open,
  onClose,
  listingId = "",
  listingTitle = "a Comfyville property",
  whatsappNumber,
}: AppointmentModalProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const adminNumber = whatsappNumber || ADMIN_WHATSAPP;
  const tomorrow = addDays(startOfDay(new Date()), 1);

  const handleConfirm = async () => {
    if (!date || !time || !name) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!user) {
      toast.error("Please sign in to book an appointment.");
      return;
    }

    setSaving(true);

    // Save to database
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      listing_id: listingId,
      listing_title: listingTitle,
      appointment_date: format(date, "yyyy-MM-dd"),
      appointment_time: time,
      name,
      phone: phone || null,
    });

    if (error) {
      toast.error("Failed to save appointment. Please try again.");
      setSaving(false);
      return;
    }

    // Open WhatsApp
    const formattedDate = format(date, "EEEE, MMMM d, yyyy");
    const message = `Hi Comfyville! I'd like to schedule a viewing appointment.\n\n📍 Property: ${listingTitle}\n📅 Date: ${formattedDate}\n🕐 Time: ${time}\n👤 Name: ${name}${phone ? `\n📞 Phone: ${phone}` : ""}\n\nPlease confirm this appointment. Thank you!`;

    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Appointment booked! Redirecting to WhatsApp to confirm.");
    setSaving(false);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setDate(undefined);
    setTime(undefined);
    setName("");
    setPhone("");
    setStep(1);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/auth");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
              <div>
                <p className="text-primary text-[10px] font-medium tracking-[0.3em] uppercase">Schedule</p>
                <h2 className="font-display text-xl font-semibold text-foreground">Book a Viewing</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Not logged in */}
              {!user ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-6">
                  <LogIn size={40} className="mx-auto text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">Sign in Required</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Please sign in or create an account to schedule a viewing appointment.
                  </p>
                  <button
                    onClick={handleLoginRedirect}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Sign In <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Step indicators */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          s <= step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Step 1: Date */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-foreground">
                        <CalendarDays size={16} className="text-primary" />
                        <p className="text-sm font-medium">Select a date</p>
                      </div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => isBefore(d, tomorrow)}
                        className="rounded border border-border pointer-events-auto mx-auto"
                      />
                      <button
                        onClick={() => date && setStep(2)}
                        disabled={!date}
                        className="w-full bg-primary text-primary-foreground py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Continue <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Time */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock size={16} className="text-primary" />
                        <p className="text-sm font-medium">
                          Select a time — {date && format(date, "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={`px-3 py-2.5 rounded text-xs font-medium tracking-wide transition-all duration-300 ${
                              time === slot
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 border border-border py-3 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300 tracking-wide uppercase"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => time && setStep(3)}
                          disabled={!time}
                          className="flex-1 bg-primary text-primary-foreground py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Continue <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Details & Confirm */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="bg-muted rounded p-4 space-y-2">
                        <p className="text-xs text-muted-foreground tracking-wide uppercase">Appointment Summary</p>
                        <p className="text-sm text-foreground font-medium">
                          {date && format(date, "EEEE, MMMM d, yyyy")} at {time}
                        </p>
                        <p className="text-xs text-muted-foreground font-light">{listingTitle}</p>
                      </div>

                      <div>
                        <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          required
                          maxLength={100}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                          Phone Number (optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+234 903 709 8493"
                          maxLength={20}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setStep(2)}
                          className="flex-1 border border-border py-3 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300 tracking-wide uppercase"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirm}
                          disabled={!name.trim() || saving}
                          className="flex-1 bg-[#25D366] text-white py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-[#25D366]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={16} />
                          {saving ? "Saving..." : "Confirm via WhatsApp"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
