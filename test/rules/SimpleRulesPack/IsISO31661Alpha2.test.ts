import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isISO31661Alpha2', () => {
  const rule = RuleFactory.create({
    type: 'isISO31661Alpha2',
  });

  it('Should evaluate if string is an ISO31661 Alpha 2 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['US'],
      invalid: ['USA'],
    });
  });
});
