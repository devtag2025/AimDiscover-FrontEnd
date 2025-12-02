import React from 'react'
import ScrollFloat from '../common/ScrollFloat'
import { CheckCircle } from 'lucide-react'
import { benefits } from '@/utils/StaticData'
const Benefits = () => {
  return (
    <>
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
    </>
  )
}

export default Benefits