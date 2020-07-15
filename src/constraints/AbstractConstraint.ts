import {ConstraintInterface} from './ConstraintInterface';
import {Data} from '../Data';
import {ConstraintConfig} from '../config/ConstraintConfig';

/**
 * Base class for ruleset constraints.
 */
export abstract class AbstractConstraint implements ConstraintInterface {
  protected readonly config: ConstraintConfig;

  constructor(cfg: ConstraintConfig) {
    this.config = cfg;
  }

  abstract isRespected(data: Data): boolean;
}

export {ConstraintConfig};
