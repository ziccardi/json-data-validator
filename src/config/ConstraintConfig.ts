/**
 * Interface for constraint configuration.
 */
export interface ConstraintConfig {
  /**
   * The constraint type
   */
  type: string;

  /**
   * Composite constraints support sub constraints
   */
  subRules?: ConstraintConfig[];

  /**
   * Content of the configuration always have a `string` key. The value can either be string, number of a list of
   * ConstraintConfig (in case of subrules)
   */
  [key: string]: string | number | ConstraintConfig[] | undefined;
}
