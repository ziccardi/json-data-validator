import {testValidator} from '../utils';
import {RuleBuilder, validatorBuilder} from '../../src';

describe('IsBase64 Validator Builder', () => {
  it('Should evaluate if string is a Base64 string', () => {
    const validator = validatorBuilder()
      .newRule()
      .withField('test')
      .validate(RuleBuilder.isBase64.build())
      .build();
    testValidator(validator, {
      valid: [{test: 'SGVsbG8gV29ybGQ='}],
      invalid: [{test: 'ABCDEFGHILMNOPQ'}],
    });
  });
});
