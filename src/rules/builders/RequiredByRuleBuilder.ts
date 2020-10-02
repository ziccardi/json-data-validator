import {RuleConfig} from '../../config/RuleConfig';
import * as RequiredByRule from '../RequiredByRule';

export class Builder {
  private readonly config: RuleConfig;
  constructor(config: RuleConfig) {
    this.config = config;
  }

  public readonly build = () => this.config;
}

export const builder = {
  withParent: (parent: string, errorMessage?: string): Builder =>
    new Builder({type: RequiredByRule.NAME, parent, errorMessage}),
};
