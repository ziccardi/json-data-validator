import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isHexadecimal', () => {
  const rule = RuleFactory.create({
    type: 'isHexadecimal',
  });

  it('Should succeed: 1234567890ABCDEF', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '1234567890ABCDEF' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: 1234567890ABCDEFG', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '1234567890ABCDEFG' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid hexadecimal string",
      valid: false,
    });
  });
});
