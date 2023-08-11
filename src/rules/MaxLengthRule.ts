import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';

export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => !value || value.length <= (config.maxlength! as number),
    "Maximum length exceeded for '%s'"
  );

export const NAME = 'MAXLENGTH';
