import {testValidator} from '../utils';
import {RuleBuilder, validatorBuilder} from '../../src';

describe('IsIn Validator Builder', () => {
  it('Should evaluate if value falls into the list of passed values', () => {
    const validator = validatorBuilder()
      .newRule()
      .withField('test')
      .validate(
        RuleBuilder.isIn
          .withValue('aa')
          .withValue('bb')
          .withValues('dd', 'ee')
          .build()
      )
      .build();
    testValidator(validator, {
      valid: [{test: 'bb'}, {test: 'aa'}, {test: 'dd'}, {test: 'ee'}],
      invalid: [{test: 'cc'}],
    });
  });
});
