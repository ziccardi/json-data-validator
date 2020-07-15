import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isInt', () => {
  const rule = RuleFactory.create({
    type: 'isInt',
  });

  it('Should evaluate if string is an int', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['10', '-10'],
      invalid: ['10.0', 'abc'],
    });
  });
});
