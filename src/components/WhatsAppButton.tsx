import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "2349037098493";

const WhatsAppButton = () => {
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPlayedSound.current) {
        hasPlayedSound.current = true;
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 880;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
        } catch {
          // Audio not available
        }
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Comfyville! I'm interested in your luxury spaces."
  )}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-[pulse_3s_ease-in-out_infinite]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </motion.a>
  );
};

export default WhatsAppButton;
