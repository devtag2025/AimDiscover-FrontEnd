"use client"
import React from 'react'
import { memo } from 'react';
const StatCard = memo(({ stat }) => (
  <div className="text-center group cursor-pointer">
    <div className="flex items-center justify-center mb-2">
      <stat.icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
    </div>
    <div className="text-4xl font-black text-white mb-1 font-mono group-hover:text-purple-400 transition-colors">
      {stat.value}
    </div>
    <div className="text-xs text-gray-500 uppercase font-black tracking-wider">
      {stat.label}
    </div>
  </div>
));
StatCard.displayName = "StatCard"
export default StatCard;
