import {RuleFactory} from '../../../src/rules/RuleFactory';
import {test} from '../../utils';

describe('isMimeType', () => {
  const rule = RuleFactory.create({
    type: 'isMimeType',
  });

  it('Should evaluate if string is a valid mime type', () => {
    test(rule, {
      path: 'field1.field2',
      valid: [
        'application/octet-stream',
        'text/plain',
        'audio/wave',
        'multipart/form-data',
      ],
      invalid: ['abcde', 'mickey/mouse'],
    });
  });
});
