import React, { useState } from 'react'
import ScrollFloat from '../common/ScrollFloat'
import { Globe2 } from 'lucide-react';
import { markets } from '@/utils/StaticData';
 
const Marketing = () => {
     const [selectedMarket, setSelectedMarket] = useState("north-america");
  return (
    <>
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
    </>
  )
}

export default Marketing