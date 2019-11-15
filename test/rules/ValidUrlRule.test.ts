import { Data } from '../../src';
import { RuleConfig } from '../../src/config/RuleConfig';
import { RuleFactory } from '../../src/rules/RuleFactory';

const data: Data = {
  nested: {
    nested: {
      url1: 'http://localhost',
      url2: 'localhost',
    },
  },
};

describe('ValidUrlRule', () => {
  const config: RuleConfig = {
    type: 'VALID_URL',
  };

  it('Should succeed - url1', () => {
    expect(
      RuleFactory.create(config).evaluate('nested.nested.url1', data)
    ).toEqual({
      valid: true,
    });
  });

  it('Should fail - url2', () => {
    expect(
      RuleFactory.create(config).evaluate('nested.nested.url2', data)
    ).toEqual({
      valid: false,
      message: 'Value nested.nested.url2 is not a valid URL string',
      field: 'nested.nested.url2',
    });
  });

  it('Should fail - undefined', () => {
    expect(
      RuleFactory.create(config).evaluate('nested.nested.urlundefined', data)
    ).toEqual({
      valid: false,
      message: 'Value nested.nested.urlundefined is not a valid URL string',
      field: 'nested.nested.urlundefined',
    });
  });
});
