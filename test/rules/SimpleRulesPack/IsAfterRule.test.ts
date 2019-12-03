import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isAfter', () => {
  const rule = RuleFactory.create({
    type: 'isAfter',
    date: '21/12/2005',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '15/12/2000' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Date at 'field1.field2' is not after '21/12/2005'",
      valid: false,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '21/12/2000' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Date at 'field1.field2' is not after '21/12/2005'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '22/12/2005' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
