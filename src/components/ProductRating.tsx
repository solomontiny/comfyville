import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface ProductRatingProps {
  listingId: string;
  listingTitle: string;
  currentRating: number;
  totalReviews: number;
}

const ProductRating = ({ listingId, listingTitle, currentRating, totalReviews }: ProductRatingProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please sign in to leave a review.");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    setSubmitted(true);
    toast.success("Review submitted! Thank you.");
  };

  return (
    <div className="space-y-6">
      {/* Existing rating summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="font-display text-4xl font-bold text-foreground">{currentRating}</p>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(currentRating) ? "text-primary fill-primary" : "text-muted-foreground/30"}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-light">{totalReviews} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((level) => {
            const pct = level === Math.round(currentRating) ? 65 : level === Math.round(currentRating) - 1 ? 20 : 5;
            return (
              <div key={level} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">{level}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="luxury-divider" />

      {/* Leave a review */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="review-form" exit={{ opacity: 0 }} className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Leave a Review</h3>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors duration-200 ${
                      star <= (hoveredStar || rating) ? "text-primary fill-primary" : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              placeholder="Share your experience with this property..."
              className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground px-6 py-3 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2"
            >
              <ThumbsUp size={14} /> Submit Review
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="review-thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="flex justify-center gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= rating ? "text-primary fill-primary" : "text-muted-foreground/30"}
                />
              ))}
            </div>
            <p className="font-display text-lg font-semibold text-foreground">Thanks for your review!</p>
            <p className="text-muted-foreground text-sm font-light mt-1">Your feedback helps other travelers.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductRating;
