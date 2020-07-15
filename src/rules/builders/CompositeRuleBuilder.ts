import {RuleConfig} from '../../config/RuleConfig';

export interface CompositeRuleBuilderInterfaceStart {
  withSubRule: (rule: RuleConfig) => CompositeRuleBuilderInterfaceEnd;
}

export interface CompositeRuleBuilderInterfaceEnd {
  withSubRule: (rule: RuleConfig) => CompositeRuleBuilderInterfaceEnd;
  build: () => RuleConfig;
}

export const builder = {
  any: (): CompositeRuleBuilderInterfaceStart => {
    const subRules: RuleConfig[] = [];

    const withSubRule = (
      rule: RuleConfig
    ): CompositeRuleBuilderInterfaceEnd => {
      subRules.push(rule);
      return {withSubRule, build};
    };

    const build = (): RuleConfig => ({
      type: 'COMPOSITE',
      algorithm: 'any',
      subRules,
    });

    return {withSubRule};
  },
  all: (): CompositeRuleBuilderInterfaceStart => {
    const subRules: RuleConfig[] = [];

    const withSubRule = (
      rule: RuleConfig
    ): CompositeRuleBuilderInterfaceEnd => {
      subRules.push(rule);
      return {withSubRule, build};
    };

    const build = (): RuleConfig => ({
      type: 'COMPOSITE',
      algorithm: 'all',
      subRules,
    });

    return {withSubRule};
  },
};
