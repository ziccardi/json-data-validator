import { EvaluationResult, Rule } from '../Rule';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';
import { RuleFactory } from './RuleFactory';

/**
 * type: COMPOSITE
 * algorithm: all | any
 * subrules: []
 */
export class CompositeRule implements Rule {
  private readonly config: RuleConfig;

  constructor(config: RuleConfig) {
    this.config = config;
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const validCount = (this.config.subRules! as RuleConfig[]).reduce(
      (total: number, ruleConfig: RuleConfig) => {
        const validationResult = RuleFactory.create(ruleConfig).evaluate(
          path,
          data
        );
        return total + (validationResult.valid ? 1 : 0);
      },
      0
    );

    const result: EvaluationResult = { valid: true };

    if (this.config.algorithm === 'any') {
      result.valid = validCount > 0;
    } else {
      result.valid =
        validCount === (this.config.subRules! as RuleConfig[]).length;
    }
    if (!result.valid) {
      result.field = path;
      result.message = this.config.errorMessage || `${path} is not valid`;
    }
    return result;
  }
}

export const NAME = 'COMPOSITE';
