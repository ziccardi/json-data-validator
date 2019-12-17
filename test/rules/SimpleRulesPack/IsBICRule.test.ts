import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isBIC', () => {
  const rule = RuleFactory.create({
    type: 'isBIC',
  });

  it('Should evaluate if string is an BIC string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['AAAABBCC', 'AAAABBCCDDD'],
      invalid: ['AAAABBCCDDDE', 'AAAABBCCDD', 'AAAABBC', 'AAAAB-CC'],
    });
  });
});
