import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('contains', () => {
  const rule = RuleFactory.create({
    type: 'contains',
    seed: 'abcdef',
  });

  it('Should evaluate if string in contained or not', () => {
    test(rule, {
      path: 'field1.field2',
      valid: ['testabcdefaaaaaa'],
      invalid: ['test'],
    });
  });
});
