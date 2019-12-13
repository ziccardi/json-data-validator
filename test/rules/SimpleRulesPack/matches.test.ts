import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('matches', () => {
  it('Should evaluate if the configured pattern matches the passed in string', () => {
    const rule = RuleFactory.create({
      type: 'matches',
      pattern: 'abc',
    });

    test(rule, {
      path: 'field1.field2',
      valid: ['abc', 'abcdef', '123abc'],
      invalid: ['acb', 'Abc'],
    });
  });
});
