"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] px-3 relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050505] to-[#050505] pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        {/* Outer Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500/20 to-transparent blur-xl opacity-50" />
        
        {/* Outer Border Container */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent shadow-2xl">
          {/* Inner Card */}
          <div className="relative bg-[#050509] rounded-2xl overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),rgba(255,255,255,0))]" />
            
            <div className="relative p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Reset your password
              </h1>
              <p className="text-gray-400 text-sm mb-6">
                Enter the email address associated with your account, and we&apos;ll send
                you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-gray-100 placeholder:text-gray-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative w-full overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 animate-gradient-x" />
                  <div className="relative h-full w-full rounded-xl bg-[#0A0A0E] px-4 py-3 transition-all group-hover:bg-transparent">
                    <span className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
                      {isPending ? "Sending..." : "Continue"}
                    </span>
                  </div>
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5">
                <a
                  href="/login"
                  className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Return to sign in
                </a>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                New here?{" "}
                <a href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
