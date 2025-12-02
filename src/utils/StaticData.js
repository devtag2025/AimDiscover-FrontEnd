import {
  ArrowRight,
  TrendingUp,
  Globe2,
  BarChart3,
  Sparkles,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Rocket,
 Brain,Boxes,Target,Eye
} from "lucide-react";
import { IconHome } from "@tabler/icons-react";
export const markets = [
    {
      id: "north-america",
      name: "NORTH AMERICA",
      flag: "🇺🇸",
      products: "15K+",
    },
    { id: "south-america", name: "SOUTH AMERICA", flag: "🇧🇷", products: "8K+" },
    { id: "europe", name: "EUROPE", flag: "🇪🇺", products: "12K+" },
    { id: "asia", name: "ASIA", flag: "🇯🇵", products: "20K+" },
    { id: "australia", name: "AUSTRALIA", flag: "🇦🇺", products: "5K+" },
  ];

 export const features = [
    {
      icon: Brain,
      title: "AI-POWERED INSIGHTS",
      description:
        "Machine learning algorithms analyze millions of data points to surface the best opportunities",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: BarChart3,
      title: "MARKET ANALYTICS",
      description:
        "Real-time data on trends, competition, pricing, and demand across every major marketplace",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: Boxes,
      title: "3D MOCKUP GENERATOR",
      description:
        "Create photorealistic product visualizations in seconds to test concepts before manufacturing",
      color: "from-purple-600 to-violet-700",
    },
  ];

 export const stats = [
    { value: "50K+", label: "PRODUCTS TRACKED", icon: Boxes },
    { value: "180+", label: "COUNTRIES COVERED", icon: Globe2 },
    { value: "98%", label: "ACCURACY RATE", icon: Target },
    { value: "24/7", label: "LIVE MONITORING", icon: Eye },
  ];

 export const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Entrepreneur",
      avatar: "👩‍💼",
      quote:
        "Found 3 winning products in my first week. Revenue increased 240% in just 2 months!",
      metric: "+240% Revenue",
    },
    {
      name: "Marcus Johnson",
      role: "Product Developer",
      avatar: "👨‍💻",
      quote:
        "The market intelligence is unmatched. Saved me from launching 2 products that would've flopped.",
      metric: "Saved $50K+",
    },
    {
      name: "Elena Rodriguez",
      role: "Amazon Seller",
      avatar: "👩‍🔬",
      quote:
        "Best investment I've made. The 3D mockup feature alone is worth the subscription.",
      metric: "5/5 Stars",
    },
  ];

 export const benefits = [
    "Real-time market trend analysis",
    "Competition tracking & insights",
    "Profit margin calculators",
    "Supplier recommendations",
    "SEO keyword research",
    "Social proof indicators",
  ];

 export const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
  ];

  export const process = [
    {
      number: "01",
      title: "DISCOVER",
      description:
        "Browse trending categories and explore market opportunities across global platforms",
      icon: TrendingUp,
      gradient: "from-purple-600 to-violet-600",
    },
    {
      number: "02",
      title: "ANALYZE",
      description:
        "Get comprehensive insights on demand, profitability, and competition dynamics",
      icon: BarChart3,
      gradient: "from-violet-600 to-purple-700",
    },
    {
      number: "03",
      title: "LAUNCH",
      description:
        "Validate your idea with data-backed confidence and start building your empire",
      icon: Rocket,
      gradient: "from-purple-700 to-violet-800",
    },
  ];
