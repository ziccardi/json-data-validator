import { Data } from '../../src';
import { RuleConfig } from '../../src/config/RuleConfig';
import { RuleFactory } from '../../src/rules/RuleFactory';

const config: RuleConfig = {
  type: 'MAXLENGTH',
  maxlength: 10,
};

const data: Data = {
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
    expect(RuleFactory.create(config).evaluate('test11', data)).toEqual({
      message: "Maximum length exceeded for 'test11'",
      field: 'test11',
      valid: false,
    });
  });
  it('Should fail - path', () => {
    expect(RuleFactory.create(config).evaluate('nested.test12', data)).toEqual({
      message: "Maximum length exceeded for 'nested.test12'",
      field: 'nested.test12',
      valid: false,
    });
  });
  it('Should not fail - key - exactly maxlength', () => {
    expect(RuleFactory.create(config).evaluate('test10', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path - exactly maxlength', () => {
    expect(RuleFactory.create(config).evaluate('nested.test10', data)).toEqual({
      valid: true,
    });
  });
  it('Should not fail - path - value undefined', () => {
    expect(
      RuleFactory.create(config).evaluate('nested.test-undefined', data)
    ).toEqual({
      valid: true,
    });
  });
});
