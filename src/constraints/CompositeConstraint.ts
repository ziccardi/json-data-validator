import {AbstractConstraint, ConstraintConfig} from './AbstractConstraint';
import {Data} from '../Data';
import {ConstraintFactory} from './ConstraintFactory';

/**
 * This constraint evaluates a set of sub-constraints.
 * Its return value depends on the result of the sub-constraints and on the algorithm to be used to compute the result:
 * 1) If `algorithm` is `all` then all sub-constraints must be respected for this constraint to return `true`
 * 2) If `algorithm` is `any` then at least one sub-constraint must be respected for this constraint to return `true`
 * The constraint type for this constraint is `COMPOSITE_CONSTRAINT`
 * Configuration:
 * * type: 'COMPOSITE_CONSTRAINT'
 * * algorithm: can be `all` or `any`
 * subRules: [ ] list of constraints to be evaluated.
 */
export class CompositeConstraint extends AbstractConstraint {
  isRespected(data: Data): boolean {
    if (!this.config.subRules) {
      // TODO: log a warning
      return true;
    }
    const validCount = this.config.subRules!.reduce(
      (total: number, ruleConfig: ConstraintConfig) => {
        return (
          total +
          (ConstraintFactory.create(ruleConfig).isRespected(data) ? 1 : 0)
        );
      },
      0
    );

    if (this.config.algorithm === 'any') {
      return validCount > 0;
    } else {
      return this.config.subRules!.length === validCount;
    }
  }
}

export const NAME = 'COMPOSITE_CONSTRAINT';
