import {RuleConfig} from '../../config/RuleConfig';

export interface IsInBuilderInterface {
  withValues(...values: string[]): IsInBuilderFinalInterface;
  withValue(value: string): IsInBuilderFinalInterface;
}

export interface IsInBuilderFinalInterface extends IsInBuilderInterface {
  build(errorMessage?: string): RuleConfig;
}

interface IsInBuilderConfig extends RuleConfig {
  type: 'isIn';
  values: string[];
}

class IsInBuilder implements IsInBuilderFinalInterface {
  private readonly cfg: IsInBuilderConfig = {
    type: 'isIn',
    values: [],
  };

  public readonly withValue = (value: string): IsInBuilderFinalInterface => {
    this.cfg.values.push(value);
    return this;
  };

  public readonly withValues = (
    ...values: string[]
  ): IsInBuilderFinalInterface => {
    this.cfg.values = [...this.cfg.values, ...values];
    return this;
  };

  public build(errorMessage?: string) {
    return {...this.cfg, values: this.cfg.values.join(','), errorMessage};
  }
}

export const builder: IsInBuilderInterface =
  new IsInBuilder() as IsInBuilderInterface;
