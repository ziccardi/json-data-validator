import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isDecimal', () => {
  const rule = RuleFactory.create({
    type: 'isDecimal',
  });

  it('Should succeed: 10292938', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '10292938' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: 102929.38', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '102929.38' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: .10292938', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '.10292938' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: -.10292938', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '-.10292938' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: -.1029-2938', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '-.1029-2938' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a decimal number",
      valid: false,
    });
  });
});
