import { MaxLengthRule } from '../../src/rules/MaxLengthRule';
import { Configuration } from '../../src/ConfigurationInterface';
import { DataInterface } from '../../src/DataInterface';

const config: Configuration = {
  type: 'maxlength',
  maxlength: 10,
};

const data: DataInterface = {
  text10: '0123456789',
  text5: '01234',
  test11: '01234567890',
  nested: {
    test10: '0123456789',
    test4: '0123',
    test12: '012345678901',
  },
};

describe('MaxLengthRule', () => {
  it('Should fail - key', () => {
    expect(new MaxLengthRule(config).evaluate('test11', data)).toEqual({
      message: "Maximum length exceeded for 'test11'",
      valid: false,
    });
  });
  it('Should fail - path', () => {
    expect(new MaxLengthRule(config).evaluate('nested.test12', data)).toEqual({
      message: "Maximum length exceeded for 'nested.test12'",
      valid: false,
    });
  });
  it('Should not fail - key - exactly maxlength', () => {
    expect(new MaxLengthRule(config).evaluate('test10', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path - exactly maxlength', () => {
    expect(new MaxLengthRule(config).evaluate('nested.test10', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path - value undefined', () => {
    expect(
      new MaxLengthRule(config).evaluate('nested.test-undefined', data)
    ).toEqual({
      valid: true,
    });
  });
});
