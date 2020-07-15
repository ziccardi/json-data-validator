import {Data} from '../../../src';
import {RuleConfig} from '../../../src/config/RuleConfig';
import {RuleFactory} from '../../../src/rules/RuleFactory';

const data: Data = {
  uuid1: 'c90734df-71f5-435a-9380-0dc05984c988',
  uuid2: '9682930d-1057-49f6-8488-634e8d7ccbc3',
  baduuid: 'asdf',
};

describe('isUUID', () => {
  const config: RuleConfig = {
    type: 'isUUID',
  };

  it('Should succeed - uuid1', () => {
    expect(RuleFactory.create(config).evaluate('uuid1', data)).toEqual({
      valid: true,
    });
  });

  it('Should succeed - uuid2', () => {
    expect(RuleFactory.create(config).evaluate('uuid2', data)).toEqual({
      valid: true,
    });
  });

  it('Should fail - baduuid', () => {
    expect(RuleFactory.create(config).evaluate('baduuid', data)).toEqual({
      valid: false,
      message: "Value 'baduuid' is not a valid UUID",
      field: 'baduuid',
    });
  });
});
