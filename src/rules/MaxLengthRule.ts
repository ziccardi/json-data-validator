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
export class MaxLengthRule implements Rule {
  private readonly config: RuleConfig;
  private readonly maxlength: number;

  constructor(config: RuleConfig) {
    this.config = config;
    this.maxlength = this.config.maxlength as number;
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;
    if (!value || value.length <= this.config.maxlength!) {
      return { valid: true };
    }
    return {
      valid: false,
      field: path,
      message:
        this.config.errorMessage || `Maximum length exceeded for '${path}'`,
    };
  }
}

export const NAME = 'MAXLENGTH';
