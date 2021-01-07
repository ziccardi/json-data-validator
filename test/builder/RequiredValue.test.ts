import {testValidator} from '../utils';
import {RuleBuilder, validatorBuilder} from '../../src';

describe('RequiredValue Rule Builder', () => {
  it('Should evaluate if value exists', () => {
    const validator = validatorBuilder()
      .newRule()
      .withField('test')
      .validate(RuleBuilder.required().build())
      .build();
    testValidator(validator, {
      valid: [{test: 'value'}, {test: ' '}],
      invalid: [{aa: 'bb'}, {test: ''}],
    });
  });

  it('Should evaluate if value at specified path exists', () => {
    const validator = validatorBuilder()
      .newRule()
      .withField('test')
      .validate(RuleBuilder.required().withPath('aa.bb.cc').build())
      .build();
    testValidator(validator, {
      valid: [{aa: {bb: {cc: 'value'}}}, {aa: {bb: {cc: ' '}}}],
      invalid: [{aa: {bb: {dd: 'value'}}}],
    });
  });
});
