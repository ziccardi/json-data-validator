import { RuleEvaluationResult, RuleInterface } from '../RuleInterface';
import { get } from 'lodash';
import { Configuration } from '../ConfigurationInterface';
import { DataInterface } from '../DataInterface';

/**
 * {
 *   type: 'maxlength',
 *   maxlength: 10
 * }
 */
export class ExactValueRule implements RuleInterface {
  private readonly config: Configuration;
  private readonly exactValue: string;

  constructor(config: Configuration) {
    this.config = config;
    this.exactValue = this.config.value as string;
  }

  evaluate(path: string, data: DataInterface): RuleEvaluationResult {
    const value = get(data, path) as string;
    if (value !== this.exactValue) {
      return {
        valid: false,
        message: `Value of '${path}' must be '${this.exactValue}' (found: '${value}')`,
      };
    }
    return {
      valid: true,
    };
  }
}

export const NAME = 'EXACT_VALUE';
