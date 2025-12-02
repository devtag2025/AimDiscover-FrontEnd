import React from 'react'
import ScrollFloat from '../../common/ScrollFloat'
import ProcessStep from './ProcessStep'
import { process } from '@/utils/StaticData'
const ProcessSection = () => {
  return (
    <>
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

    </>
  )
}

export default ProcessSection