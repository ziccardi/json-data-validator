import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';

export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => !value || value.length === config.length!,
    `'%s' must have a length of ${config.length}`
  );

export const NAME = 'LENGTH';
