import { NAME as REQUIRED_RULE, RequiredRule } from './RequiredRule';
import { MaxLengthRule, NAME as MAXLENGTH_RULE } from './MaxLengthRule';
import { NAME as COMPOSITE_RULE, CompositeRule } from './CompositeRule';
import { NAME as VALID_URL_PATH, ValidUrlPathRule } from './ValidUrlPathRule';
import { GenericValidator } from './GenericValidator';
import { Rule } from '../Rule';
import { ExactValueRule, NAME as EXACT_VALUE } from './ExactValueRule';
import { RuleConfig } from '../config/RuleConfig';

const validator = require('validator');

export class RuleFactory {
  static readonly RULES: {
    [key: string]: (conf: RuleConfig) => Rule;
  } = {
    [REQUIRED_RULE]: (conf: RuleConfig) => new RequiredRule(conf),
    [MAXLENGTH_RULE]: (conf: RuleConfig) => new MaxLengthRule(conf),
    [EXACT_VALUE]: (conf: RuleConfig) => new ExactValueRule(conf),
    [COMPOSITE_RULE]: (conf: RuleConfig) => new CompositeRule(conf),
    [VALID_URL_PATH]: (conf: RuleConfig) => new ValidUrlPathRule(conf),
    VALID_URL: (conf: RuleConfig) =>
      new GenericValidator(
        conf,
        (value: string) =>
          value && validator.isURL(value, {
            require_tld: !!conf.require_tld,
            require_host: !!conf.require_host,
            require_protocol:
              conf.require_protocol === 'true' ||
              conf.require_protocol === undefined,
          }),
        'Value %s is not a valid URL string'
      ),
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
