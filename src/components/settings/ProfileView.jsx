"use client"
import { Mail,User,CheckCircle2,Crown,Info,RefreshCw } from "lucide-react";
import { getUserTypeLabel } from "@/utils/Helpers";
import { formatDate } from "@/utils/Helpers";
const ProfileView = ({ user }) => {
  const userType = getUserTypeLabel(user?.user_type);
  const isEmailVerified = user?.is_email_verified ?? false;
  const updatedAt = user?.updatedAt || user?.updated_at;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Full Name
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-white">
              {user?.name || (
                <span className="text-gray-500 italic">Not set</span>
              )}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-white flex-1 truncate">
              {user?.email || (
                <span className="text-gray-500 italic">Not set</span>
              )}
            </span>
            {isEmailVerified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
            <Crown className="w-3 h-3" />
            Account Type
          </div>
          <div className={`font-semibold ${userType.color}`}>
            {userType.label}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
            <Info className="w-3 h-3" />
            User ID
          </div>
          <div
            className="font-mono text-sm text-gray-300 truncate"
            title={user?.id}
          >
            {user?.id ? `${user.id.slice(0, 16)}...` : "N/A"}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
            <RefreshCw className="w-3 h-3" />
            Last Updated
          </div>
          <div className="text-sm text-gray-300">{formatDate(updatedAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView