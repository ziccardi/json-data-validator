import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isMongoId', () => {
  const rule = RuleFactory.create({
    type: 'isMongoId',
  });

  it('Should evaluate if string is a valid Mongo ID', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['507f1f77bcf86cd799439011'],
      invalid: [
        '507f1f77bcf86cd7994390',
        '507f1f77bcf86cd79943901z',
        '507f1f77bcf86cd799439011 ',
        '507f1f77bcf 6cd799439011',
        ' 507f1f77bcf86cd799439011',
      ],
    });
  });
});
