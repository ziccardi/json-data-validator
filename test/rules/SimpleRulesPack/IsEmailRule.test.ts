import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isEmail', () => {
  const rule = RuleFactory.create({
    type: 'isEmail',
  });

  it('Should succeed: mickey@mouse.it', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mickey@mouse.it' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: mickey@mouse', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mickey@mouse' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid email address",
      valid: false,
    });
  });
});
