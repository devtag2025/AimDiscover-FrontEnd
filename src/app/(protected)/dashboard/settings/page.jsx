"use client";

import React, { useState, useEffect } from "react";
import { useUpdateProfile, useChangePassword, useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/stores/authStore";
import { 
  User, Lock, Sparkles, Loader2, ShieldCheck, Mail, Globe, CheckCircle2, XCircle, ChevronRight, Settings 
} from "lucide-react";
import toast from "react-hot-toast";
import PasswordForm from "@/components/settings/PasswordForm";
import ProfileForm from "@/components/settings/ProfileForm";
import ProfileView from "@/components/settings/ProfileView";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const setUser = useAuthStore((s) => s.setUser);
  
  const user = profileData?.data?.data?.user;


  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const handleProfileUpdate = async (data) => {
    const updates = {};
    if (data.name?.trim().length >= 2) updates.name = data.name.trim();
    if (data.email?.trim().length > 0) updates.email = data.email.trim();

    if (Object.keys(updates).length === 0) return;

    try {
      await updateProfile.mutateAsync(updates);
      setIsEditingProfile(false);
      toast.success("Profile synced successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handlePasswordChange = async (data) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Security updated");
    } catch (error) {
      toast.error("Password change failed");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-purple-500/30 font-sans relative">
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Settings className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Control Center</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-white">
                    Settings
                </h1>
            </div>

            {/* Profile Completion Widget */}
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" 
                            strokeDasharray={125.6} 
                            strokeDashoffset={125.6 - (125.6 * 0.75)} 
                            className="text-purple-500 transition-all duration-1000"
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold">75%</span>
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">Profile Strength</p>
                    <p className="text-xs text-zinc-500">Add phone for 100%</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          
          {/* Navigation */}
          <aside>
            <nav className="flex lg:flex-col gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm lg:sticky lg:top-8">
              <TabButton 
                isActive={activeTab === "profile"} 
                onClick={() => setActiveTab("profile")} 
                icon={User} 
                label="Identity" 
              />
              <TabButton 
                isActive={activeTab === "security"} 
                onClick={() => setActiveTab("security")} 
                icon={ShieldCheck} 
                label="Security" 
              />
            </nav>
          </aside>

          {/* Main Area */}
          <main className="space-y-8">
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                
                {/* Information Card */}
                <div className="group bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden transition-all hover:border-purple-500/30 shadow-2xl">
                  <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Public Profile</h2>
                        <p className="text-zinc-500">Information visible to other users.</p>
                    </div>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  
                  <div className="p-8 md:p-10">
                    {isEditingProfile ? (
                      <ProfileForm
                        user={user}
                        onSubmit={handleProfileUpdate}
                        isLoading={updateProfile.isPending}
                        onCancel={() => setIsEditingProfile(false)}
                      />
                    ) : (
                      <ProfileView user={user} />
                    )}
                  </div>
                </div>

                {/* Account Status Tip */}
                <div className="p-6 rounded-[24px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/5 flex gap-5 items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-purple-400">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-zinc-400 max-w-md">
                        Your account is currently <span className="text-white font-medium">Pro Active</span>. You have access to all premium dashboard features.
                    </p>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                
                {/* Password Section */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Password Settings</h2>
                    </div>
                    <div className="max-w-xl">
                        <PasswordForm onSubmit={handlePasswordChange} isLoading={changePassword.isPending} />
                    </div>
                </div>

                <ConnectedAccounts user={user} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// --- Internal UI Components ---

function TabButton({ isActive, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 w-full
        ${isActive 
          ? "bg-white text-black shadow-xl" 
          : "text-zinc-500 hover:text-white hover:bg-white/5"
        }
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-zinc-500"}`} />
      <span className="font-bold text-sm tracking-tight">{label}</span>
      {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
    </button>
  );
}

function ConnectedAccounts({ user }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
      <div className="p-8 md:p-10 border-b border-white/5">
         <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Auth Channels</h2>
        </div>
        <p className="text-zinc-500">Secure connection methods for your account.</p>
      </div>
      
      <div className="divide-y divide-white/5">
        <AccountRow 
            icon={Mail} 
            title="Email Signature" 
            subtitle={user?.email} 
            active={user?.is_email_verified} 
        />
        <AccountRow 
            isGoogle 
            title="Google SSO" 
            subtitle={user?.google_id ? "Linked" : "No link found"} 
            active={!!user?.google_id} 
        />
      </div>
    </div>
  );
}

function AccountRow({ icon: Icon, title, subtitle, active, isGoogle = false }) {
  return (
    <div className="p-8 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
          {isGoogle ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.227 2.107-2.08 2.707-5.027 2.707-7.427 0-.747-.053-1.467-.16-2.147H12.48z" />
            </svg>
          ) : (
            <Icon className="w-6 h-6 text-zinc-400" />
          )}
        </div>
        <div>
          <p className="font-bold text-white tracking-tight">{title}</p>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border
        ${active ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-zinc-500/10 border-white/5 text-zinc-500"}
      `}>
        {active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {active ? "ACTIVE" : "DISABLED"}
      </div>
    </div>
  );
}