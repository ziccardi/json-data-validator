import { ConstraintConfiguration } from './ConstraintInterface';
import { ConstraintInterface } from './ConstraintInterface';
import { DataInterface } from '../DataInterface';

/**
 * Base class for ruleset constraints.
 */
export abstract class AbstractConstraint implements ConstraintInterface {
  protected readonly config: ConstraintConfiguration;

  constructor(cfg: ConstraintConfiguration) {
    this.config = cfg;
  }

  abstract isRespected(data: DataInterface): boolean;
}

export { ConstraintConfiguration };
