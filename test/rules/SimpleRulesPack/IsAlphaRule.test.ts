import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isAlpha', () => {
  const rule = RuleFactory.create({
    type: 'isAlpha',
  });

  it('Should evaluate if string is an alpha string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['abcdefghi'],
      invalid: ['abcde fghi 1', 'abcde fghi-*/'],
    });
  });
});
