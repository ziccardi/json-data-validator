import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withPattern: (pattern: string, errorMessage?: string): RuleConfig => ({
    type: 'matches',
    pattern,
    errorMessage,
  }),
};
