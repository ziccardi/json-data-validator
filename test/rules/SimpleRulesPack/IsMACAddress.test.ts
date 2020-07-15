import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isMACAddress', () => {
  const rule = RuleFactory.create({
    type: 'isMACAddress',
  });

  it('Should evaluate if string is a MAC address', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['0a:f9:d3:be:a1:ca'],
      invalid: ['0a:f9:d3:be:a1'],
    });
  });
});
