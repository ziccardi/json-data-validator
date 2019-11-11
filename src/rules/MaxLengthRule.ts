import { RuleEvaluationResult, RuleInterface } from '../RuleInterface';
import { get } from 'lodash-es';
import { Configuration } from '../ConfigurationInterface';
import { DataInterface } from '../DataInterface';

/**
 * {
 *   type: 'maxlength',
 *   maxlength: 10
 * }
 */
export class MaxLengthRule implements RuleInterface {
  private readonly config: Configuration;
  private readonly maxlength: number;

  constructor(config: Configuration) {
    this.config = config;
    this.maxlength = this.config.maxlength as number;
  }

  evaluate(path: string, data: DataInterface): RuleEvaluationResult {
    const value = get(data, path) as string;
    if (!value || value.length <= this.config.maxlength) {
      return { valid: true };
    }
    return {
      valid: false,
      message: `Maximum length exceeded for '${path}'`,
    };
  }
}

export const NAME = 'MAXLENGTH';
