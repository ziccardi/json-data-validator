import { ValidUrlPathRule } from '../../src/rules/ValidUrlPathRule';
import { Data } from '../../src';
import { RuleConfig } from '../../src/config/RuleConfig';

const data: Data = {
  nested: {
    nested: {
      url1: '/folder/file',
      url2: '/folder/',
      url3: '////asdfsd///asdf//asdf////\\sadf@&^*(sdf',
    },
  },
};

describe('ValidUrlPathRule', () => {
  const config: RuleConfig = {
    type: 'VALID_URL_PATH',
  };

  it('Should succeed - url1', () => {
    expect(
      new ValidUrlPathRule(config).evaluate('nested.nested.url1', data)
    ).toEqual({
      valid: true,
    });
  });
  it('Should succeed - url2', () => {
    expect(
      new ValidUrlPathRule(config).evaluate('nested.nested.url2', data)
    ).toEqual({
      valid: true,
    });
  });
  it('Should fail - url3', () => {
    expect(
      new ValidUrlPathRule(config).evaluate('nested.nested.url3', data)
    ).toEqual({
      valid: false,
      field: 'nested.nested.url3',
      message: "Value 'nested.nested.url3' is not a valid URL path",
    });
  });
});
