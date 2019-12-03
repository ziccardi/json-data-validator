import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isAscii', () => {
  const rule = RuleFactory.create({
    type: 'isAscii',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi 1=+-[]{}$%^!@><,./' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi-*/\u1000' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not ascii'",
      valid: false,
    });
  });
});
