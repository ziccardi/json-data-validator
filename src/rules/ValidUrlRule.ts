import validator from 'validator';
/**
 * {
 *   type: 'VALID_URL',
 * }
 */
import {GenericValidator} from './GenericValidator';
import {RuleConfig} from '../config/RuleConfig';

export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) =>
      !!value &&
      validator.isURL(value, {
        require_tld: !!config.require_tld,
        require_host: !!config.require_host,
        require_protocol:
          config.require_protocol === 'true' ||
          config.require_protocol === undefined,
      }),
    'Value %s is not a valid URL string'
  );

export const NAME = 'VALID_URL';
