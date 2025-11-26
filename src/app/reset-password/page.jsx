"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useResetPassword } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (data) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    mutate(
      { ...data, token }
    );
  };

  const password = watch("password");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Set new password
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your new password below and confirm it to reset your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isPending ? "Resetting..." : "Reset Password"}
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
      </div>
    </main>
  );
}
 