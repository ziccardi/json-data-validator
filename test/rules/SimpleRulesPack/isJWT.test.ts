import { RuleFactory } from '../../../src/rules/RuleFactory';
import { test } from '../../utils';

describe('isJWT', () => {
  const rule = RuleFactory.create({
    type: 'isJWT',
  });

  it('Should evaluate if string is a JWT string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      ],
      invalid: [
        'QXQgdmVybyBlb3MgZXQgYWNjdXNhbXVzIGV0IGl1c3RvIG9kaW8gZGlnbmlzc2ltb3MgZHVjaW11cyBxdWkgYmxhbmRpdGlpcyBwcmFlc2VudGl1bSB2b2x1cHRhdHVtIGRlbGVuaXRpIGF0cXVlCg==',
      ],
    });
  });
});
