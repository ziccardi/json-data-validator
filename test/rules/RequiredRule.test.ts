import { RequiredRule } from '../../src/rules/RequiredRule';
import { Data } from '../../src';
import { RuleConfig } from '../../src/config/RuleConfig';

const config: RuleConfig = {
  type: 'maxlength',
  maxlength: 10,
};

const data: Data = {
  empty: '',
  text: '1234',
  nested: {
    nested: {
      empty: '',
      text: '1234',
    },
  },
};

describe('RequiredRule', () => {
  const config: RuleConfig = {
    type: 'REQUIRED',
  };

  it('Should fail - key', () => {
    expect(new RequiredRule(config).evaluate('empty', data)).toEqual({
      message: "Value 'empty' is required",
      field: 'empty',
      valid: false,
    });
  });
  it('Should fail - missing key', () => {
    expect(new RequiredRule(config).evaluate('missing', data)).toEqual({
      message: "Value 'missing' is required",
      field: 'missing',
      valid: false,
    });
  });
  it('Should fail - path', () => {
    expect(
      new RequiredRule(config).evaluate('nested.nested.empty', data)
    ).toEqual({
      message: "Value 'nested.nested.empty' is required",
      field: 'nested.nested.empty',
      valid: false,
    });
  });
  it('Should fail - missing key', () => {
    expect(
      new RequiredRule(config).evaluate('nested.nested.missing', data)
    ).toEqual({
      message: "Value 'nested.nested.missing' is required",
      field: 'nested.nested.missing',
      valid: false,
    });
  });
  it('Should not fail - key', () => {
    expect(new RequiredRule(config).evaluate('text', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path', () => {
    expect(
      new RequiredRule(config).evaluate('nested.nested.text', data)
    ).toEqual({
      valid: true,
    });
  });
});
