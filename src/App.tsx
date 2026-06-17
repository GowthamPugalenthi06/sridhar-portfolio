/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import Workspace from './components/Workspace';
import Methodology from './components/Methodology';
import Projects from './components/Projects';
import BiotechDashboard from './components/BiotechDashboard';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Microscope, Database, Globe, Award, ClipboardCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Hero Landing Block & Header */}
      <Hero />

      {/* 2. Interactive In-Silico Molecular Designing Sandbox */}
      <Workspace />

      {/* 3. Computer-Aided Drug Design Structural Workflow Stepper */}
      <Methodology />

      {/* 4. Biological Inhibition Titration Lab Monitor (Hill Equation Assays) */}
      <BiotechDashboard />

      {/* 5. Expanded Scientific Publications Logbook */}
      <Projects />

      {/* 6. Dual Biology-Tech Competency Matrix */}
      <Skills />

      {/* 7. Collaborative Research Proposal Builder & Mailbox */}
      <Contact />

      {/* Academic Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-teal-400 border border-slate-700">
              <Microscope className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-200 block">Gowtham P.</span>
              <span className="text-[10px] text-slate-500 font-mono">Pharmaceutical Chemistry Portfolio © 2026</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#interactive-workspace" className="hover:text-teal-400 transition">Design Sandbox</a>
            <a href="#research-portfolio" className="hover:text-teal-400 transition">Thesis publications</a>
            <a href="#skills-matrix" className="hover:text-teal-400 transition">Bimodal Skills</a>
            <a href="#contact-collaboration" className="hover:text-teal-400 transition">Contact mailbox</a>
          </div>

          <div className="text-right text-[10px] text-slate-500 font-mono leading-relaxed">
            <span>M.Pharm (Pharmaceutical Chemistry) • India</span>
            <br />
            <span>Target coordinate alignments compiled in-silico</span>
          </div>

        </div>
      </footer>

    </div>
  );
}

