import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isIn', () => {
  const rule = RuleFactory.create({
    type: 'isIn',
    values: '10,11,12,a,b,c,abc,e,f,g',
  });

  it('Should evaluate if string is the configured string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['abc'],
      invalid: ['efg'],
    });
  });
});
