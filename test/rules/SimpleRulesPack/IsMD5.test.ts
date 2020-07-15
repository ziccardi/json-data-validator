import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isMD5', () => {
  const SHA1 = '0a4d55a8d778e5022fab701977c5d840bbc486d0';
  const SHA256 =
    'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
  const SHA512 =
    '2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b';
  const MD5 = 'b10a8db164e0754105b7a99be72e3fe5';

  const rule = RuleFactory.create({
    type: 'isMD5',
  });

  it('Should evaluate if string is a MD5 Hex string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [MD5],
      invalid: [SHA1, SHA256, SHA512, 'Hello World'],
    });
  });
});
