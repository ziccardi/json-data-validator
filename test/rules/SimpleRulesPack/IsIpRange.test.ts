import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isIPRange', () => {
  const rule = RuleFactory.create({
    type: 'isIPRange',
  });

  it('Should evaluate if string is a valid IP range (v4)', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['10.10.10.0/24'],
      invalid: ['10.10.10.0'],
    });
  });
});
