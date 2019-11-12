import { Data } from './Data';

interface InvalidFieldResult {
  valid: boolean;
  field: string;
  message: string;
}

interface ValidResult {
  valid: true;
}

export type EvaluationResult = ValidResult | InvalidFieldResult;

export interface Rule {
  evaluate(path: string, data: Data): EvaluationResult;
}
