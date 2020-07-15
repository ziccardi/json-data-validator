import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withValue: (value: string | number): RuleConfig => ({
    type: 'EXACT_VALUE',
    value,
  }),
  withPathAndValue: (path: string, value: string | number): RuleConfig => ({
    type: 'EXACT_VALUE',
    path,
    value,
  }),
};
