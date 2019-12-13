import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isCreditCard', () => {
  const rule = RuleFactory.create({
    type: 'isCreditCard',
  });

  it('Should evaluate if string is a valid credit card number', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        '4648020324895174',
        '5583624778892266',
        '377024137950510',
        '36405736447607',
      ],
      invalid: ['36405736887607'],
    });
  });
});
