import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Welcome to Comfyville!");
        navigate("/");
      }
    }

    setSubmitting(false);
  };

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <p className="text-primary text-[10px] font-medium tracking-[0.3em] uppercase mb-2">
            {isLogin ? "Welcome Back" : "Join Us"}
          </p>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-light">
            {isLogin
              ? "Sign in to book viewings and manage appointments"
              : "Create an account to start booking luxury spaces"}
          </p>
        </div>

        <div className="luxury-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium tracking-wide uppercase text-foreground mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-light"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded text-sm font-medium tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              {!submitting && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-light"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="font-medium text-primary">
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
