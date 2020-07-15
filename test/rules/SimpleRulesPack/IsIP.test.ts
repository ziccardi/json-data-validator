import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isIP', () => {
  const rule = RuleFactory.create({
    type: 'isIP',
  });

  it('Should evaluate if string is a valid IP address', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        '10.10.10.1',
        '192.168.10.1',
        '2001:b07:5d26:3934:105e:875f:994f:8b28',
      ],
      invalid: ['192.168.10', 'localhost'],
    });
  });
});
