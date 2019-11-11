import { DataInterface } from './DataInterface';

export interface RuleEvaluationResult {
  valid: boolean;
  message?: string;
}

export interface RuleInterface {
  evaluate(path: string, data: DataInterface): RuleEvaluationResult;
}
