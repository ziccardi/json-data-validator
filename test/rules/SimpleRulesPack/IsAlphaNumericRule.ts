import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isAlphaNumeric', () => {
  const rule = RuleFactory.create({
    type: 'isAlphaNumeric',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi1' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi-*/' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alphanumeric'",
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
