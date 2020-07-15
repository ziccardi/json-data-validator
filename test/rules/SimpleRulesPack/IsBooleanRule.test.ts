import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isBoolean', () => {
  const rule = RuleFactory.create({
    type: 'isBoolean',
  });

  it('Should evaluate if string is a boolean', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['true', 'false'],
      invalid: ['maybe', 'TRUE', 'True'],
    });
  });
});
