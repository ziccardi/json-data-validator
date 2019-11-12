import { Data } from './Data';

export interface EvaluationResult {
  valid: boolean;
  field?: string;
  message?: string;
}

export interface Rule {
  evaluate(path: string, data: Data): EvaluationResult;
}
