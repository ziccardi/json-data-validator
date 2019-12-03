import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('contains', () => {
  const rule = RuleFactory.create({
    type: 'contains',
    seed: 'abcdef',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', { field1: { field2: 'test' } });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' does not contains 'abcdef'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'testabcdefaaaaaa' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
