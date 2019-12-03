import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isHexColor', () => {
  const rule = RuleFactory.create({
    type: 'isHexColor',
  });

  it('Should succeed: 123ABC', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '123ABC' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: 123', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '123ABC' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: 123A', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '1234567890ABCDEFG' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid hex color string",
      valid: false,
    });
  });

  it('Should fail: 123ABCD', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '1234567890ABCDEFG' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid hex color string",
      valid: false,
    });
  });
});
