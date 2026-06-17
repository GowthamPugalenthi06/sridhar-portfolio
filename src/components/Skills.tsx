/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Microscope, Code, FlaskConical, Cpu, Layers, BarChart2 } from 'lucide-react';
import { SkillCategory } from '../types';

const SKILLS: SkillCategory[] = [
  {
    title: 'Computational Biology & Technology (CADD)',
    icon: 'code',
    skills: [
      { name: 'Molecular Docking (AutoDock / Vina / Glide)', level: 95, description: 'Flexible and rigid receptor crystal docking, sub-grid optimization, pocket binding-site conformation screening.' },
      { name: 'Molecular Dynamics (GROMACS / GROMOS)', level: 88, description: '100ns solvent trajectories, RMSD/RMSF calculations, ligand pocket relaxation simulations under pressure.' },
      { name: 'SMILES Computation & Libraries (RDKit / Python)', level: 85, description: 'Scripted compound generation, chemical database filtering, bio-activity metrics formatting and QSAR modeling.' },
      { name: 'Pharmacokinetic Tools (SwissADME / pkCSM)', level: 92, description: 'Virtual profiling of passive absorption, BBB permeability, Cyp450 metabolic blockades, and excretion values.' }
    ]
  },
  {
    title: 'Pharmaceutical Chemistry & Synthesis',
    icon: 'chemistry',
    skills: [
      { name: 'Heterocyclic Solvent Organic Synthesis', level: 90, description: 'Knoevenagel condensations, Fisher esterifications, condensation and reflux reactions of chemical leads.' },
      { name: 'Structure-Activity Relationships (SAR)', level: 95, description: 'Targeted R-group substitutions, halogen-bioisostere replacements, and pharmacophore map alignments.' },
      { name: 'Purity Analysis (HPLC / LC-MS / NMR)', level: 88, description: 'Spectrometric verification of synthetic yields, proton/carbon chemical shifts interpretation, and purity curves.' },
      { name: 'Retro-synthetic Reaction Pathways', level: 84, description: 'Theoretical mapping of active multi-step synthetic routes starting from commercially cataloged precursors.' }
    ]
  },
  {
    title: 'In-Vitro Biology & ADMET Assays',
    icon: 'biology',
    skills: [
      { name: 'Enzymatic FRET Assays & Kinetics', level: 92, description: 'Kinetics evaluations, Michaelis-Menten velocity curves, and IC50 serial dilution titration mapping.' },
      { name: 'Eukaryotic Cell Culturing (A549 / cancer)', level: 85, description: 'Sterile cell-line propagation, cellular viability screening, cytotoxicity curves, and growth arrest profiling.' },
      { name: 'ADMET Pharmacokinetics Logic', level: 90, description: 'Physiological absorption evaluation (logD, plasma protein coupling) and toxicity (AMET values, mutagenicity).' },
      { name: 'Biochemical Target Subpocket Alignment', level: 88, description: 'Alignment of catalytic dyads, binding-grooves, hydrogen link gaps, and salt bridge configurations.' }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills-matrix" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-100/60 rounded-full text-xs font-semibold text-sky-800 uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Bimodal Competencies
          </div>
          <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
            Hybrid Biotech & Synthesis Toolkit
          </h2>
          <p className="mt-2 text-base text-gray-600 font-sans">
            Bridging the wet lab and DRY lab. A specialized Pharmaceutical Chemistry background (M.Pharm) backed by heavy molecular modeling, coding libraries, and synthetic laboratory operations.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((cat) => (
            <div key={cat.title} className="bg-slate-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
              
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className={`p-2 rounded-lg ${
                    cat.icon === 'code' 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : cat.icon === 'chemistry' 
                      ? 'bg-rose-50 text-rose-700' 
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {cat.icon === 'code' ? (
                      <Code className="w-5 h-5" />
                    ) : cat.icon === 'chemistry' ? (
                      <FlaskConical className="w-5 h-5" />
                    ) : (
                      <Microscope className="w-4 h-4" />
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider leading-snug">
                    {cat.title}
                  </h3>
                </div>

                {/* Categories Skills List */}
                <div className="space-y-5 font-sans">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-slate-800">{skill.name}</span>
                        <span className="font-mono text-[10px] text-gray-400 font-bold">{skill.level}%</span>
                      </div>
                      
                      {/* Level Indicator line */}
                      <div className="w-full bg-gray-200/50 h-1 rounded-full overflow-hidden mb-1.5">
                        <div 
                          className={`h-1 rounded-full transition-all duration-500 ${
                            cat.icon === 'code' 
                              ? 'bg-indigo-505 bg-indigo-600' 
                              : cat.icon === 'chemistry' 
                              ? 'bg-rose-600' 
                              : 'bg-emerald-600'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className="text-[10.5px] text-gray-500 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Tag */}
              <div className="mt-8 pt-4 border-t border-gray-100/50 flex justify-between items-center text-[9px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                <span>Domain Status</span>
                <span className="text-emerald-700">Validated In-Lab</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
