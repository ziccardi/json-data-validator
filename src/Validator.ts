import { RuleSetFactory } from './RuleSetFactory';
import { RuleSet } from './RuleSet';
import { Data } from './Data';
import { RuleSetConfig } from './config/RuleSetConfig';
import { EvaluationResult } from './Rule';

export interface ValidatorConfiguration {
  ruleSets: RuleSetConfig[];
}

export class Validator {
  private readonly ruleSets: RuleSet[];

  constructor(config: ValidatorConfiguration) {
    this.ruleSets = config.ruleSets.map((ruleSetConfig: RuleSetConfig) => {
      return RuleSetFactory.create(ruleSetConfig);
    });
  }

  validate(data: Data): EvaluationResult {
    for (let i = 0; i < this.ruleSets.length; i++) {
      const ruleSet = this.ruleSets[i];
      if (ruleSet.shouldEvaluate(data)) {
        const res = this.ruleSets[i].evaluate('', data);
        if (!res.valid) {
          return res;
        }
      }
    }
    return { valid: true };
  }
}
