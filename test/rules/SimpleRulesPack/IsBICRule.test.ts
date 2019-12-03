import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isBIC', () => {
  const rule = RuleFactory.create({
    type: 'isBIC',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAABBCC' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAABBCCDDD' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail (too many chars)', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAABBCCDDDE' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a valid BIC or SWIFT code",
    });
  });

  it('Should fail (no enough chars)', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAABBCCDD' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a valid BIC or SWIFT code",
    });
  });

  it('Should fail (no enough chars)', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAABBC' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a valid BIC or SWIFT code",
    });
  });
  it('Should fail (invalid chars)', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'AAAAB-CC' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a valid BIC or SWIFT code",
    });
  });
});
