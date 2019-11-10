import { Config, ConstraintInterface } from './ConstraintInterface';
import {
  NAME as FIELD_VALUE_CONSTRAINT,
  FieldValueConstraint,
} from './FieldValueConstraint';

export class ConstraintFactory {
  static create(config: Config): ConstraintInterface | null {
    switch (config.type) {
      case FIELD_VALUE_CONSTRAINT:
        return new FieldValueConstraint(config);
      default:
        throw { message: `Unknown contraint type ${config.type}` };
    }
  }
}
