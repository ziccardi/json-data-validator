import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isMagnetURI', () => {
  const rule = RuleFactory.create({
    type: 'isMagnetURI',
  });

  it('Should validate magnet URI', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        'magnet:?xt=urn:btih:06E2A9683BF4DA92C73A661AC56F0ECC9C63C5B4&dn=helloword2000&tr=udp://helloworld:1337/announce',
      ],
      invalid: [
        ':?xt=urn:btih:06E2A9683BF4DA92C73A661AC56F0ECC9C63C5B4&dn=helloword2000&tr=udp://helloworld:1337/announce',
      ],
    });
  });
});
