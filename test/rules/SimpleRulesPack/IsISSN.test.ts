import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isISSN', () => {
  const rule = RuleFactory.create({
    type: 'isISSN',
  });

  it('Should evaluate if string is an ISSN string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['2049-3630', '20493630'],
      invalid: ['2049363'],
    });
  });
});
