import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isAscii', () => {
  const rule = RuleFactory.create({
    type: 'isAscii',
  });

  it('Should evaluate if string is an ASCII string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['abcdefghi 1=+-[]{}$%^!@><,./'],
      invalid: ['abcdefghi-*/\u1000'],
    });
  });
});
