import { builder as ExactValueBuilder } from './builders/ExactValueBuilder';
import { builder as IsInBuilder } from './builders/IsInBuilder';
import { builder as CompositeRuleBuilder } from './builders/CompositeRuleBuilder';
import { builder as RequiredRuleBuilder } from './builders/RequiredValueBuilder';
import { builder as LengthRuleBuilder} from './builders/LengthRuleBuilder';
import { builder as MatchesRuleBuilder} from './builders/MatchesRuleBuilder';

// tslint:disable-next-line:variable-name
export const RuleBuilder = {
  exactValue: ExactValueBuilder,
  isIn: IsInBuilder,
  composite: CompositeRuleBuilder,
  required: RequiredRuleBuilder.required,
  length: LengthRuleBuilder,
  matches: MatchesRuleBuilder.withPattern
};
