import { Data } from './Data';

export interface EvaluationResult {
  valid: boolean;
  field?: string;
  message?: string;
  details?: EvaluationResult[];
}

export interface Rule {
  type: () => string;
  evaluate(path: string, data: Data): EvaluationResult;
}
