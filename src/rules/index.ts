import * as ExactValueRule from './ExactValueRule';
import * as MaxLengthRule from './MaxLengthRule';
import * as RequiredRule from './RequiredRule';
import * as ValidUrlPathRule from './ValidUrlPathRule';
import * as ValidUrlRule from './ValidUrlRule';
import * as LengthRule from './LengthRule';
import {CompositeRule} from './CompositeRule';
import {RuleConfig} from '../config/RuleConfig';

export const RULE_DICTIONARY = {
  [CompositeRule.NAME]: (config: RuleConfig) => new CompositeRule(config),
  [ExactValueRule.NAME]: ExactValueRule.rule,
  [MaxLengthRule.NAME]: MaxLengthRule.rule,
  [RequiredRule.NAME]: RequiredRule.rule,
  [ValidUrlPathRule.NAME]: ValidUrlPathRule.rule,
  [ValidUrlRule.NAME]: ValidUrlRule.rule,
  [LengthRule.NAME]: LengthRule.rule,
};
