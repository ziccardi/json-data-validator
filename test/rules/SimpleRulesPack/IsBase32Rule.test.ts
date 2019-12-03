import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isBase32', () => {
  const rule = RuleFactory.create({
    type: 'isBase32',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'ABCDEFGh' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not BASE32'",
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'ABCDEFGHI1' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not BASE32'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'JBSWY3DPEB3W64TMMQ======' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
