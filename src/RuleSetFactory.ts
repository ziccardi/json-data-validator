import { RuleSet } from './RuleSet';
import { RuleFactory } from './rules/RuleFactory';
import { Configuration } from './ConfigurationInterface';
import { ConstraintFactory } from './constraints/ConstraintFactory';
import { ConstraintConfiguration } from './constraints/ConstraintInterface';

export interface RulesetConfig {
  constraints?: ConstraintConfiguration[];
  rules: Configuration[];
}
export class RuleSetFactory {
  static create(rulesetConfig: RulesetConfig): RuleSet {
    const ruleset: RuleSet = new RuleSet();

    if (rulesetConfig.constraints) {
      rulesetConfig.constraints.reduce(
        (ruleset: RuleSet, config: ConstraintConfiguration): RuleSet =>
          ruleset.addConstraint(ConstraintFactory.create(config)),
        ruleset
      );
    }

    return rulesetConfig.rules.reduce(
      (res: RuleSet, config: Configuration): RuleSet =>
        res.addRule(RuleFactory.create(config)),
      ruleset
    );
  }
}
