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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Reset your password
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter the email address associated with your account, and we’ll send
          you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
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
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isPending ? "Sending..." : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <a
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Return to sign in
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          New here?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Create account
          </a>
        </div>
      </div>
    </main>
  );
}
