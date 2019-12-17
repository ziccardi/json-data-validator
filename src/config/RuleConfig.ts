/**
 * Interface for rule configuration.
 */
export interface RuleConfig {
  /**
   * Each rule must have a type.
   */
  type: string;

  /**
   * The custom error message to be returned if the rule fails.
   */
  errorMessage?: string;

  /**
   * Each rule key must be a string.
   * The value can be a string, a number or an array of RuleConfig in case of composite rules.
   */
  [key: string]: string | number | RuleConfig[] | string[] | undefined;
}
