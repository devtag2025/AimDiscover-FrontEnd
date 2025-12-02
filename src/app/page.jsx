"use client";
import { useEffect, useRef } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useAuthStore } from "@/stores/authStore";
import handleLogout from "@/utils/logout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { links } from "@/utils/StaticData";
import CTA from "@/components/Landing/CTA";
import Benefits from "@/components/Landing/Benefits";
import Marketing from "@/components/Landing/Marketing";
import MainLeft from "@/components/Landing/MainContent/MainLeft";
import MainRight from "@/components/Landing/MainContent/MainRight";
import Feature from "@/components/Landing/Feature/Feature";
import ProcessSection from "@/components/Landing/Process/ProcessSection";




const Testimonails = dynamic(() => import("@/components/Landing/Testimonials/Testimonails"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/common/Footer"), {
  ssr: false,
});

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const isLogin = isAuthenticated;

  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.7,
    });


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
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  return (
    <>
      <div className="absolute flex-row top-6 right-6 z-10 flex items-center gap-10 w-full">
        <FloatingDock desktopClassName="dark" items={links} />

        {isLogin ? (
          <button
            onClick={() => handleLogout(router)}
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 text-white text-base tracking-wider rounded-full flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            aria-label="Logout"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 text-white text-base tracking-wider rounded-full flex items-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            aria-label="Login"
          >
            Log In
          </button>
        )}
      </div>

      <div id="smooth-wrapper" ref={smoothWrapperRef}>
        <div id="smooth-content" ref={smoothContentRef}>
          <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Hero Section */}
            <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
              {/* Hyperspeed Background */}
              <div
                className="absolute bg-gradient-to-b from-transparent via-black/40 to-black/80 inset-0 z-0"
                data-speed="1"
              >
                <Hyperspeed />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />
              {/* Main Content */}
              <div className="hero-content relative z-20 w-full max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
                {/* Left Content */}
                <MainLeft />
                {/* Right Visual */}
                <MainRight />
              </div>
            </section>
            {/* Social Proof / Testimonials */}
            <Testimonails />
            {/* Features Section */}
            <Feature />
            {/* Markets Section */}
            <Marketing />
            {/* Process Section */}
            <ProcessSection />
            {/* Benefits Grid */}
            <Benefits />
            {/* CTA Section */}
            <CTA />
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
