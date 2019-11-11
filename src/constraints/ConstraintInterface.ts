import { DataInterface } from '../DataInterface';

export interface ConstraintConfiguration {
  type: string;
  [key: string]: string;
}

export interface ConstraintInterface {
  isRespected(data: DataInterface): boolean;
}
