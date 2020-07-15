import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isBase64', () => {
  const rule = RuleFactory.create({
    type: 'isBase64',
  });

  it('Should evaluate if string is a Base64 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['SGVsbG8gV29ybGQ='],
      invalid: ['ABCDEFGHILMNOPQ'],
    });
  });
});
