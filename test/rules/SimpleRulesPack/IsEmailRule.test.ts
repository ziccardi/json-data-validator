import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isEmail', () => {
  const rule = RuleFactory.create({
    type: 'isEmail',
  });

  it('Should evaluate if string is a valid email address', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['mickey@mouse.it'],
      invalid: ['mickey@mouse'],
    });
  });
});
