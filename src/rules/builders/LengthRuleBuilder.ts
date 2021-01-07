import {RuleConfig} from '../../config/RuleConfig';

export interface LengthRuleConfig extends RuleConfig {
  type: 'LENGTH';
  length: number;
}

export const builder = {
  withLength: (length: number, errorMessage?: string) => {
    const cfg: LengthRuleConfig = {
      type: 'LENGTH',
      length,
      errorMessage,
    };
    return {
      build: () => cfg,
    };
  },
};
