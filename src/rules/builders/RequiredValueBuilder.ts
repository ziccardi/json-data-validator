import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  required: (path?: string, errorMessage?: string): RuleConfig => ({
    type: 'REQUIRED',
    path,
    errorMessage,
  }),
};
