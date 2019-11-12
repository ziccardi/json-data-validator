export interface RuleConfig {
  type: string;
  errorMessage?: string;
  [key: string]: string | number | RuleConfig[] | undefined;
}
