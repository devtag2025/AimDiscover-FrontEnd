import React from 'react'
import { Rocket,ArrowRight,CheckCircle } from 'lucide-react'
import Link from 'next/link'
import ScrollFloat from '../common/ScrollFloat'
const CTA = () => {
  return (
    <>
      <section
              id="cta"
              className="relative py-32 px-6 bg-black overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-purple-900/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

              <div className="relative max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm mb-4">
                  <Rocket className="w-4 h-4 text-purple-400" />
                  <button className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Start Your Journey Today
                  </button>
                </div>

            <ScrollFloat
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="center bottom+=20%"
  scrollEnd="bottom bottom-=20%"
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
    </>
  )
}

export default CTA