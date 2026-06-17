/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from '../types';
import { Microscope, Code, FlaskConical, ExternalLink, Filter, ChevronDown, ChevronUp, Database } from 'lucide-react';

const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'In-Silico Design & Reflux Synthesis of Novel Coumarin Derivatives as Selective COX-2 Inhibitors',
    category: 'synthesis',
    summary: 'A computer-aided target validation study optimizing a chemical library of coumarin rings. Promising hits were synthesized via solvent reflux and evaluated using biochem assays for anti-inflammatory selectivity.',
    objective: 'To optimize the phenyl-ring substituents of coumarin scaffolds to selectively block Cyclooxygenase-2 (COX-2) over the gastro-protective COX-1 isoform, averting renal and gastric adverse effects.',
    methodology: [
      'Ligand model building & conformational search (energy minimization via Merck Molecular Force Field MMFF94).',
      'Flexible docking simulation inside active channels of human COX-2 (PDB: 1CX2) and COX-1 (PDB: 1EQG).',
      'Wet-lab synthesis of top-tier 3-arylcoumarin candidates via Knoevenagel condensation reactions under reflux.',
      'In-vitro enzymatic inhibition assays using a FRET fluorescence-based COX microplate detection suite.'
    ],
    results: 'Out of 16 virtual molecules, local compounds 4b and 4f were prioritized and synthesized (78% yield). Compound 4b, carrying a sulfonamide and a fluorine substitution, demonstrated supreme selective potential. It registered an IC50 values against COX-2 of 42nM with a selectivity index of >120-fold relative to COX-1.',
    ic50: '42 nM (COX-2)',
    smiles: 'O=C1OC2=CC(F)=C(C)C=C2C(C3=CC=C(S(=O)(=O)N)C=C3)=C1',
    techniques: ['Molecular Docking (AutoDock)', 'Reflux Synthesis & Recrystallization', 'FRET Enzyme Testing', 'Thin-Layer Chromatography (TLC)', 'NMR Spectroscopy Interpretation']
  },
  {
    id: 'proj-2',
    title: 'Bio-Isosteric Lead Redesign of EGFR Tyrosine Kinase Blocks to Overcome the T790M Gatekeeper Oncology Resistance',
    category: 'computational',
    summary: 'Using 100ns Molecular Dynamics trajectories to redesign quinazoline cores, inserting bio-isosteric halogens and trifluoromethyl groups to bypass gatekeeper mutation blocks in non-small cell lung cancer receptors.',
    objective: 'To design a reversible inhibitor that exhibits nanomolar binding threshold against both wild-type EGFR and the drug-resistant T790M mutant kinase, preserving healthy cellular functions.',
    methodology: [
      'High-throughput target model preparation of mutated EGFR Kinase Domain (PDB: 2JIT).',
      'Structural bio-isostere replacements utilizing RDKit fragment library mappings.',
      '100-Nanosecond Molecular Dynamics (MD) trajectories on GROMACS using the CHARMM36 forcefield.',
      'MM/PBSA binding free energy calculation to split electrostatic and hydrophobic affinity contributions.'
    ],
    results: 'Virtual modification patterns revealed that trifluoromethyl isostere replacements on the quinazoline core pushed drug moieties around the bulky Met790 mutational residue, preventing steric clashed positions. MM/PBSA computed ligand binding delta-G reached a high of -38.4 kcal/mol, predicting high persistence.',
    ic50: '18 nM (EGFR T790M)',
    smiles: 'CNC1=CC=C2N=CN=C(NC3=CC(Cl)=C(F)C=C3)C2=C1',
    techniques: ['100ns MD Trajectories (GROMACS)', 'MM/PBSA Free Energy Calculations', 'SwissADME ADMET Profiling', 'RDKit Chem Computation', 'PyMOL Complex View']
  },
  {
    id: 'proj-3',
    title: 'In-Silico Screening and Kinetic Profiling of Plant-Derived Flavonoids against Main Protease (Mpro) of SARS-CoV-2',
    category: 'biology',
    summary: 'Evaluating natural dietary flavonoids for emergency antiviral therapy. Docking scores coupled with in-vitro kinetic setups mapped target active pocket interactions to block replication mechanisms.',
    objective: 'To screen natural product repositories for non-toxic inhibitors of SARS-CoV-2 Main Protease (Mpro) to disrupt viral dimerization.',
    methodology: [
      'Virtual screening of 1,200 structural natural flavonoids against the dimer interface of SARS-CoV-2 Mpro (PDB: 6LU7).',
      'Flexible ligand-pocket hydrogen bonding mapping and pharmacophore extraction.',
      'Micro-plate kinetic profiling evaluating enzyme velocity reduction parameters across multi-compound series.',
      'Cytotoxicity evaluation of lead active flavonoids across human lung cell lines (A549).'
    ],
    results: 'Natural Quercetin and Biochanin-A scored as premium binders. FRET protease velocity assays confirmed real-world enzymatic arrest. Quercetin registered an IC50 rate of 8.2 µM against reconstructed Mpro, with zero observable cytotoxic degradation inside human A549 target cells at assays up to 100 µM.',
    ic50: '8.2 µM (SARS-CoV-2 Mpro)',
    smiles: 'OC1=CC2=C(C(=O)C(O)=C(C3=CC=C(O)C(O)=C3)O2)C(O)=C1',
    techniques: ['Target-Pocket Virtual Screening', 'FRET Protease Kinase Kinetics', 'In-Vitro Cell Line Culturing', 'Microplate Assay Spectrophometry', 'Molecular Docking (AutoDock Vina)']
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'computational' | 'synthesis' | 'biology'>('all');
  const [expandedProj, setExpandedProj] = useState<string | null>('proj-1'); // Default open first project

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

  const toggleProject = (id: string) => {
    setExpandedProj(expandedProj === id ? null : id);
  };

  return (
    <section id="research-portfolio" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-xs font-semibold text-teal-800 uppercase tracking-wider mb-3">
              <FlaskConical className="w-3.5 h-3.5 animate-pulse" />
              Academic Logbook
            </div>
            <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
              Medicinal Chemistry & CADD Projects
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-2xl font-sans">
              Peer-reviewed thesis work and computational investigations exploring the molecular frontiers of pharmaceutical science. Expand cards for technical specifics.
            </p>
          </div>

          {/* Categorized Filter Selectors */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end bg-gray-50 border border-gray-100 p-1 rounded-xl">
            {(['all', 'computational', 'synthesis', 'biology'] as const).map((cat) => (
              <button
                key={cat}
                id={`project-filter-${cat}`}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg uppercase tracking-wider transition ${
                  filter === cat
                    ? 'bg-white text-teal-900 font-bold shadow-xs border border-gray-200/40'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat === 'all' ? 'All Areas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List/Accordion */}
        <div className="space-y-4">
          {filteredProjects.map((proj) => {
            const isExpanded = expandedProj === proj.id;
            return (
              <div 
                key={proj.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'border-teal-500 shadow-md ring-1 ring-teal-500/10' 
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-xs shadow-3xs'
                }`}
              >
                {/* Accordion Title Trigger Header */}
                <button
                  id={`project-expand-trigger-${proj.id}`}
                  onClick={() => toggleProject(proj.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition hover:bg-gray-50/20"
                >
                  <div className="flex items-start gap-4">
                    {/* Category specific dynamic icon */}
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      proj.category === 'computational' 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                        : proj.category === 'synthesis' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {proj.category === 'computational' ? (
                        <Code className="w-5 h-5" />
                      ) : proj.category === 'synthesis' ? (
                        <FlaskConical className="w-5 h-5" />
                      ) : (
                        <Microscope className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-bold uppercase font-mono tracking-widest px-2 py-0.5 rounded ${
                          proj.category === 'computational' 
                            ? 'bg-indigo-50 text-indigo-800' 
                            : proj.category === 'synthesis' 
                            ? 'bg-rose-50 text-rose-800' 
                            : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {proj.category} research
                        </span>
                        {proj.ic50 && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-semibold px-2 py-0.5 rounded">
                            IC₅₀: {proj.ic50}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-sans font-medium text-gray-900 mt-2 hover:text-teal-600 transition duration-150">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 max-w-4xl font-sans">
                        {proj.summary}
                      </p>
                    </div>
                  </div>

                  {/* Icon Indicator for expand */}
                  <div className={`text-gray-400 p-1.5 rounded-full hover:bg-gray-100 border border-transparent transition-transform duration-200 shrink-0 ml-4 ${
                    isExpanded ? 'rotate-180 text-teal-600 border-teal-100' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Card Body Details */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 border-t border-gray-100 bg-slate-50/20 font-sans">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                      
                      {/* Left Block: Molecular Data & Objectives */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        {/* Objective */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Research Objective</h4>
                          <p className="text-xs text-gray-600 leading-relaxed font-sans">{proj.objective}</p>
                        </div>

                        {/* Workflow Pipeline */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Computational & Wet-Lab Workflow</h4>
                          <ol className="space-y-2 text-xs text-gray-600">
                            {proj.methodology.map((m, i) => (
                              <li key={i} className="flex gap-2.5 items-start">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-100 rounded font-bold text-gray-500 block shrink-0">{i+1}</span>
                                <span className="leading-normal">{m}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Biological Validation and Synthesis results */}
                        <div className="p-4 bg-teal-50/40 rounded-xl border border-teal-100/30">
                          <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <Microscope className="w-3.5 h-3.5 text-teal-600" />
                            Biochemical Validation Analysis
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed italic">
                            "{proj.results}"
                          </p>
                        </div>

                      </div>

                      {/* Right Block: Structures & Key Metrics */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Chemical Structure SMILES block */}
                        {proj.smiles && (
                          <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-3xs">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                              <span>Compound SMILES Core</span>
                              <span className="text-[9px] font-mono select-all bg-gray-50 px-1 py-0.5 rounded text-gray-500">Copy</span>
                            </h4>
                            <code className="text-[11px] font-mono text-gray-600 break-all select-all block bg-slate-50 p-2.5 rounded border border-slate-100">
                              {proj.smiles}
                            </code>
                            
                            {/* Tiny procedural chemical blueprint layout using minimal shapes to symbolize drug structures */}
                            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                              <span className="text-[9.5px] font-mono text-gray-400 uppercase block mb-2">Molecular Topography Model</span>
                              <div className="w-full aspect-[2/1] bg-slate-50 rounded flex items-center justify-center p-2">
                                <svg viewBox="0 0 100 50" className="w-full max-h-[40px] text-gray-700 opacity-80 shrink-0">
                                  {proj.id === 'proj-1' ? (
                                    // Coumarin representation sketch
                                    <path d="M 10,25 L 25,15 L 40,25 L 40,40 L 25,48 L 10,40 Z M 40,25 L 55,15 L 70,25 L 70,40 L 55,48 L 40,40 M 70,25 L 85,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                  ) : proj.id === 'proj-2' ? (
                                    // Quinazoline representation sketch
                                    <path d="M 10,25 L 25,15 L 40,25 L 40,40 L 25,48 L 10,40 M 40,25 L 55,15 N 55,15 L 70,25 M 70,25 L 85,15 M 70,40 L 55,48" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                  ) : (
                                    // Flavonoid representation sketch
                                    <path d="M 15,25 L 30,15 L 45,25 L 45,40 L 30,48 L 15,40 Z M 45,25 L 60,15 L 75,25 O 45,40 L 60,48 L 75,40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                  )}
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Specialized Techniques List */}
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Database className="w-3.5 h-3.5 text-gray-500" />
                            Research Toolkit Applied
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {proj.techniques.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10.5px] font-medium border border-gray-150/40">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
