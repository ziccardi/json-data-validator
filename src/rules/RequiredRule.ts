import { EvaluationResult, Rule } from '../Rule';
import { get } from 'lodash';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';

/**
 * {
 *   type: 'required',
 * }
 */
export class RequiredRule implements Rule {
  private readonly config: RuleConfig;

  constructor(config: RuleConfig) {
    this.config = config;
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;
    if (value === null || value === undefined || value === '') {
      return {
        valid: false,
        field: path,
        message: this.config.errorMessage || `Value '${path}' is required`,
      };
    }

    return { valid: true };
  }
}

export const NAME = 'REQUIRED';
