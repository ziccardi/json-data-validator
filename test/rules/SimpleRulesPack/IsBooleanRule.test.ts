import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isBoolean', () => {
  const rule = RuleFactory.create({
    type: 'isBoolean',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'true' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'false' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'maybe' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a boolean",
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'TRUE' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a boolean",
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'True' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a boolean",
    });
  });
});
