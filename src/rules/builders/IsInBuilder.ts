import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withValues: (...values: string[]): RuleConfig => ({
    type: 'isIn',
    values: values.join(),
  }),
};
