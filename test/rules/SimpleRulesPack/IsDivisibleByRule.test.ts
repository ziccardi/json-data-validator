import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isDivisibleBy', () => {
  const rule = RuleFactory.create({
    type: 'isDivisibleBy',
    number: '3',
  });

  it('Should succeed: 12', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '12' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: 0', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '0' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: 13', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '13' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not divisible by 3",
      valid: false,
    });
  });
});
