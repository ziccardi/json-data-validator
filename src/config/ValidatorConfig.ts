import { RuleSetConfig } from './RuleSetConfig';

/**
 * Interface for the validator.
 */
export interface ValidatorConfig {
  /**
   * A validator config is composed by a list of Rule Sets.
   */
  ruleSets: RuleSetConfig[];
}
