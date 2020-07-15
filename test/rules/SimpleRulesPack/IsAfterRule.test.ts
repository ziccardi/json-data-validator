import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isAfter', () => {
  const rule = RuleFactory.create({
    type: 'isAfter',
    date: '21/12/2005',
  });

  it('Should evaluate is a date is after 21/12/2005', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['22/12/2005'],
      invalid: ['15/12/2000', '21/12/2000'],
    });
  });
});
