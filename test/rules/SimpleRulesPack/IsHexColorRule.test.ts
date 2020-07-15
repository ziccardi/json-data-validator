import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isHexColor', () => {
  const rule = RuleFactory.create({
    type: 'isHexColor',
  });

  it('Should evaluate if string is a valid color hex string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['123ABC', '123'],
      invalid: ['1234567890ABCDEFG', '123ABCD'],
    });
  });
});
