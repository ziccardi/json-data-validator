import { RulesetConfig, RuleSetFactory } from './RuleSetFactory';
import { RuleSet } from './RuleSet';
import { DataInterface } from './DataInterface';

export interface ValidatorConfiguration {
  [path: string]: RulesetConfig[];
}

export class Validator {
  private readonly rulesets: {
    [fieldName: string]: RuleSet[];
  } = {};

  constructor(config: ValidatorConfiguration) {
    Object.keys(config).forEach((key: string) => {
      this.rulesets[key] = config[key].map((rulesetConfig: RulesetConfig) =>
        RuleSetFactory.create(rulesetConfig)
      );
    });
  }

  private validateField(data: DataInterface, path: string) {
    const rulesets = this.rulesets[path];
    for (let i = 0; i < rulesets.length; i++) {
      if (rulesets[i].shouldEvaluate(data)) {
        const ruleSetRes = rulesets[i].evaluate(path, data);
        if (!ruleSetRes.valid) {
          return ruleSetRes;
        }
      }
    }

    return { valid: true };
  }

  validate(data: DataInterface) {
    const keys = Object.keys(this.rulesets);

    for (let i = 0; i < keys.length; i++) {
      const res = this.validateField(data, keys[i]);
      if (!res.valid) {
        return res;
      }
    }
    return { valid: true };
  }
}
