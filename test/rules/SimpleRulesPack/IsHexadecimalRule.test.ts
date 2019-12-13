import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isHexadecimal', () => {
  const rule = RuleFactory.create({
    type: 'isHexadecimal',
  });

  it('Should evaluate if string is a valid hex string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['1234567890ABCDEF'],
      invalid: ['1234567890ABCDEFG'],
    });
  });
});
