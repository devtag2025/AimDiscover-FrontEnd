"use client"
import { SettingsIcon } from "lucide-react";
const SettingsHeader = ({ profileCompleteness }) => (
  <div className="mb-10">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative p-3 rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg shadow-purple-500/10">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20"
            style={{ clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)" }}
          />
          <SettingsIcon className="relative z-10 w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your profile, security, and preferences
          </p>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="text-right mb-1">
          <span className="text-xs text-gray-500">Profile Completeness</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
          <span className="text-sm font-mono text-purple-400">
            {profileCompleteness}%
          </span>
        </div>
      </div>
    </div>
  </div>
);
export default SettingsHeader