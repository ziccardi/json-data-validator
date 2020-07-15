import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isISBN', () => {
  const rule = RuleFactory.create({
    type: 'isISBN',
  });

  it('Should evaluate if string is an ISBN string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['9789295055025'],
      invalid: ['978929505502', '9789295055026'],
    });
  });
});
