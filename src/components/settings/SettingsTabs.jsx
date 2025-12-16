"use client"
import { Shield,User } from "lucide-react";
const SettingsTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
    <button
      onClick={() => setActiveTab("profile")}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
        activeTab === "profile"
          ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <User className="w-4 h-4" />
      Profile
    </button>
    <button
      onClick={() => setActiveTab("security")}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
        activeTab === "security"
          ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Shield className="w-4 h-4" />
      Security
    </button>
  </div>
);

export default SettingsTabs