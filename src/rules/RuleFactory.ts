import { NAME as REQUIRED_RULE, RequiredRule } from './RequiredRule';
import { MaxLengthRule, NAME as MAXLENGTH_RULE } from './MaxLengthRule';
import { RuleInterface } from '../RuleInterface';
import { Configuration } from '../ConfigurationInterface';

export class RuleFactory {
  static readonly RULES: {
    [key: string]: (conf: Configuration) => RuleInterface;
  } = {
    [REQUIRED_RULE]: () => new RequiredRule(),
    [MAXLENGTH_RULE]: (conf: Configuration) => new MaxLengthRule(conf),
  };

  static create(config: Configuration): RuleInterface {
    const factory = RuleFactory.RULES[config.type];
    if (factory) {
      return factory(config);
    }

    throw {
      message: `Can't find any rule of type ${config.type}`,
    };
  }
}
