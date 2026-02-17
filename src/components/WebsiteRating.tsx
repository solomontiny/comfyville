import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const WebsiteRating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for your feedback!");
  };

  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <section className="bg-secondary py-20">
      <div className="container max-w-2xl text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-primary text-xs font-medium tracking-[0.3em] uppercase mb-3">Your Opinion Matters</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Rate Your Experience
          </h2>
          <p className="text-muted-foreground text-sm font-light mb-8">
            How would you rate your experience on our website?
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform duration-200 hover:scale-125"
                    >
                      <Star
                        size={36}
                        className={`transition-colors duration-200 ${
                          star <= (hoveredStar || rating)
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-primary font-medium h-5">
                  {labels[hoveredStar || rating] || ""}
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder="Any additional comments? (optional)"
                  className="w-full max-w-md mx-auto bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300"
                >
                  Submit Rating
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={28}
                      className={star <= rating ? "text-primary fill-primary" : "text-muted-foreground/30"}
                    />
                  ))}
                </div>
                <p className="font-display text-2xl font-semibold text-foreground">Thank You!</p>
                <p className="text-muted-foreground text-sm font-light">
                  Your {labels[rating]?.toLowerCase()} rating helps us improve.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WebsiteRating;
