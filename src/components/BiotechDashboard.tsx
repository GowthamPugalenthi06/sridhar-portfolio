/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Microscope, HelpCircle, Activity, Info, CheckCircle2 } from 'lucide-react';

export default function BiotechDashboard() {
  const [selectedAssay, setSelectedAssay] = useState<'cancer-cell' | 'enzyme-mpro'>('cancer-cell');
  
  // Slide state represents drug concentration in nanomolar (nM) on a log-scale representation
  // Let value fluctuate from 0 to 100, mapped exponentially to 0.1 nM to 10,000 nM
  const [sliderVal, setSliderVal] = useState<number>(50);

  const assayConfig = {
    'cancer-cell': {
      title: 'A549 Lung Cancer Call Assay Viability Screen',
      targetName: 'EGFR-Expressing Lung Cells',
      unit: '% Survival',
      ic50Value: 18, // nM
      hillSlope: 1.1,
      baselineViability: 100,
      description: 'Evaluating cell-viability arrest following serial dilutions of ligand. A steep decline showcases high cytotoxicity against tumor cells while maintaining healthy selectivity profile.'
    },
    'enzyme-mpro': {
      title: 'SARS-CoV-2 Mpro Enzymatic Proteolysis assay',
      targetName: 'Purified Recombinant Mpro Protease',
      unit: '% Activity',
      ic50Value: 160, // nM
      hillSlope: 1.0,
      baselineViability: 100,
      description: 'FRET spectrophotometric cleavage rate. Lower activity velocity indicates highly potent inhibitor ligand anchoring within viral replication channels.'
    }
  };

  // Compute concentration & inhibition based on sliding value
  const calculations = useMemo(() => {
    const config = assayConfig[selectedAssay];
    
    // Logarithmic distribution: slider 0 -> 0.1 nM, slider 50 -> approx IC50, slider 100 -> 10,000 nM
    const minLog = Math.log10(0.1);
    const maxLog = Math.log10(15000);
    const logVal = minLog + (sliderVal / 100) * (maxLog - minLog);
    const concentration = Math.pow(10, logVal);

    // Hill equation for dose-response curve:
    // Cell Viability = Baseline / (1 + (Concentration / IC50)^Hill)
    const viability = parseFloat((config.baselineViability / (1 + Math.pow((concentration / config.ic50Value), config.hillSlope))).toFixed(1));
    const inhibition = parseFloat((100 - viability).toFixed(1));

    // Formatted concentration label
    let concLabel = '';
    if (concentration < 1) {
      concLabel = `${(concentration * 1000).toFixed(0)} pM`;
    } else if (concentration < 1000) {
      concLabel = `${concentration.toFixed(1)} nM`;
    } else {
      concLabel = `${(concentration / 1000).toFixed(2)} µM`;
    }

    // Status evaluation
    let statusText = 'Negligible Blockade';
    let statusColor = 'text-slate-400 bg-slate-50';
    if (inhibition > 90) {
      statusText = 'Therapeutic Saturation Zone';
      statusColor = 'text-emerald-800 bg-emerald-50';
    } else if (inhibition > 50) {
      statusText = 'Target IC50 Threshold Surpassed';
      statusColor = 'text-blue-800 bg-blue-50';
    } else if (inhibition > 10) {
      statusText = 'Sub-optimal Partial Inhibition';
      statusColor = 'text-amber-800 bg-amber-50 font-normal';
    }

    return { concentration, viability, inhibition, concLabel, statusText, statusColor, config };
  }, [selectedAssay, sliderVal]);

  // Generate responsive coordinates to draw a beautiful sigmoidal curve representatively inside the SVG box
  // x goes from 10 to 290. y goes from 10 to 110 (top is 100% cell survival, bottom is 0% cell survival)
  const plotPoints = useMemo(() => {
    const points: Array<{ x: number; y: number }> = [];
    const config = assayConfig[selectedAssay];
    
    // We want 15 plotting steps
    for (let i = 0; i <= 100; i += 5) {
      const minLog = Math.log10(0.1);
      const maxLog = Math.log10(15000);
      const logVal = minLog + (i / 100) * (maxLog - minLog);
      const tempConc = Math.pow(10, logVal);
      const tempViab = (config.baselineViability / (1 + Math.pow((tempConc / config.ic50Value), config.hillSlope)));
      
      // Map i [0-100] to x coordinate space [30-280]
      const x = 30 + (i / 100) * 250;
      // Map tempViab [100% - 0%] to y coordinate space [20-120]
      // 100% viability is at y=20 (high), 0% is at y=120 (low)
      const y = 20 + ((100 - tempViab) / 100) * 100;
      points.push({ x, y });
    }

    return points.reduce((path, p, idx) => {
      if (idx === 0) return `M ${p.x},${p.y}`;
      const prev = points[idx - 1];
      const cx = (prev.x + p.x) / 2;
      return `${path} Q ${cx},${prev.y} ${p.x},${p.y}`;
    }, '');
  }, [selectedAssay]);

  // Coordinates of the USER SELECTED POINT on the curve (for visual ring placement)
  const activeDotCoords = useMemo(() => {
    // Map sliderVal directly to x coordinate space [30-280]
    const x = 30 + (sliderVal / 100) * 250;
    // Map viability [100% - 0%] to y coordinate space [20-120]
    const y = 20 + ((100 - calculations.viability) / 100) * 100;
    return { x, y };
  }, [sliderVal, calculations.viability]);

  return (
    <section id="biotech-intersection" className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Context */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-3">
            <Activity className="w-3.5 h-3.5" />
            Biological In-Vitro Assay Hub
          </div>
          <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
            Inhibition Kinetics & Titration Assays
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 font-sans">
            Validating computer models using serial concentration titrations. Change drug dose concentrations below to observe cell-line survival and enzyme blockade profiles.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls column */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-150/40 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                1. Select Titration Study
              </h3>
              
              <div className="space-y-2 mb-6">
                <button
                  id="assay-select-cancer-btn"
                  onClick={() => setSelectedAssay('cancer-cell')}
                  className={`w-full text-left p-3.5 rounded-xl border transition ${
                    selectedAssay === 'cancer-cell' 
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-3xs' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-800 block">EGFR Cancer Viability Screen</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 uppercase tracking-wider font-mono">Assay: In-Vitro Cell Line</span>
                </button>

                <button
                  id="assay-select-enzyme-btn"
                  onClick={() => setSelectedAssay('enzyme-mpro')}
                  className={`w-full text-left p-3.5 rounded-xl border transition ${
                    selectedAssay === 'enzyme-mpro' 
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-3xs' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-800 block">SARS-CoV-2 Mpro FRET Kinetic Assay</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 uppercase tracking-wider font-mono">Assay: Enzymatic Proteo-cleavage</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  Assay Environment Details
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{calculations.config.description}</p>
              </div>
            </div>

            {/* Slider control section */}
            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2.5 font-sans">
                <label className="text-xs font-bold text-gray-700">Dose Titration Dilution:</label>
                <span className="text-xs font-mono font-bold text-emerald-600">{calculations.concLabel}</span>
              </div>
              <input
                id="assay-concentration-slider"
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono mt-1.5">
                <span>0.1 nM (Ultra low dilution)</span>
                <span>15 µM (High saturation)</span>
              </div>
            </div>
          </div>

          {/* Graphical visualization block */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-150/40 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block self-start mb-2">Hill-Slopped Sigmoidal Curve (Dose-Response)</span>
            
            {/* SVG Plot */}
            <div className="relative w-full aspect-[2/1.4] bg-slate-50/55 rounded-xl border border-slate-100 p-2 overflow-visible">
              
              <svg viewBox="0 0 300 140" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1="30" y1="120" x2="290" y2="120" stroke="#94a3b8" strokeWidth="1" />
                <line x1="30" y1="20" x2="30" y2="120" stroke="#94a3b8" strokeWidth="1" />

                {/* Y-axis Labels */}
                <text x="5" y="24" fontSize="8" fill="#94a3b8" fontFamily="monospace">100%</text>
                <text x="5" y="74" fontSize="8" fill="#94a3b8" fontFamily="monospace">50%</text>
                <text x="10" y="124" fontSize="8" fill="#94a3b8" fontFamily="monospace">0%</text>
                <text x="12" y="10" fontSize="8" fill="#475569" fontWeight="bold" fontFamily="sans-serif">{calculations.config.unit}</text>

                {/* X-axis Labels */}
                <text x="30" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">10⁻¹</text>
                <text x="92.5" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">10¹</text>
                <text x="155" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">10²</text>
                <text x="217.5" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">10³</text>
                <text x="280" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">10⁴</text>
                <text x="260" y="138" fontSize="8" fill="#475569" fontWeight="bold" fontFamily="sans-serif">Concentration (nM)</text>

                {/* 50% inhibition threshold dotted baseline */}
                <line x1="30" y1="70" x2="280" y2="70" stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="275" y="67" fontSize="7" fill="#94a3b8" textAnchor="end" fontFamily="monospace">Inhibition IC₅₀</text>

                {/* Plot the Curve */}
                <path 
                  d={plotPoints} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  className="transition-all duration-300"
                />

                {/* Active Slider indicator bubble */}
                <g className="transition-all duration-300">
                  <circle cx={activeDotCoords.x} cy={activeDotCoords.y} r="7" fill="#10b981" opacity="0.3" className="animate-ping" />
                  <circle cx={activeDotCoords.x} cy={activeDotCoords.y} r="4.5" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                </g>

                {/* IC50 value intersection marker */}
                {/* Map assays IC50 logarithmically to X */}
                {(() => {
                  const minLog = Math.log10(0.1);
                  const maxLog = Math.log10(15000);
                  const targetLog = Math.log10(calculations.config.ic50Value);
                  const percentX = (targetLog - minLog) / (maxLog - minLog);
                  const ic50X = 30 + percentX * 250;
                  
                  return (
                    <g>
                      <line x1={ic50X} y1="20" x2={ic50X} y2="120" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                      <circle cx={ic50X} cy="70" r="3" fill="#3b82f6" />
                      <text x={ic50X + 5} y="117" fontSize="7.5" fill="#3b82f6" fontWeight="bold" fontFamily="monospace">IC₅₀: {calculations.config.ic50Value}nM</text>
                    </g>
                  );
                })()}

              </svg>

            </div>

            <div className="mt-4 p-3.5 bg-slate-50 border border-gray-150/40 rounded-xl leading-relaxed text-left w-full text-[11px] text-gray-500 font-sans">
              <span className="font-bold text-slate-700 block mb-0.5">Understanding Sigmoidal Titration:</span>
              As you increase the dosage (going right), receptor phosphorylation and survival blockades stabilize. A lower IC<sub>50</sub> intersection shifts the curve leftward, symbolizing maximum therapeutic efficiency.
            </div>
          </div>

          {/* Analytics Column showcasing numeric outcomes */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-5">
            
            {/* Bio Outcomes card */}
            <div className="p-6 bg-white rounded-2xl border border-gray-150/40 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target Response Status</span>
              <div className={`px-2.5 py-1.5 rounded text-xs font-bold font-sans text-center tracking-wide uppercase ${calculations.statusColor}`}>
                {calculations.statusText}
              </div>
            </div>

            {/* Viability block */}
            <div className="p-6 bg-white rounded-2xl border border-gray-150/40 shadow-sm">
              <span className="text-xs text-gray-400 font-medium block">Active Cellular Viability</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-mono font-bold text-slate-800">{calculations.viability}</span>
                <span className="text-sm text-slate-500">%</span>
              </div>
              <p className="text-[10.5px] text-gray-400 leading-normal mt-1 block">
                Percentage of tumor tissues undergoing normal replication and structural respiration processes.
              </p>
            </div>

            {/* Inhibition block */}
            <div className="p-6 bg-white rounded-2xl border border-gray-150/40 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">Inhibitory Blockade Efficacy</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-mono font-bold text-emerald-600">{calculations.inhibition}</span>
                  <span className="text-sm text-emerald-500">%</span>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center gap-1.5 text-[11.5px] text-gray-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Computed Hill slope dynamics model validated at biological temperature levels.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
