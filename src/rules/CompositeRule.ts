import { EvaluationResult, Rule } from '../Rule';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';
import { RuleFactory } from './RuleFactory';

/**
 * A rule whose result depends on the result of a list of sub-rules.
 * A sub-rule could be another composite rule, to allow the configuration of complex validation trees.
 * Configuration:
 * type: 'COMPOSITE'
 * algorithm: 'all' | 'any'. If `all`, the all the sub-rules must return `true`, if `any` at least one of the sub-rules ust return `true`
 * path: 'path.to.the.field.to.evaluate'
 * subrules: [] The list of sub-rules.
 */
export class CompositeRule implements Rule {
  static NAME = 'COMPOSITE';

  private readonly config: RuleConfig;

  constructor(config: RuleConfig) {
    this.config = config;
  }

  /**
   * Evaluate the composite rule.
   * @param path
   * @param data
   */
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
