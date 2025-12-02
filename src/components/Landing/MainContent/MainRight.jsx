import React from 'react'
import { Users,TrendingUp } from 'lucide-react'
const MainRight = () => {
  return (
    <>
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
    </>
  )
}

export default MainRight