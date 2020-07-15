import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isBase32', () => {
  const rule = RuleFactory.create({
    type: 'isBase32',
  });

  it('Should evaluate if string is a Base32 string', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['JBSWY3DPEB3W64TMMQ======'],
      invalid: ['ABCDEFGh', 'ABCDEFGHI1'],
    });
  });
});
