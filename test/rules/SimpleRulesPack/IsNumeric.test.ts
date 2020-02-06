import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isNumeric', () => {
  const rule = RuleFactory.create({
    type: 'isNumeric',
  });

  it('Should evaluate if string is a numeric string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        '123',
        '00123',
        '-00123',
        '0',
        '-0',
        '+123',
        '123.123',
        '+000000',
      ],
      invalid: [' ', '.', 'a'],
    });
  });
});
