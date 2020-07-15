import {Rule} from '../Rule';
import {RuleConfig} from '../config/RuleConfig';
import {RULE_DICTIONARY} from './index';
import {PACK} from './SimpleRulePack';

interface RuleDictionary {
  [key: string]: (conf: RuleConfig) => Rule;
}

export class RuleFactory {
  static readonly RULES: RuleDictionary = {
    ...RULE_DICTIONARY,
    ...PACK,
  };

  static create(config: RuleConfig): Rule {
    const factory = RuleFactory.RULES[config.type];
    if (factory) {
      return factory(config);
    }

    throw {
      message: `Can't find any rule of type ${config.type}`,
    };
  }

  static register(ruletype: string, factory: (conf: RuleConfig) => Rule) {
    RuleFactory.RULES[ruletype] = factory;
  }
}
