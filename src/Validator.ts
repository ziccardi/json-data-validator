import {RuleSetFactory} from './RuleSetFactory';
import {RuleSet} from './RuleSet';
import {Data} from './Data';
import {RuleSetConfig} from './config/RuleSetConfig';
import {EvaluationResult, MultiEvaluationResult} from './Rule';
import {ValidatorConfig} from './config/ValidatorConfig';

export class Validator {
  private readonly ruleSets: RuleSet[];

  constructor(config: ValidatorConfig) {
    this.ruleSets = config.ruleSets.map((ruleSetConfig: RuleSetConfig) => {
      return RuleSetFactory.create(ruleSetConfig);
    });
  }

  validate(
    data: Data,
    multi = false
  ): EvaluationResult | MultiEvaluationResult {
    const result: MultiEvaluationResult = {
      valid: true,
      details: [],
      isValid: (path: string) => {
        const evRes = result.details.find(res => res.field === path);
        return !evRes || evRes.valid;
      },
      getEvaluationResult: (path: string) =>
        result.details.find(res => res.field === path),
    };

    for (let i = 0; i < this.ruleSets.length; i++) {
      const ruleSet = this.ruleSets[i];
      if (ruleSet.shouldEvaluate(data)) {
        const res = this.ruleSets[i].evaluate('', data, multi);
        if (!res.valid) {
          if (multi) {
            result.valid = false;
            result.details = result.details || ([] as EvaluationResult[]);
            result.details = result.details.concat(res.details!);
          } else {
            return res;
          }
        }
      }
    }

    if (!multi) {
      delete result.details;
    }
    return result;
  }
}
