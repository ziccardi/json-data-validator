import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isLatLong', () => {
  const rule = RuleFactory.create({
    type: 'isLatLong',
  });

  it('Should evaluate if string is a valid Latitude/Longitude string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['10,10', '10,-0.5232'],
      invalid: ['10'],
    });
  });
});
