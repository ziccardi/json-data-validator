import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isDecimal', () => {
  const rule = RuleFactory.create({
    type: 'isDecimal',
  });

  it('Should evaluate if string is a decimal number', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['10292938', '102929.38', '.10292938', '-.10292938'],
      invalid: ['-.1029-2938'],
    });
  });
});
