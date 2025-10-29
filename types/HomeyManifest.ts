import type { FlowCard } from './types';

export interface HomeyManifest {
  flow: {
    triggers: FlowCard[];
    conditions: FlowCard[];
    actions: FlowCard[];
  };
  name: {
    en: string;
    [key: string]: string;
  };
  version: string;
}
