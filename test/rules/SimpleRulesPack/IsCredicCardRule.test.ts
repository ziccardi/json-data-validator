import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isCreditCard', () => {
  const rule = RuleFactory.create({
    type: 'isCreditCard',
  });

  it('Validate VISA', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '4648020324895174' }, // Generated with https://www.getcreditcardinfo.com/generatevisacreditcard.php
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Validate MASTERCARD', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '5583624778892266' }, // Generated with https://www.getcreditcardinfo.com/generatemastercreditcard.php
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Validate AMEX', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '377024137950510' }, // Generated with https://www.getcreditcardinfo.com/generateamericancreditcard.php
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Validate DINERS', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '36405736447607' }, // Generated with https://cardgenerator.io/diners-club-credit-card-generator/
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Validate INVALID CARD', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '36405736887607' }, // Generated with https://cardgenerator.io/diners-club-credit-card-generator/
    });
    expect(res).toEqual({
      field: 'field1.field2',
      valid: false,
      message: "Value 'field1.field2' is not a valid credit card number",
    });
  });
});
