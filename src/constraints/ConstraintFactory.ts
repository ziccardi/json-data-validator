import { Config, ConstraintInterface } from './ConstraintInterface';
import {
  NAME as FIELD_VALUE_CONSTRAINT,
  FieldValueConstraint,
} from './FieldValueConstraint';

interface ConstraintDictionary {
  [key: string]: (config: Config) => ConstraintInterface;
}

export class ConstraintFactory {
  private static constraints: ConstraintDictionary = {
    FIELD_VALUE_CONSTRAINT: (config: Config) =>
      new FieldValueConstraint(config),
  };

  static create(config: Config): ConstraintInterface {
    if (ConstraintFactory.constraints[config.type as string]) {
      return ConstraintFactory.constraints[config.type as string](config);
    }
    throw { message: `Unknown constraint type ${config.type}` };
  }

  static register(
    constraintType: string,
    factory: (config: Config) => ConstraintInterface
  ) {
    this.constraints[constraintType] = factory;
  }
}
