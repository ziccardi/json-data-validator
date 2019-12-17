import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isPort', () => {
  const rule = RuleFactory.create({
    type: 'isPort',
  });

  it('Should evaluate if string is a valid port', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['0', '22', '80', '443', '3000', '8080', '65535'],
      invalid: ['', '-1', '65536'],
    });
  });
});
