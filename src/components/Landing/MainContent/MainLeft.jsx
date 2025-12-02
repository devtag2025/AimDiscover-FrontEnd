import React from 'react'
import { ArrowRight,Sparkles,CheckCircle,Zap,Shield } from 'lucide-react';
const MainLeft = () => {
  return (
    <>
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
                    <button
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="group w-full sm:w-auto px-8 py-4 inset-0 bg-gradient-to-b from-transparent border border-violet-500 via-black/40 to-black/80 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-black text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
                    >
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
    </>
  )
}

export default MainLeft