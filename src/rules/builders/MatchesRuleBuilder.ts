import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withPattern: (pattern: string): RuleConfig => ({type: 'matches', pattern}),
};
