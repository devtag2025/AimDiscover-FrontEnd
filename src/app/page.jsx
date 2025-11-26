"use client";
import { useState, useEffect, memo, useRef } from "react";
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
  Target,
  Rocket,
  ChevronRight,
  Eye,
  Brain,
  Boxes,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed";
import ScrollFloat from "@/components/common/ScrollFloat";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SpotlightCard from "@/components/common/SpotLightCard";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const StatCard = memo(({ stat }) => (
  <div className="text-center group cursor-pointer">
    <div className="flex items-center justify-center mb-2">
      <stat.icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
    </div>
    <div className="text-4xl font-black text-white mb-1 font-mono group-hover:text-purple-400 transition-colors">
      {stat.value}
    </div>
    <div className="text-xs text-gray-500 uppercase font-black tracking-wider">
      {stat.label}
    </div>
  </div>
));

const FeatureCard = memo(({ feature }) => (
   <SpotlightCard className="border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
 <div
      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
    />

    <div className="relative">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <feature.icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-black mb-4 uppercase tracking-wider text-white group-hover:text-purple-400 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{feature.description}</p>

      <button className="mt-6 text-purple-400 font-bold text-sm uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
        Learn More
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  
</SpotlightCard>
));
FeatureCard.displayName = "FeatureCard";
const ProcessStep = memo(({ step, index, isLast }) => (
  <div className="relative group">
    {!isLast && (
      <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent -translate-x-1/2 z-0" />
    )}

    <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20 z-10">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        <step.icon className="w-10 h-10 text-white" />
      </div>

      <div className="text-6xl font-black text-gray-800 mb-4 font-mono">
        {step.number}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">
        {step.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{step.description}</p>
    </div>
  </div>
));

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const isLogin = isAuthenticated;
  const [selectedMarket, setSelectedMarket] = useState("north-america");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLogin, router]);

  // GSAP Smooth Scroll Setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    let smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.7,
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Parallax effect for hero elements
    gsap.to(".hero-content", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 200,
      opacity: 0,
      ease: "none",
    });

    // Animate feature cards
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 70%",
      },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate process steps
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 70%",
      },
      opacity: 0,
      x: -50,
      stagger: 0.3,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const markets = [
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

  const features = [
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

  const stats = [
    { value: "50K+", label: "PRODUCTS TRACKED", icon: Boxes },
    { value: "180+", label: "COUNTRIES COVERED", icon: Globe2 },
    { value: "98%", label: "ACCURACY RATE", icon: Target },
    { value: "24/7", label: "LIVE MONITORING", icon: Eye },
  ];

  const process = [
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

  const testimonials = [
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

  const benefits = [
    "Real-time market trend analysis",
    "Competition tracking & insights",
    "Profit margin calculators",
    "Supplier recommendations",
    "SEO keyword research",
    "Social proof indicators",
  ];

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
  ];

  return (
    <>
      {/* Floating Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex row gap-10">
        <FloatingDock desktopClassName="dark" items={links} />
        {isLogin && (
          <button
            onClick={() => {
              handleLogout(router);
            }}
            className="group px-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 text-white text-base tracking-wider rounded-full flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            aria-label="Logout"
          >
            Log Out
          </button>
        )}
      </div>

      {/* Smooth Scroll Wrapper */}
      <div id="smooth-wrapper" ref={smoothWrapperRef}>
        <div id="smooth-content" ref={smoothContentRef}>
          <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Hero Section */}
            <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
              {/* Hyperspeed Background */}
              <div className="absolute bg-gradient-to-b from-transparent via-black/40 to-black/80 inset-0 z-0" data-speed="1">
                <Hyperspeed />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />

              {/* Main Content */}
              <div className="hero-content relative z-20 w-full max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      AI-Powered Market Intelligence
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase">
                    Find Your Next
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
                      Big Idea
                    </span>
                  </h1>

                  <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Discover untapped opportunities, validate products
                    instantly, and launch with confidence. Join{" "}
                    <span className="text-purple-400 font-bold">10,000+</span>{" "}
                    entrepreneurs building winning businesses.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                    <button className="group w-full sm:w-auto px-8 py-4 inset-0 bg-gradient-to-b from-transparent border border-violet-500 via-black/40 to-black/80 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-black text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105">
                      Start Exploring Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-16">
                    {[
                      { icon: CheckCircle, text: "No credit card required" },
                      { icon: Zap, text: "Setup in 2 minutes" },
                      { icon: Shield, text: "14-day free trial" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <item.icon className="w-4 h-4 text-purple-400" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Visual */}
                <div className="relative hidden lg:block" data-speed="0.8">
                  <div className="relative w-full h-[600px] flex items-center justify-center">
                    <div className="relative w-full max-w-md">
                      {/* Dashboard Preview */}
                      <div className="relative inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 border-2 border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 backdrop-blur-xl transform hover:scale-105 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-mono">
                              Market Trend
                            </span>
                            <span className="text-xs text-purple-400 font-bold">
                              LIVE
                            </span>
                          </div>

                          <div className="h-32 flex items-end gap-2">
                            {[40, 65, 45, 80, 55, 90, 70, 95].map(
                              (height, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 bg-gradient-to-t from-purple-600 to-violet-600 rounded-t transition-all duration-500 hover:scale-105"
                                  style={{ height: `${height}%` }}
                                />
                              )
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-4">
                            {["Demand", "Competition", "Profit"].map(
                              (label, idx) => (
                                <div
                                  key={idx}
                                  className="inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 rounded-lg p-3 border border-gray-700"
                                >
                                  <div className="text-xs text-gray-400 mb-1">
                                    {label}
                                  </div>
                                  <div className="text-lg font-bold text-purple-400">
                                    {idx === 0
                                      ? "↑ 87%"
                                      : idx === 1
                                      ? "↓ 23%"
                                      : "$4.2K"}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Floating stat cards */}
                      <div
                        className="absolute -top-8 -right-8 bg-gradient-to-b from-transparent via-black/40 to-black/80 border border-purple-600 rounded-xl p-4 shadow-lg animate-bounce"
                        style={{ animationDuration: "3s" }}
                      >
                        <TrendingUp className="w-6 h-6 text-white mb-1" />
                        <div className="text-xs text-white font-bold">
                          +142%
                        </div>
                      </div>

                      <div
                        className="absolute -bottom-8 -left-8 bg-gradient-to-b from-transparent via-black/40 to-black/80 border border-purple-600 rounded-xl p-4 shadow-lg animate-bounce"
                        style={{
                          animationDuration: "4s",
                          animationDelay: "1s",
                        }}
                      >
                        <Users className="w-6 h-6 text-white mb-1" />
                        <div className="text-xs text-white font-bold">
                          10K+ Users
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats bar at bottom */}
            </section>

            {/* Social Proof / Testimonials */}
            <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
              <div className=" bg-gradient-to-r from-purple-900/30 via-violet-900/30 to-purple-900/30 backdrop-blur-xl border-t-2 border-purple-500/30 py-8">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                  ))}
                </div>
              </div>
              <div className="max-w-6xl mx-auto">
                <div className="text-center my-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Trusted by 10,000+ Entrepreneurs
                    </span>
                  </div>

                  <ScrollFloat
                    animationDuration={1}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                  >
                    Real Results
                  </ScrollFloat>
                </div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10" />

                  <div className="relative">
                    {testimonials.map((testimonial, idx) => (
                      <div
                        key={idx}
                        className={`transition-opacity duration-500 ${
                          currentTestimonial === idx
                            ? "opacity-100 block"
                            : "opacity-0 hidden"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>

                        <blockquote className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>

                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{testimonial.avatar}</div>
                          <div>
                            <div className="text-lg font-bold text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {testimonial.role}
                            </div>
                          </div>
                          <div className="ml-auto px-4 py-2 bg-purple-500/20 rounded-full">
                            <span className="text-purple-300 font-bold text-sm">
                              {testimonial.metric}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentTestimonial === idx
                            ? "w-8 bg-purple-500"
                            : "bg-gray-600"
                        }`}
                        aria-label={`View testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              id="features"
              className="features-section py-20 px-6 bg-black"
            >
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFloat
                    animationDuration={1}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                  >
                    Powerful Features
                  </ScrollFloat>
                  <p className="text-gray-400 text-lg uppercase font-mono tracking-wide">
                    Everything you need to succeed
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <FeatureCard feature={feature} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Markets Section */}
            <section
              id="markets"
              className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
            >
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFloat
                    animationDuration={1}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                  >
                    Global Coverage
                  </ScrollFloat>
                  <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
                    <Globe2 className="w-5 h-5 text-purple-400" />
                    180+ Countries • Real-time Data
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {markets.map((market) => (
                    <button
                      key={market.id}
                      onClick={() => setSelectedMarket(market.id)}
                      className={`group relative p-6 border-2 transition-all duration-300 rounded-2xl overflow-hidden ${
                        selectedMarket === market.id
                          ? "bg-gradient-to-br from-purple-600 to-violet-600 border-purple-500"
                          : "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                          selectedMarket === market.id ? "opacity-20" : ""
                        }`}
                      />

                      <div className="relative text-center space-y-3">
                        <div className="text-5xl mb-2">{market.flag}</div>
                        <div
                          className={`font-black text-xs uppercase tracking-wider ${
                            selectedMarket === market.id
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {market.name}
                        </div>
                        <div
                          className={`text-xs font-mono ${
                            selectedMarket === market.id
                              ? "text-purple-200"
                              : "text-gray-500"
                          }`}
                        >
                          {market.products} Products
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="process-section py-20 px-6 bg-black">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFloat
                    animationDuration={1}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                  >
                    How It Works
                  </ScrollFloat>
                  <p className="text-gray-400 text-lg uppercase font-mono tracking-wide">
                    Launch in 3 Simple Steps
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {process.map((step, index) => (
                    <div key={index} className="process-step">
                      <ProcessStep
                        step={step}
                        index={index}
                        isLast={index === process.length - 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFloat
                    animationDuration={1}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                  >
                    Everything Included
                  </ScrollFloat>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section
              id="cta"
              className="relative py-32 px-6 bg-black overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-purple-900/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

              <div className="relative max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm mb-4">
                  <Rocket className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Start Your Journey Today
                  </span>
                </div>

                <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
                  textClassName="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
                >
                  Ready To Launch
                </ScrollFloat>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Join{" "}
                  <span className="text-purple-400 font-bold">10,000+</span>{" "}
                  entrepreneurs discovering winning products and building
                  successful businesses worldwide
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <Link href="/login">
                    <button className="group px-12 py-5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-black text-base uppercase tracking-wider rounded-xl flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t-2 border-gray-900 bg-black py-16 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      AimDiscovery
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      The ultimate market intelligence platform for
                      entrepreneurs. Discover opportunities, validate ideas, and
                      launch with confidence.
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="w-10 h-10 bg-gray-900 hover:bg-purple-600 border border-gray-800 hover:border-purple-500 rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <span className="text-xl">in</span>
                      </button>
                      <button
                        className="w-10 h-10 bg-gray-900 hover:bg-purple-600 border border-gray-800 hover:border-purple-500 rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="Email"
                      >
                        <span className="text-xl">📧</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white">
                      Product
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Features
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Pricing
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          API
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Changelog
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white">
                      Company
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          About
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Blog
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Careers
                        </button>
                      </li>
                      <li>
                        <button className="hover:text-purple-400 transition-colors">
                          Contact
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t-2 border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-gray-600 text-xs uppercase font-mono tracking-wider">
                    © 2025 AimDiscovery. All rights reserved.
                  </div>
                  <div className="flex gap-6 text-gray-600 text-xs uppercase font-mono tracking-wider">
                    <button className="hover:text-purple-400 transition-colors">
                      Privacy
                    </button>
                    <button className="hover:text-purple-400 transition-colors">
                      Terms
                    </button>
                    <button className="hover:text-purple-400 transition-colors">
                      Cookies
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
