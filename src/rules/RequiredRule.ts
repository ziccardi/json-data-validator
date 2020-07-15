import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';

/**
 * {
 *   type: 'required',
 * }
 */
export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => {
      return value !== null && value !== undefined && value !== '';
    },
    "Value '%s' is required",
    true
  );

export const NAME = 'REQUIRED';
