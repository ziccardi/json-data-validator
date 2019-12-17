import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isISO8601', () => {
  const rule = RuleFactory.create({
    type: 'isISO8601',
  });

  it('Should evaluate if string is an ISO8601 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['2009-W01-1'],
      invalid: ['Monday 29 December 2008'],
    });
  });
});
