/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Microscope, Code, Award, GraduationCap, ChevronRight, Binary, Server } from 'lucide-react';

export default function Hero() {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative bg-white pt-20 pb-16 overflow-hidden border-b border-gray-100">
      
      {/* Decorative clean radial grid accent */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation Bar Header inside showcase */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans font-bold text-gray-900 tracking-tight text-sm block">Gowtham P.</span>
              <span className="text-[10px] font-mono text-teal-600 block leading-none font-semibold">M.Pharm (Pharmaceutical Chemistry)</span>
            </div>
          </div>
          
          <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold text-gray-500 uppercase tracking-widest font-sans">
            <button onClick={() => scrollToSection('interactive-workspace')} className="hover:text-teal-600 transition">Sandbox</button>
            <button onClick={() => scrollToSection('methodology-workflow')} className="hover:text-teal-600 transition">Methodology</button>
            <button onClick={() => scrollToSection('research-portfolio')} className="hover:text-teal-600 transition">Logbook</button>
            <button onClick={() => scrollToSection('skills-matrix')} className="hover:text-teal-600 transition">Skills</button>
            <button onClick={() => scrollToSection('contact-collaboration')} className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-xs font-bold border border-teal-200/50 transition">Contact</button>
          </nav>
        </div>

        {/* Hero Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Taglines, descriptions and credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/50 rounded-full text-xs font-semibold text-teal-800">
              <Award className="w-4 h-4 text-teal-600" />
              Master of Pharmacy in Pharmaceutical Chemistry
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-slate-900 leading-[1.08]">
              Where Biology Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600">Computational Precision</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans max-w-2xl">
              I specialize in interconnecting pharmaceutical logic with computational technology—utilizing molecular docking grids, dynamic trajectory simulations, and wet-lab drug-screening assays to isolate next-generation medicinal leads.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-go-sandbox-btn"
                onClick={() => scrollToSection('interactive-workspace')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                Launch Molecular Sandbox
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-go-logbook-btn"
                onClick={() => scrollToSection('research-portfolio')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                Review Thesis Logbook
              </button>
            </div>

            {/* Academic stats strip */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-100 font-sans max-w-lg">
              <div>
                <span className="text-2xl font-mono font-bold text-slate-800 block">15,200+</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Molecules Docked</span>
              </div>
              
              <div>
                <span className="text-2xl font-mono font-bold text-slate-800 block">~81%</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Synthetic Yield</span>
              </div>

              <div>
                <span className="text-2xl font-mono font-bold text-slate-800 block">3+</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Research Papers</span>
              </div>
            </div>

          </div>

          {/* Graphical Benzene & DNA Intersection Visualization (Pure Vector Animation) */}
          <div className="lg:col-span-5 flex items-center justify-center relative p-4">
            
            {/* The canvas graphic framework */}
            <div className="relative w-full aspect-square max-w-[320px] bg-slate-50/50 rounded-3xl border border-gray-200/20 shadow-3xs flex items-center justify-center p-6 overflow-hidden">
              
              {/* Spinning DNA and Benzene Ring Graphic */}
              <svg viewBox="0 0 200 200" className="w-full h-full text-slate-800">
                
                {/* Background soft glowing ring */}
                <circle cx="100" cy="100" r="85" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="100" cy="100" r="55" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />

                {/* Animated Molecular Ring Core (Benzene Hexagon) in the center */}
                <g transform="translate(100, 100)" className="animate-spin-slow">
                  {/* Hexagon vertices */}
                  <polygon points="0,-35 30,-18 30,17 0,35 -30,17 -30,-18" fill="none" stroke="#000000" strokeWidth="2.5" />
                  
                  {/* Internal benzene resonance circle */}
                  <circle r="22" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Nitrogen replacement index illustrating medicinal synthesis */}
                  <g transform="translate(0, 35)">
                    <circle r="7.5" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" fill="#2563eb" fontSize="8" fontWeight="bold" fontFamily="monospace">N</text>
                  </g>

                  {/* Attachment positions */}
                  <line x1="30" y1="17" x2="48" y2="28" stroke="#000000" strokeWidth="1.5" />
                  <text x="54" y="32" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">NH₂</text>

                  <line x1="-30" y1="-18" x2="-48" y2="-28" stroke="#000000" strokeWidth="1.5" />
                  <text x="-54" y="-30" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold" fontFamily="monospace">OH</text>
                </g>

                {/* Double helix DNA revolving representations floating horizontally around */}
                <g className="opacity-90">
                  {/* Spiral waves wrapping around */}
                  <path 
                    d="M 25,100 C 45,60 65,140 85,100 C 105,60 125,140 145,100 C 165,60 185,140 205,100" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.2" 
                    className="wave-anim-1"
                  />
                  <path 
                    d="M 25,100 C 45,140 65,60 85,100 C 105,140 125,60 145,100 C 165,140 185,60 205,100" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="1.2" 
                    className="wave-anim-2"
                  />
                  
                  {/* Intersecting vertical connector bars representing nucleotide pairings */}
                  <line x1="45" y1="80" x2="45" y2="120" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                  <circle cx="45" cy="80" r="2.5" fill="#10b981" />
                  <circle cx="45" cy="120" r="2.5" fill="#4f46e5" />

                  <line x1="85" y1="100" x2="85" y2="100" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                  <circle cx="85" cy="100" r="2.5" fill="#4f46e5" />

                  <line x1="125" y1="80" x2="125" y2="120" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                  <circle cx="125" cy="80" r="2.5" fill="#4f46e5" />
                  <circle cx="125" cy="120" r="2.5" fill="#10b981" />

                  <line x1="165" y1="80" x2="165" y2="120" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                  <circle cx="165" cy="80" r="2.5" fill="#10b981" />
                  <circle cx="165" cy="120" r="2.5" fill="#4f46e5" />
                </g>

                {/* Nodes orbiting on outer boundary ring */}
                <circle cx="100" cy="15" r="3" fill="#6366f1" />
                <circle cx="145" cy="27" r="2" fill="#10b981" />
                <circle cx="15" cy="100" r="4" fill="#0d9488" />

              </svg>

              {/* Orbital metadata badge */}
              <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded border border-gray-100 flex items-center gap-1">
                <Binary className="w-3 h-3 text-indigo-600 animate-pulse" />
                <span className="font-mono text-[8px] text-gray-500 font-bold uppercase tracking-wider">CADD CORE ENGINT</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded CSS for smooth rotation and waving nucleotide oscillations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 20s infinite linear;
          transform-origin: center;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </header>
  );
}
