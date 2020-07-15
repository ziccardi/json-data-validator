import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isBefore', () => {
  const rule = RuleFactory.create({
    type: 'isBefore',
    date: '21/12/2005',
  });

  it('Should evaluate if the date is before 21/12/2005', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['20/12/2005'],
      invalid: ['15/12/2020', '21/12/2005'],
    });
  });
});
