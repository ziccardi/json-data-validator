import {testValidator} from '../utils';
import {RuleBuilder, validatorBuilder} from '../../src';

describe('Length Validator Builder', () => {
  it('Should evaluate if value is long exactly 2 characters', () => {
    const validator = validatorBuilder()
      .newRule()
      .withField('test')
      .validate(RuleBuilder.length.withLength(2).build())
      .build();
    testValidator(validator, {
      valid: [{test: 'bb'}, {test: 'aa'}, {test: 'dd'}, {test: 'ee'}],
      invalid: [{test: 'c'}, {test: 'ccc'}],
    });
  });
});
