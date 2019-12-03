import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isDataURI', () => {
  const rule = RuleFactory.create({
    type: 'isDataURI',
  });

  it('Should succeed', () => {
    let res = rule.evaluate('field1.field2', {
      field1: { field2: 'data:,Hello%2C%20World!' },
    });
    expect(res).toEqual({
      valid: true,
    });
    res = rule.evaluate('field1.field2', {
      field1: { field2: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});
