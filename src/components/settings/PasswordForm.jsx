"use client"
import { EyeOff,Eye,XCircle,Lock,Loader2,CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { getPasswordStrength } from "@/utils/Helpers";
import { useForm } from "react-hook-form";
const PasswordForm = ({ onSubmit, isLoading }) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const passwordValidation = {
  currentPassword: {
    required: "Current password is required",
  },
  newPassword: {
    required: "New password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" },
  },
  confirmPassword: {
    required: "Please confirm your password",
  },
};


  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Lock className="w-4 h-4 text-gray-500" />
          Current Password
        </label>
        <div className="relative">
          <input
            {...register("currentPassword", passwordValidation.currentPassword)}
            type={showPasswords.current ? "text" : "password"}
            placeholder="Enter your current password"
            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords((p) => ({ ...p, current: !p.current }))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPasswords.current ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Lock className="w-4 h-4 text-purple-400" />
          New Password
        </label>
        <div className="relative">
          <input
            {...register("newPassword", passwordValidation.newPassword)}
            type={showPasswords.new ? "text" : "password"}
            placeholder="Enter your new password"
            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPasswords.new ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {errors.newPassword.message}
          </p>
        )}

        {newPassword && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${passwordStrength.color} transition-all duration-300`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-400">
                {passwordStrength.label}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Use 10+ characters with uppercase, numbers & symbols
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <CheckCircle2 className="w-4 h-4 text-gray-500" />
          Confirm New Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPasswords.confirm ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {errors.confirmPassword.message}
          </p>
        )}

        {confirmPassword && (
          <div
            className={`flex items-center gap-2 text-sm ${
              newPassword === confirmPassword
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {newPassword === confirmPassword ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Passwords match
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Passwords do not match
              </>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 transition-all"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Lock className="w-5 h-5" />
        )}
        Update Password
      </button>
    </form>
  );
};
export default PasswordForm;