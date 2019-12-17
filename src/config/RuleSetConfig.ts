import { ConstraintConfig } from './ConstraintConfig';
import { RuleConfig } from './RuleConfig';

/**
 * Interface definition for rule sets.
 */
export interface RuleSetConfig {
  /**
   * A Ruleset can have a list of constraints. If any of the constraint is not validated, the ruleset is not executed.
   */
  constraints?: ConstraintConfig[];

  /**
   * A map containing a list of rules for each field to be validated.
   */
  fields: {
    [fieldpath: string]: RuleConfig[];
  };
}
