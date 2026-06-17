/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Receptor {
  id: string;
  name: string;
  fullName: string;
  description: string;
  targetIndication: string;
  pdbId: string;
  bindingSiteResidues: Array<{ name: string; type: 'hydrophobic' | 'hydrogen-bond-donor' | 'hydrogen-bond-acceptor' | 'electrostatic' }>;
  baseAffinity: number; // kcal/mol
}

export interface FunctionalGroup {
  id: string;
  name: string;
  formula: string;
  mwDelta: number;
  logPDelta: number;
  hbdDelta: number;
  hbaDelta: number;
  targetAffinityDelta: Record<string, number>; // Mapping receptorId -> affinity delta (kcal/mol)
  description: string;
  smilesFragment: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'computational' | 'synthesis' | 'biology';
  summary: string;
  objective: string;
  methodology: string[];
  results: string;
  ic50?: string;
  smiles?: string;
  chemicalStructureSvg?: string; // We'll draw elegant interactive canvas or SVG
  techniques: string[];
  publicationsLink?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100 for visual indicator
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}
