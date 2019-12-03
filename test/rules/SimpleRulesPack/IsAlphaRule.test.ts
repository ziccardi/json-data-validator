import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isAlpha', () => {
  const rule = RuleFactory.create({
    type: 'isAlpha',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcde fghi 1' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alpha'",
      valid: false,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcde fghi-*/' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alpha'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
