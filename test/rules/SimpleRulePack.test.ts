import { RuleFactory } from '../../src/rules/RuleFactory';

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

describe( 'isAlpha', () => {
  const rule = RuleFactory.create({
    type: 'isAlpha',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcde fghi 1' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alpha'",
      valid: false,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcde fghi-*/' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alpha'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});

describe( 'isAlphaNumeric', () => {
  const rule = RuleFactory.create({
    type: 'isAlphaNumeric',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi1' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi-*/' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not alphanumeric'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});

describe( 'isAscii', () => {
  const rule = RuleFactory.create({
    type: 'isAscii',
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi 1=+-[]{}$%^!@><,./' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: 'abcdefghi-*/\u1000' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not ascii'",
      valid: false,
    });
  });
});

describe( 'isBase32', () => {
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
      message: "Value 'field1.field2' is not BASE32'"
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

describe( 'isBase64', () => {
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
      message: "Value 'field1.field2' is not BASE64'"
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

describe('isBefore', () => {
  const rule = RuleFactory.create({
    type: 'isBefore',
    date: '21/12/2005',
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '15/12/2020' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Date at 'field1.field2' is not before '21/12/2005'",
      valid: false,
    });
  });

  it('Should fail', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '21/12/2005' },
    });
    expect(res).toEqual({
      field: 'field1.field2',
      message: "Date at 'field1.field2' is not before '21/12/2005'",
      valid: false,
    });
  });

  it('Should succeed', () => {
    const res = rule.evaluate('field1.field2', {
      field1: { field2: '20/12/2005' },
    });
    expect(res).toEqual({
      valid: true,
    });
  });
});