"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfile,useChangePassword,useProfile } from "@/hooks/useProfile";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  CheckCircle2,
  XCircle,
  Crown,
  Settings as SettingsIcon,
  Sparkles,
  AlertCircle,
  CreditCard,
  Edit3,
  X,
  Info,
  RefreshCw,
  Check,
} from "lucide-react";
import PasswordForm from "@/components/settings/PasswordForm";
import ProfileForm from "@/components/settings/ProfileForm";
import ProfileView from "@/components/settings/ProfileView";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import UserOverviewCard from "@/components/settings/UserOverviewCard";
import { useAuthStore } from "@/stores/authStore";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const setUser = useAuthStore((s) => s.setUser);
  const user = profileData?.data?.data.user;
  if(user){
    setUser(user)
  }
  const getProfileCompleteness = () => {
    let score = 0;
    let total = 3;
    if (user?.name) score++;
    if (user?.email) score++;
    if (user?.is_email_verified) score++;
    return Math.round((score / total) * 100);
  };

  const handleProfileUpdate = async (data) => {

    const updates = {};

    if (data.name && data.name.trim().length >= 2) {
      updates.name = data.name.trim();
    }
 
    if (data.email && data.email.trim().length > 0) {
      updates.email = data.email.trim();
    }

    if (Object.keys(updates).length === 0) {
      console.warn("No valid changes to update");
      return;
    }

    
    try {
      await updateProfile.mutateAsync(updates);
      setIsEditingProfile(false);
    } catch (error) {
      console.error(" Profile update failed:", error);
    }
  };

  const handlePasswordChange = async (data) => {
  
    
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    } catch (error) {
      console.error(" Password change failed:", error);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <SettingsHeader profileCompleteness={getProfileCompleteness()} />

        {profileLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-500 mt-6">Loading your profile...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <UserOverviewCard user={user} />
            <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-purple-400" />
                      <div>
                        <h3 className="font-semibold text-white">
                          Profile Information
                        </h3>
                        <p className="text-xs text-gray-500">
                          Update your personal details
                        </p>
                      </div>
                    </div>

                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="p-6">
                    {isEditingProfile ? (
                      <ProfileForm
                        user={user}
                        onSubmit={handleProfileUpdate}
                        isLoading={false}
                        onCancel={() => setIsEditingProfile(false)}
                      />
                    ) : (
                      <ProfileView user={user} />
                    )}
                  </div>
                </div>

                {user?.google_id && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 border border-purple-500/20">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-purple-500/20">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-purple-300">
                          Google Account Connected
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Your account is linked to Google. Profile picture and
                          some details sync automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!user?.is_email_verified && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-amber-500/20">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-amber-300">
                          Verify Your Email
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Please verify your email to unlock all features.
                        </p>
                        <button className="mt-3 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-amber-400 font-medium hover:bg-amber-500/30 transition-all">
                          Resend Verification Email
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5">
                    <Lock className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Change Password
                      </h3>
                      <p className="text-xs text-gray-500">
                        Update your password to keep your account secure
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <PasswordForm
                      onSubmit={handlePasswordChange}
                      isLoading={false}
                    />
                  </div>
                </div>

                 <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h4 className="font-semibold text-white">
                      Authentication Methods
                    </h4>
                    <p className="text-xs text-gray-500">
                      Manage how you sign in to your account
                    </p>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Email & Password Authentication */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${user?.is_email_verified ? 'bg-emerald-500/20' : 'bg-gray-500/20'}`}>
                          <Mail className={`w-5 h-5 ${user?.is_email_verified ? 'text-emerald-400' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            Email & Password
                          </div>
                          <div className="text-xs text-gray-500">
                            {user?.is_email_verified ? 'Sign in with your email' : 'is_email_verified not set'}
                          </div>
                        </div>
                      </div>
                      {user?.is_email_verified ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">Linked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-500/20 border border-gray-500/30">
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-xs font-medium text-gray-400">Not Linked</span>
                        </div>
                      )}
                    </div>

                    {/* Google Authentication */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${user?.google_id ? 'bg-blue-500/20' : 'bg-gray-500/20'}`}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                              fill={user?.google_id ? "#4285F4" : "#6B7280"}
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill={user?.google_id ? "#34A853" : "#6B7280"}
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill={user?.google_id ? "#FBBC05" : "#6B7280"}
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill={user?.google_id ? "#EA4335" : "#6B7280"}
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-white">Google</div>
                          <div className="text-xs text-gray-500">
                            {user?.google_id ? 'Connected to your Google account' : 'Link your Google account'}
                          </div>
                        </div>
                      </div>
                      {user?.google_id ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">Connected</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-500/20 border border-gray-500/30">
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-xs font-medium text-gray-400">Not Linked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
           
          )}
      </div>
    </div>
  );
}