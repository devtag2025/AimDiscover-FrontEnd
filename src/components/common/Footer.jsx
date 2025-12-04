"use client"
import { footerlinks } from "@/utils/StaticData";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="border-t-2 relative pointer-events-auto z-10 border-gray-900 bg-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                AimDiscovery
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The ultimate market intelligence platform for entrepreneurs.
                Discover opportunities, validate ideas, and launch with
                confidence.
              </p>
              <div className="flex gap-4">
                <button
                  className="w-10 h-10 bg-gray-900 hover:bg-purple-600 border border-gray-800 hover:border-purple-500 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">in</span>
                </button>
                <button
                  className="w-10 h-10 bg-gray-900 hover:bg-purple-600 border border-gray-800 hover:border-purple-500 rounded-lg flex items-center justify-center transition-all duration-300"
                  aria-label="Email"
                >
                  <span className="text-xl">📧</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    API
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Changelog
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-white">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-xs uppercase font-mono tracking-wider">
             © {new Date().getFullYear()} AimDiscover. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-600 text-xs uppercase font-mono tracking-wider">
              {footerlinks.map((links)=>(
                
               
                  <Link  className="hover:text-purple-400 transition-colors cursor-pointer" key={links.href} href={links.href}>
                {links.text}
                </Link>
              
           
              ))}
              
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
