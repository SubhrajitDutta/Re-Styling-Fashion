import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Lock, User as UserIcon, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Mode = "login" | "signup" | "forgot";

export function AuthModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [identifier, setIdentifier] = useState<"email" | "phone">("email");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-strong rounded-3xl overflow-hidden glow"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blush-grad opacity-30 blur-3xl animate-blob" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-hero opacity-40 blur-3xl animate-blob" />

            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full hover:bg-white/10">
              <X className="w-4 h-4" />
            </button>

            <div className="relative p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blush-grad grid place-items-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-extrabold">Re-Stylin</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-3xl font-display font-extrabold mb-1">
                    {mode === "login" && <>Welcome <span className="text-gradient">Back</span></>}
                    {mode === "signup" && <>Join the <span className="text-gradient">Drop</span></>}
                    {mode === "forgot" && <>Reset <span className="text-gradient">Access</span></>}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {mode === "login" && "Log in to your closet"}
                    {mode === "signup" && "Create your Re-Stylin account in seconds"}
                    {mode === "forgot" && "We'll send a code to reset your password"}
                  </p>

                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    {mode === "signup" && (
                      <Field icon={UserIcon} placeholder="Full name" />
                    )}

                    <div className="flex gap-2 mb-1 text-xs">
                      <button type="button" onClick={() => setIdentifier("email")}
                        className={`px-3 py-1 rounded-full ${identifier === "email" ? "bg-blush-grad text-white" : "glass"}`}>
                        Email
                      </button>
                      <button type="button" onClick={() => setIdentifier("phone")}
                        className={`px-3 py-1 rounded-full ${identifier === "phone" ? "bg-blush-grad text-white" : "glass"}`}>
                        Mobile
                      </button>
                    </div>

                    <Field
                      icon={identifier === "email" ? Mail : Phone}
                      placeholder={identifier === "email" ? "you@email.com" : "+91 98xxxxxx"}
                      type={identifier === "email" ? "email" : "tel"}
                    />

                    {mode !== "forgot" && <Field icon={Lock} placeholder="Password" type="password" />}
                    {mode === "signup" && <Field icon={Lock} placeholder="Confirm password" type="password" />}

                    <button className="w-full mt-2 group flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-blush-grad text-white font-semibold glow hover:scale-[1.02] transition">
                      {mode === "login" && "Log in"}
                      {mode === "signup" && "Create account"}
                      {mode === "forgot" && "Send reset code"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    {mode === "login" && (
                      <>
                        <button onClick={() => setMode("forgot")} className="hover:text-foreground underline-offset-4 hover:underline">Forgot password?</button>
                        <div className="mt-2">
                          New here?{" "}
                          <button onClick={() => setMode("signup")} className="text-gradient font-semibold">Sign up</button>
                        </div>
                      </>
                    )}
                    {mode === "signup" && (
                      <>Already have an account?{" "}
                        <button onClick={() => setMode("login")} className="text-gradient font-semibold">Log in</button>
                      </>
                    )}
                    {mode === "forgot" && (
                      <button onClick={() => setMode("login")} className="text-gradient font-semibold">Back to login</button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ icon: Icon, ...props }: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        {...props}
        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-input/60 border border-border focus:border-primary outline-none transition text-sm"
      />
    </div>
  );
}
