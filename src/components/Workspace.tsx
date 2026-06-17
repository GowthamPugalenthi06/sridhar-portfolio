/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Receptor, FunctionalGroup } from '../types';
import { Beaker, ShieldAlert, CheckCircle2, RotateCcw, Info, Zap, Activity } from 'lucide-react';

// Define Receptors (Clinical Targets)
const RECEPTORS: Receptor[] = [
  {
    id: 'mpro',
    name: 'SARS-CoV-2 Mpro',
    fullName: 'Main Protease (3CLpro)',
    description: 'The primary protease essential for viral replication and transcription. Inhibiting Mpro halts the replication cycle of the virus.',
    targetIndication: 'Antiviral / COVID-19 Pharmacotherapy',
    pdbId: '6LU7',
    baseAffinity: -6.2, // kcal/mol
    bindingSiteResidues: [
      { name: 'Cys145', type: 'hydrophobic' },
      { name: 'His41', type: 'electrostatic' },
      { name: 'Glu166', type: 'hydrogen-bond-acceptor' },
      { name: 'Gln189', type: 'hydrogen-bond-donor' }
    ]
  },
  {
    id: 'egfr',
    name: 'EGFR Kinase',
    fullName: 'Epidermal Growth Factor Receptor',
    description: 'A transmembrane receptor tyrosine kinase often overexpressed in non-small cell lung cancer (NSCLC). Blockade halts cell proliferation signaling.',
    targetIndication: 'Oncology / Tyrosine Kinase Inhibition',
    pdbId: '1M17',
    baseAffinity: -5.8,
    bindingSiteResidues: [
      { name: 'Met793', type: 'hydrogen-bond-donor' },
      { name: 'Thr790', type: 'hydrophobic' },
      { name: 'Asp855', type: 'electrostatic' },
      { name: 'Lys745', type: 'hydrogen-bond-acceptor' }
    ]
  },
  {
    id: 'ache',
    name: 'AChE',
    fullName: 'Acetylcholinesterase',
    description: 'An enzyme that degrades the neurotransmitter acetylcholine in synaptic clefts. Inhibiting AChE elevates neurotransmitter levels to alleviate cognitive decline.',
    targetIndication: 'Neuroscience / Alzheimer\'s Disease Therapy',
    pdbId: '1EVE',
    baseAffinity: -6.5,
    bindingSiteResidues: [
      { name: 'Trp86', type: 'hydrophobic' },
      { name: 'Asp74', type: 'electrostatic' },
      { name: 'Tyr124', type: 'hydrogen-bond-donor' },
      { name: 'Ser203', type: 'hydrogen-bond-acceptor' }
    ]
  }
];

// Define possible substitutions at R1 (Left substitution site)
const R1_GROUPS: FunctionalGroup[] = [
  {
    id: 'r1-h',
    name: 'Hydrogen',
    formula: '-H',
    mwDelta: 1.0,
    logPDelta: 0,
    hbdDelta: 0,
    hbaDelta: 0,
    description: 'Baseline hydrogen. No specific directional or lipophilic enhancements.',
    smilesFragment: 'H',
    targetAffinityDelta: { mpro: 0, egfr: 0, ache: 0 }
  },
  {
    id: 'r1-f',
    name: 'Fluorine',
    formula: '-F',
    mwDelta: 19.0,
    logPDelta: 0.14,
    hbdDelta: 0,
    hbaDelta: 0,
    description: 'A critical bio-isostere. Enhances metabolic stability and lipophilicity without expanding molecular volume excessively.',
    smilesFragment: 'F',
    targetAffinityDelta: { mpro: -0.8, egfr: -0.4, ache: -0.2 } // lowers kcal/mol -> higher affinity
  },
  {
    id: 'r1-oh',
    name: 'Hydroxyl',
    formula: '-OH',
    mwDelta: 17.0,
    logPDelta: -0.67,
    hbdDelta: 1,
    hbaDelta: 1,
    description: 'Introduces a strong hydrogen bond donor-acceptor capability. Can establish deep interactions with polar pocket residues.',
    smilesFragment: 'OH',
    targetAffinityDelta: { mpro: -1.2, egfr: -0.1, ache: -1.1 } // Strong interaction with Glu166 (Mpro) / Tyr124 (AChE)
  },
  {
    id: 'r1-cf3',
    name: 'Trifluoromethyl',
    formula: '-CF3',
    mwDelta: 69.0,
    logPDelta: 0.88,
    hbdDelta: 0,
    hbaDelta: 0,
    description: 'Highly lipophilic and heavily electron-withdrawing. Drives ligand into hydrophobic subpockets.',
    smilesFragment: 'C(F)(F)F',
    targetAffinityDelta: { mpro: -0.3, egfr: -1.5, ache: -1.4 } // Deep hydrophobic fit in EGFR (Thr790) / AChE (Trp86)
  },
  {
    id: 'r1-och3',
    name: 'Methoxy',
    formula: '-OCH3',
    mwDelta: 31.0,
    logPDelta: -0.12,
    hbdDelta: 0,
    hbaDelta: 1,
    description: 'Moderately lipophilic. Provides H-bond acceptor oxygen atom while projecting a mild steric profile.',
    smilesFragment: 'OC',
    targetAffinityDelta: { mpro: -0.6, egfr: -0.9, ache: -0.5 }
  }
];

// Define possible substitutions at R2 (Right substitution site)
const R2_GROUPS: FunctionalGroup[] = [
  {
    id: 'r2-h',
    name: 'Hydrogen',
    formula: '-H',
    mwDelta: 1.0,
    logPDelta: 0,
    hbdDelta: 0,
    hbaDelta: 0,
    description: 'Baseline hydrogen. Non-functional substituent.',
    smilesFragment: 'H',
    targetAffinityDelta: { mpro: 0, egfr: 0, ache: 0 }
  },
  {
    id: 'r2-nh2',
    name: 'Amine',
    formula: '-NH2',
    mwDelta: 16.0,
    logPDelta: -1.23,
    hbdDelta: 2,
    hbaDelta: 1,
    description: 'Hydrophilic, basic functional group. Excellent for salt-bridge electrostatic interactions or key hydrogen bond schemes.',
    smilesFragment: 'N',
    targetAffinityDelta: { mpro: -1.1, egfr: -1.4, ache: -0.4 } // High affinity with Mpro (Glu166) / EGFR (Asp855)
  },
  {
    id: 'r2-conh2',
    name: 'Carboxamide',
    formula: '-CONH2',
    mwDelta: 44.0,
    logPDelta: -1.49,
    hbdDelta: 2,
    hbaDelta: 2,
    description: 'Polar group providing highly coordinated bivalent hydrogen bonds with both backbone and side-chain donors/acceptors.',
    smilesFragment: 'C(=O)N',
    targetAffinityDelta: { mpro: -1.8, egfr: -0.5, ache: -1.2 } // Extremely stellar fit in Mpro dimerization pocket
  },
  {
    id: 'r2-cl',
    name: 'Chlorine',
    formula: '-Cl',
    mwDelta: 35.5,
    logPDelta: 0.56,
    hbdDelta: 0,
    hbaDelta: 0,
    description: 'Hydrophobic halogen. Coordinates hydrophobic dispersion forces and acts as a mild bio-isostere for methyl groups.',
    smilesFragment: 'Cl',
    targetAffinityDelta: { mpro: -0.4, egfr: -1.1, ache: -1.5 } // Fits deeply in hydrophobic pocket of AChE/EGFR
  },
  {
    id: 'r2-cooh',
    name: 'Carboxylic Acid',
    formula: '-COOH',
    mwDelta: 45.0,
    logPDelta: -0.81,
    hbdDelta: 1,
    hbaDelta: 2,
    description: 'Highly polar, physiological acid. Charged (carboxylate) under biological pH, allowing electrostatic lock with basic residues.',
    smilesFragment: 'C(=O)O',
    targetAffinityDelta: { mpro: 0.2, egfr: -1.6, ache: -0.2 } // Forms amazing salt bridge with EGFR Lys745, but steric clash in Mpro template
  }
];

export default function Workspace() {
  const [selectedReceptor, setSelectedReceptor] = useState<Receptor>(RECEPTORS[0]);
  const [selectedR1, setSelectedR1] = useState<FunctionalGroup>(R1_GROUPS[0]);
  const [selectedR2, setSelectedR2] = useState<FunctionalGroup>(R2_GROUPS[0]);

  // Base constants of Core Scaffold (6-substituted quinoline derivative or equivalent core scaffold)
  const coreScaffold = {
    name: 'Quinoline-based CADD Scaffold',
    baseMw: 257.3,
    baseLogP: 1.84,
    baseHbd: 1,
    baseHba: 2,
    baseSmiles: 'C1=CC=C2C(=C1)C=CN=C2'
  };

  // Calculations
  const calculations = useMemo(() => {
    // Net molecular parameters
    const mw = parseFloat((coreScaffold.baseMw + selectedR1.mwDelta + selectedR2.mwDelta - 2.0).toFixed(1)); // subtract 2.0 H atoms for substitution
    const logP = parseFloat((coreScaffold.baseLogP + selectedR1.logPDelta + selectedR2.logPDelta).toFixed(2));
    const hbd = coreScaffold.baseHbd + selectedR1.hbdDelta + selectedR2.hbdDelta;
    const hba = coreScaffold.baseHba + selectedR1.hbaDelta + selectedR2.hbaDelta;

    // Thermodynamic delta-G computation (kcal/mol)
    const affinity = parseFloat((selectedReceptor.baseAffinity + selectedR1.targetAffinityDelta[selectedReceptor.id] + selectedR2.targetAffinityDelta[selectedReceptor.id]).toFixed(2));

    // Convert delta-G (kcal/mol) to Kd (equilibrium dissociation constant)
    // dG = R * T * ln(Kd)
    // Kd = exp(dG / (R * T))
    // Standard T = 298.15 K, R = 1.9872e-3 kcal/(mol * K) => R*T = 0.5925 kcal/mol
    // Kd in Molar units = exp(affinity / 0.5925)
    const kdMolar = Math.exp(affinity / 0.5925);
    let kdFormatted = '';
    if (kdMolar < 1e-9) {
      kdFormatted = `${(kdMolar * 1e12).toFixed(1)} pM`;
    } else if (kdMolar < 1e-6) {
      kdFormatted = `${(kdMolar * 1e9).toFixed(1)} nM`;
    } else if (kdMolar < 1e-3) {
      kdFormatted = `${(kdMolar * 1e6).toFixed(1)} µM`;
    } else {
      kdFormatted = `${(kdMolar * 1e3).toFixed(1)} mM`;
    }

    // Lipinski's Rule of 5 Validation
    const lipinski = {
      mw: mw <= 500,
      logP: logP <= 5,
      hbd: hbd <= 5,
      hba: hba <= 10,
      passes: mw <= 500 && logP <= 5 && hbd <= 5 && hba <= 10
    };

    // Construct custom SMILES string for representation
    let smiles = `R1-${coreScaffold.baseSmiles}-R2`;
    // Approximate a dynamic SMILES representing scaffold and substituents
    if (selectedR1.id !== 'r1-h' && selectedR2.id !== 'r2-h') {
      smiles = `${selectedR1.smilesFragment}-C1=CC=C2C(C(=CN=C2)${selectedR2.smilesFragment})=C1`;
    } else if (selectedR1.id !== 'r1-h') {
      smiles = `${selectedR1.smilesFragment}-C1=CC=C2C=CN=CC2=C1`;
    } else if (selectedR2.id !== 'r2-h') {
      smiles = `C1=CC=C2C(C(=CN=C2)${selectedR2.smilesFragment})=C1`;
    } else {
      smiles = coreScaffold.baseSmiles;
    }

    // Determine residue specific bindings to highlight
    // Mpro: R1-OH matches Glu166, R2-CONH2 matches Gln189/Cys145
    // EGFR: R1-CF3 matches Thr790, R2-NH2/COOH matches Asp855/Lys745
    // AChE: R1-CF3/OH matches Trp86/Tyr124, R2-Cl matches Trp86
    const activeBonds: string[] = [];
    if (selectedReceptor.id === 'mpro') {
      if (selectedR1.id === 'r1-oh' || selectedR1.id === 'r1-och3') activeBonds.push('Glu166');
      if (selectedR2.id === 'r2-conh2' || selectedR2.id === 'r2-nh2') activeBonds.push('Gln189');
      if (selectedR2.id === 'r2-conh2') activeBonds.push('Cys145');
    } else if (selectedReceptor.id === 'egfr') {
      if (selectedR1.id === 'r1-cf3') activeBonds.push('Thr790');
      if (selectedR2.id === 'r2-nh2' || selectedR2.id === 'r2-cooh') activeBonds.push('Asp855');
      if (selectedR2.id === 'r2-cooh') activeBonds.push('Lys745');
    } else if (selectedReceptor.id === 'ache') {
      if (selectedR1.id === 'r1-cf3' || selectedR1.id === 'r1-f') activeBonds.push('Trp86');
      if (selectedR1.id === 'r1-oh') activeBonds.push('Tyr124');
      if (selectedR2.id === 'r2-cl' || selectedR2.id === 'r2-conh2') activeBonds.push('Ser203');
    }

    return { mw, logP, hbd, hba, affinity, kdFormatted, lipinski, smiles, activeBonds };
  }, [selectedReceptor, selectedR1, selectedR2]);

  const resetSubstitutions = () => {
    setSelectedR1(R1_GROUPS[0]);
    setSelectedR2(R2_GROUPS[0]);
  };

  return (
    <section id="interactive-workspace" className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-semibold text-teal-800 uppercase tracking-widest mb-3">
            <Beaker className="w-3.5 h-3.5" />
            In-Silico Sandbox
          </div>
          <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
            Interactive Computational Drug Discovery
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 font-sans">
            Design novel chemical structures in real-time. Make bio-isosteric substitutions on our lead core and evaluate their target binding affinities and drug-likeness.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Drug Design Controls & Selection */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Target Biological Receptor Selection */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1">
                <Activity className="w-4 h-4 text-teal-600" />
                1. Select Biological Target
              </h3>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {RECEPTORS.map((receptor) => (
                  <button
                    key={receptor.id}
                    id={`target-select-${receptor.id}`}
                    onClick={() => setSelectedReceptor(receptor)}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-center transition-all ${
                      selectedReceptor.id === receptor.id
                        ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">{receptor.name}</div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase">PDB: {receptor.pdbId}</div>
                  </button>
                ))}
              </div>
              
              <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-100/50 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-800">{selectedReceptor.fullName}</span>
                  <span className="px-1.5 py-0.5 bg-slate-200/60 rounded text-[10px] text-slate-600 font-mono">PDB: {selectedReceptor.pdbId}</span>
                </div>
                <p className="text-gray-500 leading-relaxed text-xs">{selectedReceptor.description}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-teal-800 font-medium">
                  Therapy Target: {selectedReceptor.targetIndication}
                </div>
              </div>
            </div>

            {/* Molecule Substituents (R1 and R2 Selection) */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    2. Structure Modifications
                  </h3>
                  <button
                    id="reset-simulation-btn"
                    onClick={resetSubstitutions}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Core
                  </button>
                </div>

                {/* Sub R1 */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-700">R₁ Substitution Site (Lipophilic/Metabolism)</label>
                    <span className="text-[11px] font-mono text-teal-600 font-semibold">{selectedR1.formula}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {R1_GROUPS.map((g) => (
                      <button
                        key={g.id}
                        id={`r1-group-${g.id}`}
                        onClick={() => setSelectedR1(g)}
                        className={`px-2.5 py-1.5 text-xs rounded-md border transition-all ${
                          selectedR1.id === g.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-medium'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50/50'
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 italic font-sans">{selectedR1.description}</p>
                </div>

                {/* Sub R2 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-700">R₂ Substitution Site (Polar Contacts)</label>
                    <span className="text-[11px] font-mono text-teal-600 font-semibold">{selectedR2.formula}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {R2_GROUPS.map((g) => (
                      <button
                        key={g.id}
                        id={`r2-group-${g.id}`}
                        onClick={() => setSelectedR2(g)}
                        className={`px-2.5 py-1.5 text-xs rounded-md border transition-all ${
                          selectedR2.id === g.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-medium'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50/50'
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 italic font-sans">{selectedR2.description}</p>
                </div>
              </div>

              {/* Dynamic Smiles String */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Estimated SMILES String</span>
                <code className="text-xs font-mono select-all bg-gray-50 text-gray-600 block p-2 rounded border border-gray-100 overflow-x-auto whitespace-nowrap">
                  {calculations.smiles}
                </code>
              </div>
            </div>

          </div>

          {/* Column 2: The Binding Pocket and Drug Render (Interactive Centerpiece) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[350px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block self-start mb-1">Target In-Silico Binding Site</span>
            
            <div className="relative w-full aspect-square max-w-[280px] bg-slate-50/30 rounded-xl overflow-hidden border border-gray-100/30">
              
              {/* Dynamic Binding Site SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                
                {/* Pocket boundary representation */}
                <path 
                  d="M 50,50 Q 150,20 250,50 T 350,150 T 380,250 T 310,350 T 150,380 T 50,300 T 20,180 Z" 
                  fill="#f1f5f9" 
                  stroke="#e2e8f0" 
                  strokeWidth="3" 
                  strokeDasharray="4 2"
                  className="animate-pulse"
                  style={{ animationDuration: '6s' }}
                />
                
                <text x="200" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  [{selectedReceptor.pdbId}] ACTIVE POCKET
                </text>

                {/* Draw Protein Residues around core ligand */}
                {selectedReceptor.bindingSiteResidues.map((res, idx) => {
                  // Coordinate spacing based on target index to spread them nicely
                  const angles = [35, 120, 260, 315];
                  const angle = (angles[idx] * Math.PI) / 180;
                  const radius = 135;
                  const cx = 200 + radius * Math.cos(angle);
                  const cy = 200 + radius * Math.sin(angle);
                  
                  // Check if this residue is actively firing interaction lines
                  const isActive = calculations.activeBonds.includes(res.name);

                  // Colors based on properties
                  let resColor = '#64748b'; // default
                  let fillLight = '#f8fafc';
                  if (res.type === 'hydrogen-bond-donor') { resColor = '#0284c7'; fillLight = '#f0f9ff'; }
                  else if (res.type === 'hydrogen-bond-acceptor') { resColor = '#059669'; fillLight = '#ecfdf5'; }
                  else if (res.type === 'hydrophobic') { resColor = '#d97706'; fillLight = '#fffbeb'; }
                  else if (res.type === 'electrostatic') { resColor = '#7c3aed'; fillLight = '#f5f3ff'; }

                  return (
                    <g key={res.name} className="transition-all duration-300">
                      {/* Interactive Field Indicator */}
                      {isActive && (
                        <circle cx={cx} cy={cy} r="42" fill={resColor} opacity="0.08" className="animate-ping" style={{ animationDuration: '3s' }} />
                      )}
                      
                      {/* Residue Node Bubble */}
                      <circle cx={cx} cy={cy} r="26" fill={fillLight} stroke={isActive ? resColor : '#cbd5e1'} strokeWidth={isActive ? '2.5' : '1.5'} />
                      <text x={cx} y={cy - 2} textAnchor="middle" fill={isActive ? resColor : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                        {res.name}
                      </text>
                      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                        {res.type === 'hydrophobic' ? 'ALIPH' : res.type === 'hydrogen-bond-donor' ? 'DONOR' : res.type === 'hydrogen-bond-acceptor' ? 'ACCEPT' : 'IONIC'}
                      </text>

                      {/* Line connecting to drug binding center */}
                      {isActive && (
                        <line 
                          x1={cx} 
                          y1={cy} 
                          // Hook to R1 side or R2 side of coordinate space
                          x2={idx % 2 === 0 ? 150 : 250} 
                          y2={200} 
                          stroke={resColor} 
                          strokeWidth="2.5" 
                          strokeDasharray="4 3" 
                          className="stroke-animated-dash"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Central Molecular Core Scaffold Graphic */}
                <g transform="translate(130, 160)" className="transition-all duration-500">
                  
                  {/* Quinoline Aromatic ring 1 (Left) */}
                  <polygon points="40,40 85,20 130,40 130,85 85,105 40,85" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                  <circle cx="85" cy="62" r="18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Quinoline pyridine structural ring 2 (Right) */}
                  <polygon points="130,40 175,20 220,40 220,85 175,105 130,85" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Pyridine Nitrogen Atom index */}
                  <text x="175" y="101" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="bold" fontFamily="sans-serif">N</text>

                  {/* R1 position indicator line & node (Left side) */}
                  <line x1="40" y1="62" x2="5" y2="62" stroke="#1e293b" strokeWidth="2" />
                  <g transform="translate(-15, 62)">
                    <circle r="15" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold" fontFamily="monospace">R₁</text>
                    {/* Tiny subscript of current group */}
                    <text x="0" y="22" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif">{selectedR1.formula}</text>
                  </g>

                  {/* R2 position indicator line & node (Right side) */}
                  <line x1="220" y1="62" x2="255" y2="62" stroke="#1e293b" strokeWidth="2" />
                  <g transform="translate(270, 62)">
                    <circle r="15" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold" fontFamily="monospace">R₂</text>
                    {/* Subscript chemical name tag */}
                    <text x="0" y="22" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif">{selectedR2.formula}</text>
                  </g>
                </g>

              </svg>
              
              {/* Dynamic Overlay indicator */}
              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 backdrop-blur-sm shadow-md px-3 py-1.5 rounded-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-[10px] font-mono font-medium text-slate-100 uppercase tracking-widest">
                  Affinity Lock: {calculations.affinity} kcal/mol
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[11px] text-gray-500 max-w-[280px] text-center font-sans">
              <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Dotted lines highlight strong molecular docking contacts stabilizing the therapeutic pose.</span>
            </div>
          </div>

          {/* Column 3: Analytical Quantitative Readouts */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">

            {/* In Silico Affinity Metrics */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-teal-600" />
                3. Binding Energy Metrics
              </h3>
              
              <div className="space-y-4 font-sans">
                {/* Binding Energy */}
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Est. Gibbs Free Energy (ΔG)</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-mono font-bold text-gray-900">{calculations.affinity}</span>
                    <span className="text-xs text-gray-500 font-medium">kcal/mol</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    {/* -10 is excellent affinity, 0 is poor. Let's map is proportionally. */}
                    <div 
                      className="bg-teal-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Math.max(0, (calculations.affinity / -10) * 100))}%` }}
                    />
                  </div>
                </div>

                {/* Dissociation Constant (Kd) */}
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Est. Affinity Equilibrium (K<sub>d</sub>)</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-mono font-bold text-teal-600">{calculations.kdFormatted}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 leading-normal block mt-1">
                    Lower values indicate superior molecular potency.
                  </span>
                </div>
              </div>
            </div>

            {/* ADMET & Lipinski Criteria */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  4. Lipinski's Rule of Five
                </h3>
                
                <div className="space-y-3 font-sans">
                  
                  {/* MW */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Molecular Weight (MW)</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-gray-700 font-semibold">{calculations.mw} Da</span>
                      {calculations.lipinski.mw ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* LogP */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Lipophilicity (AlogP)</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-gray-700 font-semibold">{calculations.logP}</span>
                      {calculations.lipinski.logP ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* HBD */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">H-Bond Donors (HBD)</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-gray-700 font-semibold">{calculations.hbd}</span>
                      {calculations.lipinski.hbd ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* HBA */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">H-Bond Acceptors (HBA)</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-gray-700 font-semibold">{calculations.hba}</span>
                      {calculations.lipinski.hba ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Final Lipinski Check Badge */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Lipinski Compliance:</span>
                {calculations.lipinski.passes ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Optimal Pass
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                    <ShieldAlert className="w-3 h-3" />
                    Violation
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
      
      {/* Dynamic Styling injected for clean dashed interaction waves */}
      <style>{`
        .stroke-animated-dash {
          animation: stroke-offset-loop 1.8s infinite linear;
        }
        @keyframes stroke-offset-loop {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </section>
  );
}
