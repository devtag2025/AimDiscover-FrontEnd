"use client";

import React, { useState, useEffect } from "react";
import { useUpdateProfile, useChangePassword, useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/stores/authStore";
import { 
  User, Lock, Mail, CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import ConnectedAccounts from "@/components/settings/ConnectedAccounts";
import { TabButton } from "@/components/settings/SettingsTabs";
import PasswordForm from "@/components/settings/PasswordForm";
import ProfileForm from "@/components/settings/ProfileForm";
import ProfileView from "@/components/settings/ProfileView";
import Loader from "@/components/common/Loader/Loader";

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
      toast.success("Profile updated successfully");
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
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Password change failed");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader text="Loading Settings" />
      </div>
    );
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 4;
    
    if (user?.name) completed++;
    if (user?.email) completed++;
    if (user?.is_email_verified) completed++;
    if (user?.google_id) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Settings
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>
            
            {/* Profile Completion Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="20" cy="20" r="16" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-gray-800" />
                  <circle cx="20" cy="20" r="16" fill="transparent" stroke="currentColor" strokeWidth="3" 
                    strokeDasharray={100.5} 
                    strokeDashoffset={100.5 - (100.5 * (profileCompletion / 100))} 
                    className="text-purple-500 transition-all duration-700"
                  />
                </svg>
                <span className="absolute text-xs font-semibold text-white">{profileCompletion}%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Profile complete</p>
                <p className="text-xs text-gray-400">
                  {profileCompletion === 100 ? "Looking good!" : "Almost there!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          
          {/* Navigation Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <nav className="space-y-1 bg-gray-900/50 border border-gray-800 rounded-lg p-2">
              <TabButton 
                isActive={activeTab === "profile"} 
                onClick={() => setActiveTab("profile")} 
                icon={User} 
                label="Profile" 
              />
              <TabButton 
                isActive={activeTab === "security"} 
                onClick={() => setActiveTab("security")} 
                icon={Lock} 
                label="Password & Security" 
              />
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            {activeTab === "profile" && (
              <div className="space-y-6">
                
                {/* Profile Information Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="px-6 py-5 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                      <p className="mt-1 text-sm text-gray-400">Update your account details</p>
                    </div>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  
                  <div className="px-6 py-6">
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

                {/* Account Info */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-300">Account Status</p>
                    <p className="mt-1 text-sm text-purple-400/80">
                      Your account is active and all features are available.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                
                {/* Password Section */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="px-6 py-5 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">Change Password</h2>
                    <p className="mt-1 text-sm text-gray-400">Update your password to keep your account secure</p>
                  </div>
                  <div className="px-6 py-6">
                    <PasswordForm 
                      onSubmit={handlePasswordChange} 
                      isLoading={changePassword.isPending} 
                    />
                  </div>
                </div>

                {/* Connected Accounts */}
                <ConnectedAccounts user={user} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}




