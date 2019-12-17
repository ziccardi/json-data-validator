import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isJSON', () => {
  const rule = RuleFactory.create({
    type: 'isJSON',
  });

  it('Should evaluate if string is a JSON string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['{}'],
      invalid: ["{'key': 'value'}"],
    });
  });
});
