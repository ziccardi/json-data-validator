import { Validator, ValidatorConfiguration } from '../src/Validator';
import { NAME as FIELD_VALUE_CONSTRAINT } from '../src/constraints/FieldValueConstraint';
import { NAME as REQUIRED_RULE } from '../src/rules/RequiredRule';
import { NAME as MAXLENGTH_RULE } from '../src/rules/MaxLengthRule';
import { DataInterface } from '../src/DataInterface';

const configuration: ValidatorConfiguration = {
  'key1.key11.key22': [
    {
      constraints: [
        {
          type: FIELD_VALUE_CONSTRAINT,
          path: 'key1.key11.key21',
          value: 'test',
        },
      ],
      rules: [
        {
          type: REQUIRED_RULE,
        },
        {
          type: MAXLENGTH_RULE,
          maxlength: 7,
        },
      ],
    },
    {
      constraints: [
        {
          type: FIELD_VALUE_CONSTRAINT,
          path: 'key1.key11.key21',
          value: 'test2',
        },
      ],
      rules: [
        {
          type: REQUIRED_RULE,
        },
        {
          type: MAXLENGTH_RULE,
          maxlength: 2,
        },
      ],
    },
  ],
};

describe('Validator', () => {
  it('Should success with length 7 - Key: test', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test',
          key22: '1234567',
        },
      },
    };

    const validator: Validator = new Validator(configuration);
    expect(validator.validate(data)).toEqual({ valid: true });
  });

  it('Should fail with length 7 - Key: test2', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test2',
          key22: '1234567',
        },
      },
    };

    const validator: Validator = new Validator(configuration);
    expect(validator.validate(data)).toEqual({
      valid: false,
      message: "Maximum length exceeded for 'key1.key11.key22'",
    });
  });
});
