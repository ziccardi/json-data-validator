import {builder as ExactValueBuilder} from './builders/ExactValueBuilder';
import {builder as IsInBuilder} from './builders/IsInBuilder';
import {builder as CompositeRuleBuilder} from './builders/CompositeRuleBuilder';
import {builder as RequiredRuleBuilder} from './builders/RequiredValueBuilder';
import {builder as LengthRuleBuilder} from './builders/LengthRuleBuilder';
import {builder as MatchesRuleBuilder} from './builders/MatchesRuleBuilder';
import {builder as IsBase64Builder} from './builders/IsBase64Builder';

// tslint:disable-next-line:variable-name
export const RuleBuilder = {
  exactValue: ExactValueBuilder,
  isIn: IsInBuilder,
  composite: CompositeRuleBuilder,
  required: RequiredRuleBuilder.required,
  length: LengthRuleBuilder,
  matches: MatchesRuleBuilder.withPattern,
  isBase64: IsBase64Builder,
};
