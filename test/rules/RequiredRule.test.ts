import { RequiredRule } from '../../src/rules/RequiredRule';
import { Configuration } from '../../src/ConfigurationInterface';
import { DataInterface } from '../../src/DataInterface';

const config: Configuration = {
  type: 'maxlength',
  maxlength: 10,
};

const data: DataInterface = {
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
  it('Should fail - key', () => {
    expect(new RequiredRule().evaluate('empty', data)).toEqual({
      message: "Value 'empty' is required",
      valid: false,
    });
  });
  it('Should fail - missing key', () => {
    expect(new RequiredRule().evaluate('missing', data)).toEqual({
      message: "Value 'missing' is required",
      valid: false,
    });
  });
  it('Should fail - path', () => {
    expect(new RequiredRule().evaluate('nested.nested.empty', data)).toEqual({
      message: "Value 'nested.nested.empty' is required",
      valid: false,
    });
  });
  it('Should fail - missing key', () => {
    expect(new RequiredRule().evaluate('nested.nested.missing', data)).toEqual({
      message: "Value 'nested.nested.missing' is required",
      valid: false,
    });
  });
  it('Should not fail - key', () => {
    expect(new RequiredRule().evaluate('text', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path', () => {
    expect(new RequiredRule().evaluate('nested.nested.text', data)).toEqual({
      valid: true,
    });
  });
});
