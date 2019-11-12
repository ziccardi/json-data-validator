import { Rule, EvaluationResult } from './Rule';
import { Data } from './Data';
import { ConstraintInterface } from './constraints/ConstraintInterface';
import { FieldList } from './FieldList';

export class RuleSet implements Rule {
  private constraints: ConstraintInterface[] = [];
  private fields: FieldList = {};

  shouldEvaluate(data: Data): boolean {
    return this.constraints.reduce(
      (res: boolean, current: ConstraintInterface): boolean => {
        res = res && current.isRespected(data);
        return res;
      },
      true
    );
  }

  private evaluateField(
    field: string,
    rules: Rule[],
    data: Data
  ): EvaluationResult {
    for (let i = 0; i < rules.length; i++) {
      const res = rules[i].evaluate(field, data);
      if (!res.valid) {
        return res;
      }
    }

    return { valid: true };
  }

  evaluate(path: string, data: Data): EvaluationResult {
    const fieldList = Object.keys(this.fields);

    for (let i = 0; i < fieldList.length; i++) {
      const res = this.evaluateField(
        fieldList[i],
        this.fields[fieldList[i]],
        data
      );
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

  addRule(field: string, rules: Rule[]): RuleSet {
    this.fields[field] = rules;
    return this;
  }
}
