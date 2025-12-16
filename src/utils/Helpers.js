export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getUserTypeLabel = (type) => {
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
    default:
      return {
        label: "Free",
        color: "text-gray-400",
        bg: "bg-white/5 border-white/10",
        icon: "👤",
      };
  }
};

export const getPasswordStrength = (password) => {
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
  if (score <= 4) return { score: 80, label: "Strong", color: "bg-green-500" };
  return { score: 100, label: "Excellent", color: "bg-emerald-500" };
};
