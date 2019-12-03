import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isBase64', () => {
  const rule = RuleFactory.create({
    type: 'isBase64',
  });

  it('Should fails', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'ABCDEFGHILMNOPQ' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not BASE64'",
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'SGVsbG8gV29ybGQ=' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
