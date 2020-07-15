import {get} from 'lodash';
import {AbstractConstraint} from './AbstractConstraint';
import {Data} from '../Data';

/**
 * This constraint checks that the value retrieved a specified path has a specific value.
 * Nested keys must be separated with a dot.
 * Configuration:
 * * type: 'FIELD_VALUE'
 * * path: 'path.to.your.field'
 * * value: 'value.to.be.enforced'
 */
export class FieldValueConstraint extends AbstractConstraint {
  /**
   * Returns true if the value retrieved at the configured path has the value specified into the configuration
   * @param data a dictionary containing the data to be validated
   * @returns {boolean}
   */
  isRespected(data: Data): boolean {
    return get(data, this.config.path as string) === this.config.value;
  }
}

export const NAME = 'FIELD_VALUE';
