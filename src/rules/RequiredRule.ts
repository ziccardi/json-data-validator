import { RuleEvaluationResult, RuleInterface } from '../RuleInterface';
import { get } from 'lodash';
import { DataInterface } from '../DataInterface';

/**
 * {
 *   type: 'required',
 * }
 */
export class RequiredRule implements RuleInterface {
  evaluate(path: string, data: DataInterface): RuleEvaluationResult {
    const value = get(data, path) as string;
    if (value === null || value === undefined || value === '') {
      return {
        valid: false,
        message: `Value '${path}' is required`,
      };
    }

    return { valid: true };
  }
}

export const NAME = 'REQUIRED';
