import { AbstractConstraint, ConstraintConfig } from './AbstractConstraint';
import { Data } from '../Data';
import { ConstraintFactory } from './ConstraintFactory';

/**
 * type: 'composite,
 * algorithm: all,
 * error: error,
 * subRules: [ ]
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
