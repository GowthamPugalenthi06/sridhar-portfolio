/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Calendar, Linkedin, Share2, Compass, CheckCircle2, Copy, FileText } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Proposal State
  const [targetInd, setTargetInd] = useState<'oncology' | 'viral' | 'neuro'>('oncology');
  const [methodFocus, setMethodFocus] = useState<'md' | 'synthesis' | 'kinetics'>('md');

  // Generate dynamic proposals
  const compiledProposal = React.useMemo(() => {
    const targetMap = {
      oncology: {
        disease: 'Oncological Tyrosine Kinases (WT & Mut EGFR models)',
        intro: 'I wanted to reach out regarding your computational models tackling tyrosine kinase drug-resistance mutations in oncology.'
      },
      viral: {
        disease: 'Antiviral Coronaviral Proteases (SARS-CoV Mpro clefts)',
        intro: 'I am highly interested in your structure-based computational library screen models identifying non-toxic inhibitors of SARS-CoV-2 dimerization channels.'
      },
      neuro: {
        disease: 'Neurodegenerative Acetylcholinesterase receptor sites',
        intro: 'I am writing to consult your in-silico alignment studies assessing Alzheimer\'s acetylcholinesterase pocket fits.'
      }
    };

    const methodMap = {
      md: {
        spec: 'Molecular Dynamics (MD) trajectories and thermodynamic calculations (MM/PBSA)',
        clause: 'Integrating detailed nanosecond MD run files on GROMACS would provide critical insights into the real-world atomic relaxation trajectories of these chemical candidates, bridging our computational assumptions.'
      },
      synthesis: {
        spec: 'Reflux condensation synthesis pathways and structural evaluations (1H NMR / HPLC)',
        clause: 'Translating these high-scoring virtual candidates into physical entities via organic synthesis will allow direct spectroscopic conformation analysis, validating our bio-isosteric logic.'
      },
      kinetics: {
        spec: 'In-vitro serial dilution titration and biological enzyme pocket kinetics (IC50)',
        clause: 'Determining exact FRET enzyme velocities across dilutions will establish true-world dose-response slopes and binding kinetics, validating predicted Gibbs free energies.'
      }
    };

    const t = targetMap[targetInd];
    const m = methodMap[methodFocus];

    return `Dear Gowtham,

I reviewed your Pharmaceutical Chemistry (M.Pharm) portfolio showcasing your computational and wet-lab methodologies. Specifically, ${t.intro}

I am exploring a potential research collaboration or project involving:
- Disease Target System: ${t.disease}
- Proposed Technical Pathway: ${m.spec}

${m.clause}

Let me know if you would be open to a brief brief academic call to explore aligning coordinate maps, synthesizability profiles, or assay timelines.

Sincerely,
[Your Name / Academic Institution]
[Contact Information]`;
  }, [targetInd, methodFocus]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(compiledProposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <section id="contact-collaboration" className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Traditional contact & proposal selections */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-semibold text-teal-800 uppercase tracking-widest mb-3">
                <Compass className="w-3.5 h-3.5" />
                Let's Innovate Together
              </div>
              <h2 className="text-3xl font-sans font-medium tracking-tight text-gray-900 sm:text-4xl">
                Initiate a Scientific Collaboration
              </h2>
              <p className="mt-3 text-base text-gray-600 leading-relaxed font-sans">
                Whether you are seeking custom molecular docking screens, bio-isosteric lead modifications, chemical thesis advice, or biological assay evaluations, let's connect!
              </p>

              {/* Bio & Contact lists */}
              <div className="mt-8 space-y-4 font-sans text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-100/50 border border-teal-200/40 rounded-lg flex items-center justify-center text-teal-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block uppercase">Research Mailbox</span>
                    <a href="mailto:gowthamp990@gmail.com" className="text-slate-800 font-semibold hover:text-teal-600 border-b border-dashed border-gray-300">
                      gowthamp990@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-100/50 border border-teal-200/40 rounded-lg flex items-center justify-center text-teal-800">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block uppercase">Professional Network</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-800 font-semibold hover:text-teal-600 border-b border-dashed border-gray-300">
                      linkedin.com/in/gowtham-pharmacy
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-100/50 border border-teal-200/40 rounded-lg flex items-center justify-center text-teal-800">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block uppercase">Location Base</span>
                    <span className="text-slate-700 font-medium">India (Active Worldwide)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Direct Form */}
            <form onSubmit={handleFormSubmit} className="mt-10 p-6 bg-white border border-gray-150/40 rounded-2xl shadow-3xs font-sans text-xs">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Direct Message</h3>
              
              <div className="grid grid-cols-2 gap-3.5 mb-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase block mb-1">Full Name</label>
                  <input required type="text" placeholder="Dr. Alexis Pierce" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-500 uppercase block mb-1">Your Organization</label>
                  <input required type="text" placeholder="University Bio-Lab" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[10px] font-semibold text-gray-500 uppercase block mb-1">Inquiry Description</label>
                <textarea required rows={3} placeholder="Describe potential drug targets or assays you want to evaluate computationally..." className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition resize-none" />
              </div>

              <button
                id="contact-form-submit-btn"
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 font-bold tracking-wide uppercase text-white py-2.5 rounded-lg transition"
              >
                {formSubmitted ? 'Message Transmitted Successfully!' : 'Send Direct Message'}
              </button>
            </form>

          </div>

          {/* Right Column: Custom Academic Proposal Compiler */}
          <div className="lg:col-span-7 flex flex-col p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-4 h-4 text-teal-600" />
                  Interactive Research Query Builder
                </h3>
                <span className="text-[10px] px-2 py-0.5 bg-teal-50 border border-teal-100 font-mono text-teal-700 rounded font-semibold uppercase">Auto-compiler</span>
              </div>

              {/* Selection Pills */}
              <div className="space-y-4 mb-6 font-sans">
                {/* Selector 1: Disease Core Target */}
                <div>
                  <label className="text-[10.5px] font-bold text-gray-700 block mb-2">1. Select Disease Target Framework:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['oncology', 'viral', 'neuro'] as const).map((type) => (
                      <button
                        key={type}
                        id={`proposal-target-btn-${type}`}
                        onClick={() => setTargetInd(type)}
                        className={`py-2 px-2.5 border rounded-lg text-center transition ${
                          targetInd === type 
                            ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold' 
                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {type === 'oncology' ? 'Oncological EGFR' : type === 'viral' ? 'Antiviral Mpro' : 'Neurological AChE'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector 2: Technical Focus */}
                <div>
                  <label className="text-[10.5px] font-bold text-gray-700 block mb-2">2. Alignment Chemistry Core Focus:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['md', 'synthesis', 'kinetics'] as const).map((focus) => (
                      <button
                        key={focus}
                        id={`proposal-focus-btn-${focus}`}
                        onClick={() => setMethodFocus(focus)}
                        className={`py-2 px-2.5 border rounded-lg text-center transition ${
                          methodFocus === focus 
                            ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-semibold' 
                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {focus === 'md' ? 'Molecular Dynamics' : focus === 'synthesis' ? 'Heterocyclic Synthesis' : 'In-Vitro Kinetics'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Letter render block */}
              <div className="relative">
                <textarea
                  id="proposal-output-textarea"
                  readOnly
                  value={compiledProposal}
                  rows={13}
                  className="w-full bg-slate-50 font-mono text-[10.5px] leading-relaxed text-slate-800 p-4 border border-slate-100 rounded-lg focus:outline-none resize-none select-all"
                />
                
                {/* Action floating copier button */}
                <button
                  id="proposal-copy-btn"
                  onClick={copyToClipboard}
                  className="absolute bottom-3 right-3 bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-2 flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 transition shadow-3xs"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      Copy Template
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[11px] text-gray-400 font-sans">
              <Share2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Feel free to copy this personalized pitch and send it directly to Gowtham's research mailbox above.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
