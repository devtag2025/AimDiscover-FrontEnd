"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import CTA from "@/components/Landing/CTA";
import Benefits from "@/components/Landing/Benefits";
import Marketing from "@/components/Landing/Marketing";
import MainLeft from "@/components/Landing/MainContent/MainLeft";
import MainRight from "@/components/Landing/MainContent/MainRight";
import Feature from "@/components/Landing/Feature/Feature";
import ProcessSection from "@/components/Landing/Process/ProcessSection";
import Footer from "@/components/common/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Testimonails = dynamic(
  () => import("@/components/Landing/Testimonials/Testimonails"),
  {
    ssr: false,
  }
);

const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

export default function Home() {
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    if (!smoothWrapperRef.current || !smoothContentRef.current) return;

    const smoother = ScrollSmoother.create({
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
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef} className="relative">
      <div id="smooth-content" ref={smoothContentRef}>
        {/* LANDING PAGE CONTENT */}
        <div className="min-h-screen bg-black text-white overflow-hidden">
          {/* HERO SECTION */}
          <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0" data-speed="1">
              <Hyperspeed />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />

            {/* Hero Main Content */}
            <div className="hero-content relative z-20 w-full max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
              <MainLeft />
              <MainRight />
            </div>
          </section>

          {/* Other Sections */}
          <Testimonails />
          <Feature />
          <Marketing />
          <ProcessSection />
          <Benefits />
          <CTA />
        </div>

        {/* Footer INSIDE smooth content for Home page */}
        <Footer />
      </div>
    </div>
  );
}
