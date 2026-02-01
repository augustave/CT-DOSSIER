import { ReactNode } from 'react';

export enum ModuleType {
  MANIFEST = 'MANIFEST',
  THESIS = 'THESIS',
  RECRUITS = 'RECRUITS',
  MODEL = 'MODEL',
  COMPANIES = 'COMPANIES',
  SIMULATOR = 'SIMULATOR',
  ARTIFACTS = 'ARTIFACTS',
  INQUIRY = 'INQUIRY'
}

/** Evidence link item for module sidebar. Reserved for future use. */
export interface EvidenceItem {
  title: string;
  description: string;
  link: string;
}

/** Subsection for implications and stress tests. Reserved for future use. */
export interface SubSection {
  title: string;
  content: string[];
}

export interface ModuleData {
  id: ModuleType;
  index: string; // "01", "02" etc.
  title: string;
  promptText: string; // Renamed from prompt for clarity
  responseText: string; // Plain text for logic/inquiry
  responseDisplay: ReactNode; // Rich UI content
  themeColor: 'blue' | 'cream' | 'black' | 'clay';
  implications?: SubSection;
  evidence?: EvidenceItem[];
  stressTest?: SubSection;
  customComponent?: ReactNode; // For specialized layouts like the Recruits cards
}

export interface InquiryState {
  assess: string[];
  challenge: string[];
  note: string;
}

export type Optimization = 'SPEED' | 'CORRECTNESS' | 'SCALE';
export type Environment = 'CHAOS' | 'ENTERPRISE' | 'REGULATED';

export interface SimulatorResult {
  risk: string;
  mitigation: string;
  description: string;
}