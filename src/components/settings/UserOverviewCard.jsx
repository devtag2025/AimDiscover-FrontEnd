"use client"
import { CreditCard,CheckCircle2,AlertCircle } from "lucide-react";
import { getUserTypeLabel } from "@/utils/Helpers";
import { formatDate } from "@/utils/Helpers";
const UserOverviewCard = ({ user }) => {
  const userType = getUserTypeLabel(user?.user_type);
  const isEmailVerified = user?.is_email_verified ?? false;
  const hasGoogleAuth = !!user?.google_id;
  const stripeCustomerId = user?.stripe_customer_id;
  const createdAt = user?.createdAt || user?.created_at;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black/80 via-purple-950/20 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="relative group">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user?.name || "User"}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-500/20 shadow-2xl shadow-purple-500/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 flex items-center justify-center text-4xl font-bold text-white ring-4 ring-purple-500/20 shadow-2xl shadow-purple-500/20">
                {user?.name?.charAt(0)?.toUpperCase() ||
                  user?.email?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>
            )}
            {isEmailVerified && (
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-black rounded-full ring-2 ring-black">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">
                {user?.name || "Set your name"}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${userType.bg}`}
              >
                <span>{userType.icon}</span>
                <span className={userType.color}>{userType.label}</span>
              </span>
            </div>
            <p className="text-gray-400">{user?.email || "No email set"}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-400">Active</span>
              </div>
              <div className="text-sm text-gray-500">
                Member since {formatDate(createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-auto flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border backdrop-blur-sm ${
              isEmailVerified
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            {isEmailVerified ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Verified
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                Unverified
              </>
            )}
          </span>

          {hasGoogleAuth && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </span>
          )}

          {stripeCustomerId && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-500/10 border border-purple-500/30 text-purple-400 backdrop-blur-sm">
              <CreditCard className="w-4 h-4" />
              Billing
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOverviewCard