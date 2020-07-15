import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isDivisibleBy', () => {
  const rule = RuleFactory.create({
    type: 'isDivisibleBy',
    number: '3',
  });

  it('Should evaluate if string is a number divisible by 3', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['12', '0'],
      invalid: ['13'],
    });
  });
});
