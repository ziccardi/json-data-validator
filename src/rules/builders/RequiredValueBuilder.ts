import {RuleConfig} from '../../config/RuleConfig';

export interface RequiredRuleBuilder {
  withPath: (path: string) => RequiredRuleBuilder;
  withErrorMessage: (errorMessage: string) => RequiredRuleBuilder;
  build: () => RuleConfig;
}

export interface RequiredRuleConfig extends RuleConfig {
  type: 'REQUIRED';
  path?: string;
}

class RequiredRuleBuilderImpl implements RequiredRuleBuilder {
  private readonly cfg: RequiredRuleConfig = {
    type: 'REQUIRED',
  };

  public readonly withPath = (path: string) => {
    this.cfg.path = path;
    return this;
  };
  public readonly withErrorMessage = (errorMessage: string) => {
    this.cfg.errorMessage = errorMessage;
    return this;
  };
  public readonly build = () => this.cfg;
}

export const builder = {
  required: () => {
    return new RequiredRuleBuilderImpl() as RequiredRuleBuilder;
  },
};
