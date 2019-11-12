import { RuleSet } from './RuleSet';
import { RuleFactory } from './rules/RuleFactory';
import { ConstraintFactory } from './constraints/ConstraintFactory';
import { RuleSetConfig } from './config/RuleSetConfig';
import { ConstraintConfig } from './config/ConstraintConfig';
import { RuleConfig } from './config/RuleConfig';
import { Rule } from './Rule';

export class RuleSetFactory {
  static create(rulesetConfig: RuleSetConfig): RuleSet {
    const ruleset: RuleSet = new RuleSet();

    if (rulesetConfig.constraints) {
      rulesetConfig.constraints.reduce(
        (ruleset: RuleSet, config: ConstraintConfig): RuleSet =>
          ruleset.addConstraint(ConstraintFactory.create(config)),
        ruleset
      );
    }

    Object.keys(rulesetConfig.fields).forEach((field: string) => {
      const rules: Rule[] = [];
      rulesetConfig.fields[field].forEach((ruleConfig: RuleConfig) => {
        rules.push(RuleFactory.create(ruleConfig));
      });

      ruleset.addRule(field, rules);
    });

    return ruleset;
  }
}
