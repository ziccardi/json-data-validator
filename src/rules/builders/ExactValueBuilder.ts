import {RuleConfig} from '../../config/RuleConfig';

interface ExactValueRuleConfig extends RuleConfig {
  type: 'EXACT_VALUE';
  value: string | number;
}

export class Builder {
  private readonly cfg: ExactValueRuleConfig;
  constructor(cfg: ExactValueRuleConfig) {
    this.cfg = cfg;
  }

  public build(): ExactValueRuleConfig {
    return this.cfg;
  }
}

export const builder = {
  withValue: (value: string | number, errorMessage?: string): Builder =>
    new Builder({
      type: 'EXACT_VALUE',
      value,
      errorMessage,
    }),
  withPathAndValue: (
    path: string,
    value: string | number,
    errorMessage?: string
  ): Builder =>
    new Builder({
      type: 'EXACT_VALUE',
      path,
      value,
      errorMessage,
    }),
};
