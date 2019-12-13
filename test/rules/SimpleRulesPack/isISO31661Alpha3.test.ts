import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isISO31661Alpha3', () => {
  const rule = RuleFactory.create({
    type: 'isISO31661Alpha3',
  });

  it('Should evaluate if string is an ISO31661 Alpha 3 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['USA'],
      invalid: ['US', 'ITB'],
    });
  });
});
