import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isRFC3339', () => {
  const rule = RuleFactory.create({
    type: 'isRFC3339',
  });

  it('Should evaluate if string is an RFC3339 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['1985-04-12T23:20:50.52Z'],
      invalid: ['1985-04-12T23:20:50.52K'],
    });
  });
});
