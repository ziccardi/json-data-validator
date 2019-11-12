import { Data } from '../Data';

export interface ConstraintInterface {
  isRespected(data: Data): boolean;
}
