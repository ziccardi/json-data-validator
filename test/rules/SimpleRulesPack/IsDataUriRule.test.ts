import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isDataURI', () => {
  const rule = RuleFactory.create({
    type: 'isDataURI',
  });

  it('Should evaluate if string is a data URI', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        'data:,Hello%2C%20World!',
        'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
      ],
      invalid: [],
    });
  });
});
