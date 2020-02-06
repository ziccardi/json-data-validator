import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isOctal', () => {
  const rule = RuleFactory.create({
    type: 'isOctal',
  });

  it('Should evaluate if string is an octal string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['076543210', '0o01234567'],
      invalid: ['abcdefg', '012345678', '012345670c', '00c12345670c', '..'],
    });
  });
});
