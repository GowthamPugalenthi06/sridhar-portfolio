/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Network, Search, Layers, Activity, Landmark, Milestone, HelpCircle, CheckCircle2 } from 'lucide-react';

interface MethodStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tools: string[];
  scientificPrinciple: string;
  practicalOutcome: string;
  detailedAnalysis: string;
}

export default function Methodology() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to MD simulation (highly interactive step)
  const [simType, setSimType] = useState<'stable' | 'unstable'>('stable');

  const steps: MethodStep[] = [
    {
      id: 1,
      title: 'Target Preparation',
      subtitle: 'Grid box mapping & protonation',
      icon: <Search className="w-5 h-5 text-sky-600" />,
      tools: ['RCSB Protein Data Bank', 'PyMOL', 'AutoDock Tools', 'Schrödinger Prep'],
      scientificPrinciple: 'Structure-Based Drug Design (SBDD) relies on high-resolution crystallographic or cryo-EM structures. We extract the 3D coordinate file, remove co-crystallized solvent, assign physiological protonation states (pH ~7.4), and construct 3D search grids over key binding pockets.',
      practicalOutcome: 'A refined, clean 3D receptor grid receptor.gpf file that defines grid boundaries over catalytic triad or hinge residues, locking in coordinates for high-throughput ligand screening.',
      detailedAnalysis: 'During target preparation, correct placement of the receptor grid center is paramount. For the SARS-CoV-2 Mpro, the grid is centered specifically at the catalytic dyad (Cys145 & His41), generating a 22Å × 22Å × 22Å virtual box that fully encapsulates the active site cleft, ready for virtual chemical library screening.'
    },
    {
      id: 2,
      title: 'Virtual Direct Screen',
      subtitle: 'Molecular Docking on vendor libraries',
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      tools: ['AutoDock Vina', 'ZINC20 Database', 'RDKit (Python)', 'PLIP'],
      scientificPrinciple: 'Genetic algorithms search the conformational spaces of potential ligands inside the binding grid. Multi-conformation scoring routines estimate free binding energy as a sum of lipophilic, desolvation, hydrogen-bonding, and rotational entropy costs.',
      practicalOutcome: 'Top scoring candidate molecules selected from massive drug banks (like ZINC or Mcule) that demonstrate favorable electrostatic complimentary to the target pocket.',
      detailedAnalysis: 'High-Throughput Virtual Screening passes millions of vendor compounds through rigid docking filters, followed by flexible sidechain alignment on top-ranked matches. Scoring relies heavily on ligand-receptor complimentary. Non-covalent interaction profiling maps hydrogen bonds, salt bridges, halogen interactions, and aromatic pi-stacking.'
    },
    {
      id: 3,
      title: 'Molecular Dynamics (MD)',
      subtitle: 'Nanosecond thermodynamic simulation',
      icon: <Activity className="w-5 h-5 text-rose-500" />,
      tools: ['GROMACS', 'CHARMM36 Forcefield', 'AMBER', 'VMD'],
      scientificPrinciple: 'Classical Newton\'s mechanics simulate molecular trajectories inside a periodic water box. Solvent molecules and counter-ions are added, forces calculated via parameterized potentials, relaxing the complex and verifying whether binding poses persist over time.',
      practicalOutcome: 'Validation of ligand stability inside the pocket, quantified by monitoring structural drift (RMSD), structural fluctuation (RMSF), and hydrogen bond occupancy counts over a nanosecond timeline.',
      detailedAnalysis: 'Static docking scores do not account for protein structural flexibility. Molecular Dynamics allows local protein backbones to undergo induced-fit adjustment. A stable drug molecule equilibrates within the pocket, keeping a low RMSD value of less than 0.25 nanometers, confirming structural integrity on a realistic timescale.'
    },
    {
      id: 4,
      title: 'Bio-Isosteric Lead Redesign',
      subtitle: 'Structure-Activity Relationship Optimization',
      icon: <Network className="w-5 h-5 text-teal-600" />,
      tools: ['Medicinal Chemistry Logic', 'SwissADME', 'pkCSM', 'Bio-isostere Replacement Maps'],
      scientificPrinciple: 'Synthetic replacement of specific atoms or functional groups with chemical isosteres (substitutions that maintain steric and electronic properties) to balance biological efficacy (IC50) and pharmacokinetics (ADMET).',
      practicalOutcome: 'Optimized lead coordinates with diminished cytochrome P450 inhibition, heightened metabolic clearance half-life, and robust cell permeability parameters.',
      detailedAnalysis: 'Once MD simulations isolate an active lead, we evaluate its medicinal chemistry profile. If the compound exhibits rapid liver metabolic degradation, we can replace highly accessible hydrogen positions with covalent fluorines (bio-isostere) to block oxidative cytochrome metabolism, maintaining binding affinity while elevating systemic bioavailability.'
    },
    {
      id: 5,
      title: 'In-Vitro Assay Validation',
      subtitle: 'Heterologous synthesis & dose titration',
      icon: <Landmark className="w-5 h-5 text-amber-600" />,
      tools: ['Organic Chemical Synthesis', 'FRET Assays', 'HPLC / LC-MS', 'Microplate Reader'],
      scientificPrinciple: 'Bridging the computational and biological world. Optimized ligands undergo organic synthesis in the wet lab, chemical structures are confirmed, followed by biochemical inhibition assays or cell-based viability assays to determine real Kd and IC50 binding metrics.',
      practicalOutcome: 'Direct, tangible validation of our computer-aided drug design. Isolation of nanomolar biological blockades verified in physical pharmaceutical assays.',
      detailedAnalysis: 'Wet-lab synthesis verifies the virtual model. Automated microplate fluorescence-resonance energy transfer (FRET) assays calculate target enzyme velocities across serial dilutions of the synthesized compound. Plotting percent-inhibition reveals molecular potency, validating our in-silico predictions.'
    }
  ];

  // Helper function to draw the SVG MD simulation graph dynamically
  const generateSvgPath = (type: 'stable' | 'unstable') => {
    // Standard baseline width of coordinate box is 300, height is 150
    // Stable complex: quickly flattens and wanders around 0.18 - 0.22 nm representing equilibration
    // Unstable complex: fluctuates wildly, jumps up to 0.45 nm representing receptor egression (leaving the pocket)
    
    const stablePoints = [
      { x: 10, y: 130 },  // 0ns
      { x: 30, y: 90 },   // 5ns
      { x: 60, y: 70 },   // 10ns
      { x: 90, y: 65 },   // 15ns
      { x: 120, y: 55 },  // 20ns
      { x: 150, y: 62 },  // 25ns
      { x: 180, y: 58 },  // 30ns
      { x: 210, y: 56 },  // 35ns
      { x: 240, y: 60 },  // 40ns
      { x: 270, y: 55 },  // 45ns
      { x: 290, y: 57 }   // 50ns
    ];

    const unstablePoints = [
      { x: 10, y: 130 },
      { x: 30, y: 100 },
      { x: 60, y: 80 },
      { x: 90, y: 95 },
      { x: 120, y: 75 },
      { x: 150, y: 50 },
      { x: 180, y: 35 },
      { x: 210, y: 45 },
      { x: 240, y: 25 },
      { x: 270, y: 20 },
      { x: 290, y: 15 }
    ];

    const points = type === 'stable' ? stablePoints : unstablePoints;
    
    // Convert coordinate nodes to cubic bezier structure or simple lines
    return points.reduce((path, p, index) => {
      if (index === 0) return `M ${p.x},${p.y}`;
      
      // Calculate a smooth control point
      const prev = points[index - 1];
      const cx = (prev.x + p.x) / 2;
      return `${path} Q ${cx},${prev.y} ${p.x},${p.y}`;
    }, '');
  };

  return (
    <section id="methodology-workflow" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-3">
            <Milestone className="w-3.5 h-3.5" />
            Core Research Paradigm
          </div>
          <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
            Computer-Aided Drug Design Pipeline
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed font-sans">
            How computational physics, biology, and chemistry intersect. This standardized 5-step paradigm guides our dry-to-wet-lab translations, accelerating clinical candidates from virtual screening to biochemical validation.
          </p>
        </div>

        {/* Stepper Timeline Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10 border-b border-gray-100 pb-6">
          {steps.map((step) => {
            const isSelected = activeStep === step.id;
            return (
              <button
                key={step.id}
                id={`method-step-tab-${step.id}`}
                onClick={() => setActiveStep(step.id)}
                className={`relative flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                  isSelected 
                    ? 'bg-slate-50/80 border border-slate-200/50 shadow-xs' 
                    : 'hover:bg-gray-50/50 border border-transparent'
                }`}
              >
                {/* Step indicator circle */}
                <div className={`p-2 rounded-lg transition-transform duration-300 ${
                  isSelected ? 'bg-white shadow-xs scale-105' : 'bg-gray-50 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">0{step.id}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    )}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 mt-0.5">{step.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{step.subtitle}</p>
                </div>
                {isSelected && (
                  <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 hidden md:block"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Core Details Panel */}
        {steps.map((step) => {
          if (step.id !== activeStep) return null;
          return (
            <div key={step.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50/40 p-6 sm:p-8 rounded-2xl border border-gray-100/50">
              
              {/* Detailed scientific content columns */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">Method Step 0{step.id}</span>
                    <span className="text-xs text-gray-400 font-semibold uppercase">{step.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-sans font-medium text-gray-900 mb-4">{step.title}</h3>
                  
                  {/* Scientific Principle block */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Scientific Principle</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{step.scientificPrinciple}</p>
                  </div>

                  {/* Practical Outcome block */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Practical Outcome</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{step.practicalOutcome}</p>
                  </div>

                  {/* Extended Case Analysis */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Deep In-Silico Case Study</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans bg-white p-3.5 rounded-lg border border-gray-100 italic">
                      "{step.detailedAnalysis}"
                    </p>
                  </div>
                </div>

                {/* Specific Software / Hardware Stack Used */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Academic & Industry Software Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tools.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white border border-gray-200 rounded text-[11px] font-mono text-gray-600 shadow-3xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Visual Widget Specific to Step */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                
                {/* STEP 1 Visual: PDB Visualizer Representation */}
                {step.id === 1 && (
                  <div className="w-full text-center py-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Protein Receptor Active Grid Bounds</h4>
                    <div className="relative w-44 h-44 mx-auto border border-dashed border-sky-300 rounded-lg flex items-center justify-center bg-sky-50/20">
                      <div className="absolute w-24 h-24 border border-sky-400 bg-sky-200/25 rounded-md animate-pulse"></div>
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-sky-600"></div>
                      <span className="font-mono text-[9px] text-sky-700 absolute bottom-1 right-2">Box Grid Center: (15.2, -8.4, 21.3)</span>
                      {/* Grid rulers */}
                      <div className="absolute top-0 bottom-0 left-1/2 border-l border-sky-200/60"></div>
                      <div className="absolute left-0 right-0 top-1/2 border-t border-sky-200/60 font-mono text-[8px] text-gray-400 pl-1 py-0.5">Y-axis</div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-4 leading-normal max-w-xs mx-auto">
                      Refining receptor structures in 3D coordinate grids ensures binding assays occur precisely under realistic ligand coordinates.
                    </p>
                  </div>
                )}

                {/* STEP 2 Visual: High Throughput Screening Score distribution bar */}
                {step.id === 2 && (
                  <div className="w-full text-center py-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Virtual Docking Score Distribution</h4>
                    
                    {/* Simulated bar chart showing screening cutoff of docking affinity scores */}
                    <div className="space-y-3 max-w-xs mx-auto text-left font-mono">
                      <div>
                        <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                          <span>Discarded (Affinity &gt; -5.0 kcal/mol)</span>
                          <span className="font-bold">84.2%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-slate-300 h-2" style={{ width: '84.2%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                          <span>Moderate Leads (-5.0 to -7.5 kcal/mol)</span>
                          <span className="font-bold">14.1%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-400 h-2" style={{ width: '14.1%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-emerald-800 font-semibold mb-1">
                          <span>Top-Tier Hits (Affinity &lt; -7.5 kcal/mol)</span>
                          <span className="font-bold">1.7%</span>
                        </div>
                        <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-2" style={{ width: '1.7%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded text-[11px] text-emerald-800 text-left">
                      <span className="font-bold block mb-0.5">Post-Screen Filter active:</span>
                      Compounds with severe mutagenic risks or poor passive cellular gut-translocation parameters are automatically pruned.
                    </div>
                  </div>
                )}

                {/* STEP 3 Visual (Interactive): Molecular Dynamics RMSD relaxation curve */}
                {step.id === 3 && (
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Molecular Dynamics RMSD Curve</h4>
                      <div className="flex gap-1.5">
                        <button
                          id="md-sim-stable-btn"
                          onClick={() => setSimType('stable')}
                          className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition ${
                            simType === 'stable' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Stable
                        </button>
                        <button
                          id="md-sim-unstable-btn"
                          onClick={() => setSimType('unstable')}
                          className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition ${
                            simType === 'unstable' ? 'bg-rose-50 text-rose-800' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Unstable
                        </button>
                      </div>
                    </div>

                    {/* SVG Chart */}
                    <div className="relative w-full aspect-[2/1.2] bg-slate-50/50 rounded-lg p-2.5 border border-slate-100/50">
                      
                      {/* Chart Grid Lines */}
                      <svg viewBox="0 0 300 150" className="w-full h-full">
                        {/* Axes */}
                        <line x1="20" y1="130" x2="295" y2="130" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="20" y1="10" x2="20" y2="131" stroke="#cbd5e1" strokeWidth="1.5" />

                        {/* Y-axis ticks & labels */}
                        <text x="5" y="115" fontSize="8" fill="#94a3b8" fontFamily="monospace">0.1</text>
                        <text x="5" y="85" fontSize="8" fill="#94a3b8" fontFamily="monospace">0.2</text>
                        <text x="5" y="55" fontSize="8" fill="#94a3b8" fontFamily="monospace">0.3</text>
                        <text x="5" y="25" fontSize="8" fill="#94a3b8" fontFamily="monospace">0.4</text>
                        
                        {/* Title of axes */}
                        <text x="10" y="15" fontSize="8" fill="#475569" fontWeight="bold" transform="rotate(-90 8 15)" fontFamily="sans-serif">RMSD (nm)</text>
                        <text x="150" y="145" fontSize="8" fill="#475569" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Time (nanoseconds)</text>

                        {/* X-axis ticks (ns) */}
                        <text x="30" y="139" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">5</text>
                        <text x="90" y="139" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">15</text>
                        <text x="150" y="139" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">25</text>
                        <text x="210" y="139" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">35</text>
                        <text x="270" y="139" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">45</text>

                        {/* Dynamic Plot Curve */}
                        <path 
                          d={generateSvgPath(simType)} 
                          fill="none" 
                          stroke={simType === 'stable' ? '#0d9488' : '#e11d48'} 
                          strokeWidth="2.5" 
                          className="transition-all duration-500"
                        />

                        {/* Protein backbone baseline validation curve (almost always relaxes nicely) */}
                        <path 
                          d="M 20,130 Q 35,95 60,88 T 100,83 T 150,84 T 200,81 T 250,83 T 290,82" 
                          fill="none" 
                          stroke="#94a3b8" 
                          strokeWidth="1.5" 
                          strokeDasharray="3 3"
                        />
                      </svg>

                      {/* Legend */}
                      <div className="absolute top-3 right-4 flex flex-col gap-1 bg-white/80 p-2 rounded border border-slate-100 text-[9px] font-sans">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-0.5 bg-[#94a3b8] inline-block border-t border-dashed"></span>
                          <span className="text-gray-500">Protein Backbone Drift</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-3 h-1 inline-block rounded ${simType === 'stable' ? 'bg-[#0d9488]' : 'bg-[#e11d48]'}`}></span>
                          <span className="text-gray-700 font-semibold">{simType === 'stable' ? 'Ligand Trajectory (Stable Pose)' : 'Ligand Trajectory (Egress Drift)'}</span>
                        </div>
                      </div>

                    </div>

                    <p className="text-[10px] text-gray-500 leading-normal mt-3 text-center">
                      {simType === 'stable' 
                        ? 'Stable complex: curve levels off (plateaus), meaning compound molecular conformation aligns with receptor pocket geometry.' 
                        : 'Unstable complex: fluctuating upward curve showcases thermodynamic instability, meaning high ligand drift and structural failure.'}
                    </p>
                  </div>
                )}

                {/* STEP 4 Visual: SwissADME Radar map */}
                {step.id === 4 && (
                  <div className="w-full text-center py-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pharmacokinetics SwissADME Profile</h4>
                    
                    {/* Simulated bioavailability radar shape */}
                    <div className="relative w-36 h-36 mx-auto bg-slate-50 border border-gray-100/60 rounded-full flex items-center justify-center">
                      {/* Draw pink optimal zone */}
                      <div className="absolute w-24 h-24 bg-teal-100/50 border border-teal-200 rounded-full animate-pulse" style={{ clipPath: 'polygon(50% 10%, 90% 35%, 85% 80%, 50% 95%, 15% 80%, 10% 35%)' }}></div>
                      
                      {/* Center target compound profile */}
                      <div className="absolute w-16 h-18 bg-emerald-600/20 border-2 border-emerald-600 rounded-full" style={{ clipPath: 'polygon(50% 20%, 80% 40%, 75% 70%, 50% 85%, 25% 70%, 30% 40%)' }}></div>

                      <span className="absolute top-0.5 font-mono text-[8px] text-gray-400">LIPO (Lipophilicity)</span>
                      <span className="absolute bottom-0.5 font-mono text-[8px] text-gray-400">POLAR (Polarity)</span>
                      <span className="absolute right-1 font-mono text-[8px] text-gray-400">SIZE</span>
                      <span className="absolute left-1 font-mono text-[8px] text-gray-400">FLEX</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-left text-[10px] font-sans">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>High GIT Absorption</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>BBB Permeant: Low</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Bioavailability: 0.55</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Synthesizability: 3.2</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5 Visual: Wet-Lab Synthesis confirmation */}
                {step.id === 5 && (
                  <div className="w-full text-center py-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Chemical Purity HPLC Chromatogram</h4>
                    
                    <div className="h-28 w-full bg-slate-50 border border-slate-100 rounded p-2 relative flex items-end">
                      {/* HPLC retention peak vector graph */}
                      <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
                        {/* Axes */}
                        <line x1="10" y1="70" x2="190" y2="70" stroke="#94a3b8" />
                        <line x1="15" y1="10" x2="15" y2="70" stroke="#94a3b8" opacity="0.5" />
                        
                        {/* Small background solvent noise */}
                        <path d="M 15,70 L 40,69 L 55,70 L 60,68 H 70 L 78,70 L 85,69 L 90,70 L 100,70" fill="none" stroke="#64748b" strokeWidth="1" />
                        
                        {/* Core Compound Purity Peak */}
                        <path d="M 100,70 L 110,68 L 114,60 L 118,20 L 122,5 L 126,20 L 130,60 L 135,69 L 140,70" fill="none" stroke="#2563eb" strokeWidth="2" />
                        
                        {/* Secondary tiny impurity peak */}
                        <path d="M 140,70 L 145,70 L 149,65 L 152,70 L 190,70" fill="none" stroke="#64748b" strokeWidth="1" />

                        {/* Labels */}
                        <text x="122" y="10" textAnchor="middle" fontSize="6.5" fill="#2563eb" fontWeight="bold" fontFamily="monospace">Target Peak [11.8 min]</text>
                        <text x="180" y="78" fontSize="6" fill="#94a3b8" textAnchor="end" fontFamily="monospace">min</text>
                      </svg>
                      
                      <div className="absolute top-2.5 right-2 px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-[9px] font-mono text-blue-700 rounded font-semibold">
                        Purity: &gt;97.8% (NMR Verified)
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-gray-500 mt-4 leading-normal">
                      The single high-intensity retention curve confirms robust chemical synthesis conversion with minimal side-product residues.
                    </p>
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}
