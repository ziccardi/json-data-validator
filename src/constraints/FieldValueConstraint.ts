import { get } from 'lodash';
import { AbstractConstraint } from './AbstractConstraint';
import { DataInterface } from '../DataInterface';

export class FieldValueConstraint extends AbstractConstraint {
  /**
   * Returns true if the value retrieved at the configured path has the value specified into the configuration
   * @param data a dictionary containing the data to be validated
   * @returns {boolean}
   */
  isRespected(data: DataInterface): boolean {
    return get(data, this.config.path as string) === this.config.value;
  }
}

export const NAME = 'FIELD_VALUE';
