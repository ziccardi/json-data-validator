import * as LengthRule from '../LengthRule';
import {RuleConfig} from '../../config/RuleConfig';

export const builder = {
  withLength: (length: number, errorMessage?: string): RuleConfig => ({
    type: LengthRule.NAME,
    length,
    errorMessage,
  }),
};
