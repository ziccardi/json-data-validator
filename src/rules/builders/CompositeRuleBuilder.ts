import { RuleConfig } from '../../config/RuleConfig';

export const builder = {
  any: () => {
    const subRules: RuleConfig[] = [];

    const withSubRule = (rule: RuleConfig) => {
      subRules.push(rule);
      return { withSubRule, build };
    };

    const build = () => ({
      type: 'COMPOSITE',
      algorithm: 'any',
      subRules,
    });

    return { withSubRule };
  },
  all: () => {
    const subRules: RuleConfig[] = [];

    const withSubRule = (rule: RuleConfig) => {
      subRules.push(rule);
      return { withSubRule, build };
    };

    const build = () => ({
      type: 'COMPOSITE',
      algorithm: 'all',
      subRules,
    });

    return { withSubRule };
  },
};
