import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isFQDN', () => {
  const rule = RuleFactory.create({
    type: 'isFQDN',
  });

  it('Should evaluate if string is a valid FQDN', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['mickey.mouse.it', 'mickey.mouse'],
      invalid: ['mickey..mouse', 'mouse', '.mickey.mouse'],
    });
  });
});
