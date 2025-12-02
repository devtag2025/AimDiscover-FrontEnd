import React from 'react'
import ScrollFloat from '../../common/ScrollFloat'
import FeatureCard from './FeatureCard'
import { features } from '@/utils/StaticData'
const Feature = () => {
  return (
    <>
     <section
              id="features"
              className="features-section py-20 px-6 bg-black"
            >
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
               <ScrollFloat
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="top 90%"
  scrollEnd="top 40%"
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

    </>
  )
}

export default Feature