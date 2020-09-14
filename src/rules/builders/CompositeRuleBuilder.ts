import {RuleConfig} from '../../config/RuleConfig';

export interface CompositeRuleBuilderInterfaceStart {
  withSubRule: (rule: RuleConfig) => CompositeRuleBuilderInterfaceEnd;
}

export interface CompositeRuleBuilderInterfaceEnd {
  withSubRule: (rule: RuleConfig) => CompositeRuleBuilderInterfaceEnd;
  build: (errorMessage?: string) => RuleConfig;
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

    const build = (errorMessage?: string): RuleConfig => ({
      type: 'COMPOSITE',
      algorithm: 'any',
      errorMessage,
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

    const build = (errorMessage?: string): RuleConfig => ({
      type: 'COMPOSITE',
      algorithm: 'all',
      errorMessage,
      subRules,
    });

    return {withSubRule};
  },
};
