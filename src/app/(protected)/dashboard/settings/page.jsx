"use client";
import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Mail,
  Save,
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
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useProfile,
  useChangePassword,
  useUpdateProfile,
} from "@/hooks/useProfile";

export default function Settings() {
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const user = profileData?.data?.data.user;
  console.log(user);
  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileInitialized, setProfileInitialized] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Initialize form with user data
  useEffect(() => {
    if (user && !profileInitialized) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfileInitialized(true);
    }
  }, [user, profileInitialized]);

  const hasProfileChanges =
    name !== (user?.name || "") || email !== (user?.email || "");

  const getProfileCompleteness = () => {
    let score = 0;
    let total = 3;
    if (user?.name) score++;
    if (user?.email) score++;
    if (user?.is_email_verified) score++;
    return Math.round((score / total) * 100);
  };

  const profileCompleteness = getProfileCompleteness();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

const payload = {};
if (name?.trim()) payload.name = name.trim();
if (email?.trim()) payload.email = email.trim();

if (Object.keys(payload).length === 0) {
  toast.info("No changes to update");
  return;
}




    try {
        console.log(payload);
    await updateProfile.mutateAsync(payload);
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditingProfile(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword.mutateAsync({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserTypeLabel = (type) => {
    switch (type?.toLowerCase()) {
      case "premium":
      case "pro":
        return {
          label: "Premium",
          color: "text-purple-400",
          bg: "bg-purple-500/20 border-purple-500/30",
          icon: "⭐",
        };
      case "enterprise":
        return {
          label: "Enterprise",
          color: "text-yellow-400",
          bg: "bg-yellow-500/20 border-yellow-500/30",
          icon: "🏢",
        };
      case "admin":
        return {
          label: "Admin",
          color: "text-red-400",
          bg: "bg-red-500/20 border-red-500/30",
          icon: "🛡️",
        };
      case "user":
      default:
        return {
          label: "Free",
          color: "text-gray-400",
          bg: "bg-white/5 border-white/10",
          icon: "👤",
        };
    }
  };

  // Map to schema fields
  const userType = getUserTypeLabel(user?.user_type);
  const isEmailVerified = user?.is_email_verified ?? false;
  const hasPassword = !!user?.password;
  const hasGoogleAuth = !!user?.google_id;
  const userPicture = user?.picture;
  const stripeCustomerId = user?.stripe_customer_id;
  const createdAt = user?.createdAt || user?.created_at;
  const updatedAt = user?.updatedAt || user?.updated_at;

  // Password strength calculator
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 20, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { score: 40, label: "Fair", color: "bg-orange-500" };
    if (score <= 3) return { score: 60, label: "Good", color: "bg-yellow-500" };
    if (score <= 4)
      return { score: 80, label: "Strong", color: "bg-green-500" };
    return { score: 100, label: "Excellent", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative p-3 rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg shadow-purple-500/10">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)",
                  }}
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

            {/* Profile Completeness */}
            <div className="hidden sm:block">
              <div className="text-right mb-1">
                <span className="text-xs text-gray-500">
                  Profile Completeness
                </span>
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
            {/* User Overview Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-black/80 via-purple-950/20 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    {userPicture ? (
                      <Image
                        src={
                          userPicture ||
                          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg"
                        }
                        alt={name || "User"}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-500/20 shadow-2xl shadow-purple-500/20"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-violet-600 flex items-center justify-center text-4xl font-bold text-white ring-4 ring-purple-500/20 shadow-2xl shadow-purple-500/20">
                        {name?.charAt(0)?.toUpperCase() ||
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
                        {name || "Set your name"}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${userType.bg}`}
                      >
                        <span>{userType.icon}</span>
                        <span className={userType.color}>{userType.label}</span>
                      </span>
                    </div>
                    <p className="text-gray-400">{email || "No email set"}</p>

                    {/* Quick Stats */}
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

                {/* Status Badges */}
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

            {/* Tabs */}
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

            {/* Profile Tab Content */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Information Card */}
                <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                  {/* Card Header */}
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

                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-all"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {!isEditingProfile ? (
                      /* View Mode */
                      <div className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                              Full Name
                            </label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-white">
                                {name || (
                                  <span className="text-gray-500 italic">
                                    Not set
                                  </span>
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
                                {email || (
                                  <span className="text-gray-500 italic">
                                    Not set
                                  </span>
                                )}
                              </span>
                              {isEmailVerified && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Account Info Grid */}
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
                            <div className="text-sm text-gray-300">
                              {formatDate(updatedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Edit Mode */
                      <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-6"
                      >
                        {/* Edit Mode Banner */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                          <Edit3 className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-sm text-purple-300 font-medium">
                              Editing Mode
                            </p>
                            <p className="text-xs text-gray-400">
                              Make changes to your profile information below
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          {/* Name Field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="flex items-center gap-2 text-sm font-medium text-gray-300"
                            >
                              <User className="w-4 h-4 text-purple-400" />
                              Full Name
                              <span className="text-red-400">*</span>
                            </label>
                            <input
                              id="name"
                              type="text"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            {name !== (user?.name || "") && (
                              <p className="text-xs text-purple-400 flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                Changed from: {user?.name || "empty"}
                              </p>
                            )}
                          </div>

                          {/* Email Field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="flex items-center gap-2 text-sm font-medium text-gray-300"
                            >
                              <Mail className="w-4 h-4 text-purple-400" />
                              Email Address
                              <span className="text-red-400">*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            {email !== (user?.email || "") && (
                              <p className="text-xs text-amber-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Changing email will require re-verification
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-500">
                            {hasProfileChanges ? (
                              <span className="text-amber-400">
                                You have unsaved changes
                              </span>
                            ) : (
                              "No changes made"
                            )}
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={
                                updateProfile.isPending || !hasProfileChanges
                              }
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-sm font-semibold shadow-lg shadow-purple-500/25 transition-all"
                            >
                              {updateProfile.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Additional Info Cards */}
                {hasGoogleAuth && (
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

                {!isEmailVerified && (
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
                          Please verify your email to unlock all features and
                          secure your account.
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

            {/* Security Tab Content */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password Card */}
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
                    {hasGoogleAuth && !hasPassword ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                          <Lock className="w-10 h-10 text-purple-400" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          Google Authentication
                        </h4>
                        <p className="text-gray-400 max-w-md mb-6">
                          You signed in with Google. To add password login, set
                          up a password below.
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all">
                          Set Up Password
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleChangePassword}
                        className="space-y-6"
                      >
                        {/* Current Password */}
                        <div className="space-y-2">
                          <label
                            htmlFor="currentPassword"
                            className="flex items-center gap-2 text-sm font-medium text-gray-300"
                          >
                            <Lock className="w-4 h-4 text-gray-500" />
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Enter your current password"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                          <label
                            htmlFor="newPassword"
                            className="flex items-center gap-2 text-sm font-medium text-gray-300"
                          >
                            <Lock className="w-4 h-4 text-purple-400" />
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter your new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Password Strength */}
                          {newPassword && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                    style={{
                                      width: `${passwordStrength.score}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-gray-400">
                                  {passwordStrength.label}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                Use 10+ characters with uppercase, numbers &
                                symbols for best security
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                          <label
                            htmlFor="confirmPassword"
                            className="flex items-center gap-2 text-sm font-medium text-gray-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-gray-500" />
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your new password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Password Match */}
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
                          disabled={
                            changePassword.isPending ||
                            !currentPassword ||
                            !newPassword ||
                            newPassword !== confirmPassword
                          }
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 transition-all"
                        >
                          {changePassword.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Lock className="w-5 h-5" />
                          )}
                          Update Password
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Authentication Methods */}
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
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/10">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            Email & Password
                          </div>
                          <div className="text-xs text-gray-500">
                            Traditional email login
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                          hasPassword
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {hasPassword ? "Enabled" : "Not Set"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/10">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        </div>
                        <div>
                          <div className="font-medium text-white">Google</div>
                          <div className="text-xs text-gray-500">
                            Sign in with Google
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                          hasGoogleAuth
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {hasGoogleAuth ? "Connected" : "Not Connected"}
                      </span>
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
