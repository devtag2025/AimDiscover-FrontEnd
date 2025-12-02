import React, { useEffect } from 'react'
import { useState } from 'react'
import StatCard from './StatCard'
import { Star } from 'lucide-react'
import ScrollFloat from '../../common/ScrollFloat'
import { testimonials,stats } from '@/utils/StaticData'
const Testimonails = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
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
                          &quot;{testimonial.quote}&quot;
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

    </>
  )
}

export default Testimonails