import { EvaluationResult, Rule } from '../Rule';
import { get } from 'lodash';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';

/**
 * {
 *   type: 'maxlength',
 *   maxlength: 10
 * }
 */
export class ExactValueRule implements Rule {
  private readonly config: RuleConfig;
  private readonly exactValue: string;

  constructor(config: RuleConfig) {
    this.config = config;
    this.exactValue = this.config.value as string;
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;
    if (value !== this.exactValue) {
      return {
        valid: false,
        field: path,
        message:
          this.config.errorMessage ||
          `Value of '${path}' must be '${this.exactValue}' (found: '${value}')`,
      };
    }
    return {
      valid: true,
    };
  }
}

export const NAME = 'EXACT_VALUE';
