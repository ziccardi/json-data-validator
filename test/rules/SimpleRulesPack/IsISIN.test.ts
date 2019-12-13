import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isISIN', () => {
  const rule = RuleFactory.create({
    type: 'isISIN',
  });

  it('Should evaluate if string is an ISIN string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['US0378331005'],
      invalid: ['US0478331005'],
    });
  });
});
