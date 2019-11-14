import { EvaluationResult, Rule } from '../Rule';
import { get } from 'lodash';
import { Data } from '../Data';
import { RuleConfig } from '../config/RuleConfig';
import * as util from 'util';

const validator = require('validator');

export class GenericValidator implements Rule {
  private readonly config: RuleConfig;
  private readonly validatorFunction: (path: string) => boolean;
  private readonly defaultErrorMessage: string;

  constructor(
    config: RuleConfig,
    validatorFunction: (path: string) => boolean,
    defaultErrorMessage: string
  ) {
    this.config = config;
    this.validatorFunction = validatorFunction;
    this.defaultErrorMessage = defaultErrorMessage;
  }
  evaluate(path: string, data: Data): EvaluationResult {
    const value = get(data, path) as string;

    if (!this.validatorFunction(value)) {
      return {
        valid: false,
        field: path,
        message:
          this.config.errorMessage ||
          util.format(this.defaultErrorMessage, path),
      };
    }

    return { valid: true };
  }
}
