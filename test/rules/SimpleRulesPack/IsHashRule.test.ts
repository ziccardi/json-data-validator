import { RuleFactory } from '../../../src/rules/RuleFactory';

describe('isHash', () => {
  const SHA1 = '0a4d55a8d778e5022fab701977c5d840bbc486d0';
  const SHA256 =
    'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
  const SHA512 =
    '2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b';
  const MD5 = 'b10a8db164e0754105b7a99be72e3fe5';

  it('DEFAULT - SHA1', () => {
    const rule = RuleFactory.create({
      type: 'isHash',
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA1 },
      })
    ).toEqual({
      valid: true,
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA256 },
      })
    ).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid sha1 hash",
      valid: false,
    });
  });

  it('SHA1', () => {
    const rule = RuleFactory.create({
      type: 'isHash',
      algorithm: 'sha1',
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA1 },
      })
    ).toEqual({
      valid: true,
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA256 },
      })
    ).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid sha1 hash",
      valid: false,
    });
  });

  it('SHA256', () => {
    const rule = RuleFactory.create({
      type: 'isHash',
      algorithm: 'sha256',
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA1 },
      })
    ).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid sha256 hash",
      valid: false,
    });
  });

  it('MD5', () => {
    const rule = RuleFactory.create({
      type: 'isHash',
      algorithm: 'md5',
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: MD5 },
      })
    ).toEqual({
      valid: true,
    });

    expect(
      rule.evaluate('field1.field2', {
        field1: { field2: SHA1 },
      })
    ).toEqual({
      field: 'field1.field2',
      message: "Value 'field1.field2' is not a valid md5 hash",
      valid: false,
    });
  });
});
