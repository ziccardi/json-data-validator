import { ConstraintInterface } from './ConstraintInterface';
import {
  NAME as FIELD_VALUE_CONSTRAINT,
  FieldValueConstraint,
} from './FieldValueConstraint';
import { ConstraintConfig } from '../config/ConstraintConfig';

interface ConstraintDictionary {
  [key: string]: (config: ConstraintConfig) => ConstraintInterface;
}

/**
 * Ruleset constraint factory.
 */
export class ConstraintFactory {
  private static constraints: ConstraintDictionary = {
    [FIELD_VALUE_CONSTRAINT]: (config: ConstraintConfig) =>
      new FieldValueConstraint(config),
  };

  /**
   * Instantiate a constraint configured with the passed in configuration.
   * @param config
   */
  static create(config: ConstraintConfig): ConstraintInterface {
    if (ConstraintFactory.constraints[config.type as string]) {
      return ConstraintFactory.constraints[config.type as string](config);
    }
    throw { message: `Unknown constraint type ${config.type}` };
  }

  /**
   * Registers a new constraint type.
   * @param constraintType the name of the new constraint type
   * @param factory a factory method that will accept a configuration as input and will return a new instance of the constraint
   */
  static register(
    constraintType: string,
    factory: (config: ConstraintConfig) => ConstraintInterface
  ) {
    this.constraints[constraintType] = factory;
  }
}
