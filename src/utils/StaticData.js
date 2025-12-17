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
import {Twitter,Linkedin,Github,MessageCircle} from "lucide-react";
import { IconHome } from "@tabler/icons-react";
import { ToolCase } from "lucide-react";

import { DollarSignIcon } from "lucide-react";
import { HatGlasses } from "lucide-react";

import { TableOfContents } from "lucide-react";
import { PhoneIncoming } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Plus } from "lucide-react";
import { Cable } from "lucide-react";
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
       {
      title: "Features",
      icon: (
        <Cable className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/feature",
    },
       {
      title: "Pricing",
      icon: (
        <DollarSignIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/pricing",
    },
       {
      title: "Contact",
      icon: (
        <PhoneCall className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    },
           {
      title: "FAQ",
      icon: (
        <TableOfContents className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/faq",
    },
           {
      title: "Privacy Policy",
      icon: (
        <HatGlasses className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/privacy",
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

 export const footerlinks=[
    {
      text:"Contact",
      href:"/contact"
    },
        {
      text:"Features",
      href:"/feature"
    },
    {
      text:"Pricing",
      href:"/pricing"
    },
        {
      text:"FAQ",
      href:"/faq"
    },
  ]

 export const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      description: "Our team will respond within 24 hours",
      contact: "support@aimdiscovery.com",
      href: "mailto:support@aimdiscovery.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Live Chat",
      description: "Available Mon-Fri, 9am-6pm EST",
      contact: "Start a conversation",
      href: "#chat"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Office",
      description: "Visit us at our headquarters",
      contact: "San Francisco, CA",
      href: "#"
    }
  ];
 export const socials = [
    { icon: Twitter, url: "https://twitter.com/yourprofile" },
    { icon: Linkedin, url: "https://linkedin.com/in/yourprofile" },
    { icon: Github, url: "https://github.com/yourprofile" },
    { icon: MessageCircle, url: "https://discord.gg/yourserver" },
  ];

 export const REGIONS = {
  NA: "North America",       
  EU: "Europe",
  AP: "Asia-Pacific",        
  SA: "South America",       
  MEA: "Middle East & Africa" 
};

export const MAX_COGS_OPTIONS = [
  { id: "5", label: "Up to $5 landed" },
  { id: "7", label: "Up to $7 landed (recommended)" },
  { id: "10", label: "Up to $10 landed (premium products)" },
];

export const COUNTRY_NAMES = {
US: "United States",
UK: "United Kingdom",
JP: "Japan",
IN: "India",
DE: "Germany",
KR: "South Korea",
CA: "Canada",
AU: "Australia",
NO: "Norway",
FR: "France",
IT: "Italy",
BR: "Brazil",
SG: "Singapore",
ZA: "South Africa",
CN: "China",
MX: "Mexico",
ES: "Spain",
NL: "Netherlands",
};

export const CHART_COLORS = [
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#ddd6fe",
  "#ede9fe",
  "#7c3aed",
  "#6d28d9",
];

export const Icons = {
  Sparkles: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z"
      />
    </svg>
  ),
  Cube: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  Download: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  Chart: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};
