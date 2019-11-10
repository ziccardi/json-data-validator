import { Config } from './ConstraintInterface';
import { ConstraintInterface } from './ConstraintInterface';

export abstract class AbstractConstraint implements ConstraintInterface {
  protected readonly config: Config;

  constructor(cfg: Config) {
    this.config = cfg;
  }

  abstract isRespected(data: Config): boolean;
}

export { Config };
