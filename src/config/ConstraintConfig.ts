export interface ConstraintConfig {
  type: string;
  subRules?: ConstraintConfig[];
  [key: string]: string | number | ConstraintConfig[] | undefined;
}
