import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';

/**
 * Checks that the value retrieved at the specific path is exactly the specified value.
 *
 * Configuration:
 * * type: 'EXACT-VALUE'
 * * path: 'path.to.the.value.to.evaluate'
 * * value: 'value.to.be.enforced'
 */
export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => value === config.value!,
    `Value of '%s' must be '${config.value}'`
  );

export const NAME = 'EXACT_VALUE';
