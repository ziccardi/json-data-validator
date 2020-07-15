import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isAlphaNumeric', () => {
  const rule = RuleFactory.create({
    type: 'isAlphaNumeric',
  });

  it('Should evaluate if the string is alphanumeric', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['abcdefghi1', 'abcdefghi'],
      invalid: ['abcdefghi-*/'],
    });
  });
});
