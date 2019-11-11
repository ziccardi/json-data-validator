import { RuleInterface, RuleEvaluationResult } from './RuleInterface';
import { DataInterface } from './DataInterface';
import { ConstraintInterface } from './constraints/ConstraintInterface';

export class RuleSet implements RuleInterface {
  private constraints: ConstraintInterface[] = [];
  private rules: RuleInterface[] = [];

  shouldEvaluate(data: DataInterface): boolean {
    return this.constraints.reduce(
      (res: boolean, current: ConstraintInterface): boolean => {
        res = res && current.isRespected(data);
        return res;
      },
      true
    );
  }

  evaluate(path: string, data: DataInterface): RuleEvaluationResult {
    for (let i = 0; i < this.rules.length; i++) {
      const res = this.rules[i].evaluate(path, data);
      if (!res.valid) {
        return res;
      }
    }

    return {
      valid: true,
    };
  }

  addConstraint(constraint: ConstraintInterface): RuleSet {
    this.constraints.push(constraint);
    return this;
  }

  addRule(rule: RuleInterface): RuleSet {
    this.rules.push(rule);
    return this;
  }
}
