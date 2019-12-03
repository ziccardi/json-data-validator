import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isFQDN', () => {
  const rule = RuleFactory.create({
    type: 'isFQDN',
  });

  it('Should succeed: mickey.mouse.it', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mickey.mouse.it' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should succeed: mickey.mouse', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mickey.mouse' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail: mickey..mouse', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mickey..mouse' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid FQDN",
      valid: false,
    });
  });

  it('Should fail: mouse', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'mouse' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid FQDN",
      valid: false,
    });
  });

  it('Should fail: .mickey.mouse', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '.mickey.mouse' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid FQDN",
      valid: false,
    });
  });
});
