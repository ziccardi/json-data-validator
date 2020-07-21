import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withValue: (value: string | number, errorMessage?: string): RuleConfig => ({
    type: 'EXACT_VALUE',
    value,
    errorMessage,
  }),
  withPathAndValue: (
    path: string,
    value: string | number,
    errorMessage?: string
  ): RuleConfig => ({
    type: 'EXACT_VALUE',
    path,
    value,
    errorMessage,
  }),
};
