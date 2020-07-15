import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  required: (path?: string): RuleConfig => ({
    type: 'REQUIRED',
    path,
  }),
};
