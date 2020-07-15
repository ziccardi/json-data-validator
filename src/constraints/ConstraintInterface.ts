import {Data} from '../Data';

/**
 * Interface for the constraints objects.
 */
export interface ConstraintInterface {
  /**
   * Evaluates the constraint and return true if it is respected.
   * @param data JSon data to be validated.
   */
  isRespected(data: Data): boolean;
}
