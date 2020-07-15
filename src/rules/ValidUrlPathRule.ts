import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';
import isValid = require('is-valid-path');
/**
 * {
 *   type: 'VALID_URL_PATH',
 * }
 */

export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => isValid(value),
    "Value '%s' is not a valid URL path"
  );

export const NAME = 'VALID_URL_PATH';
