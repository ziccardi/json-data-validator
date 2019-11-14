import { EvaluationResult, Rule } from '../Rule';
import { get } from 'lodash';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';
const isValid = require('is-valid-path');
/**
 * {
 *   type: 'VALID_URL_PATH',
 * }
 */
export class ValidUrlPathRule implements Rule {
  private readonly config: RuleConfig;

  constructor(config: RuleConfig) {
    this.config = config;
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;
    if (!isValid(value)) {
      return {
        valid: false,
        field: path,
        message:
          this.config.errorMessage || `Value '${path}' is not a valid URL path`,
      };
    }

    return { valid: true };
  }
}

export const NAME = 'VALID_URL_PATH';
