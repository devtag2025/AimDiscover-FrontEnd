"use client"
import React from 'react'
import SpotlightCard from '../../common/SpotLightCard';
import { memo } from 'react';
import { ChevronRight } from 'lucide-react';

const FeatureCard = memo(({ feature }) => (
   <SpotlightCard className="border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
 <div
      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
    />

    <div className="relative">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <feature.icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-black mb-4 uppercase tracking-wider text-white group-hover:text-purple-400 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{feature.description}</p>

      <button className="mt-6 text-purple-400 font-bold text-sm uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
        Learn More
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  
</SpotlightCard>
));
FeatureCard.displayName = "FeatureCard";
export default FeatureCard