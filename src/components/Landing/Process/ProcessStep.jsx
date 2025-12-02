"use client"
import React from 'react'
import { memo } from 'react';

const ProcessStep = memo(({ step, index, isLast }) => (
  <div className="relative group">
    {!isLast && (
      <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent -translate-x-1/2 z-0" />
    )}

    <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20 z-10">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        <step.icon className="w-10 h-10 text-white" />
      </div>

      <div className="text-6xl font-black text-gray-800 mb-4 font-mono">
        {step.number}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">
        {step.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{step.description}</p>
    </div>
  </div>
));
ProcessStep.displayName = "ProcessStep";
export default ProcessStep;