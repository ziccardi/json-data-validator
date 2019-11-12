import { ConstraintConfig } from './ConstraintConfig';
import { RuleConfig } from './RuleConfig';

export interface RuleSetConfig {
  constraints?: ConstraintConfig[];
  fields: {
    [fieldpath: string]: RuleConfig[];
  };
}
