import { Validator, ValidatorConfiguration } from '../src';
import { NAME as FIELD_VALUE_CONSTRAINT } from '../src/constraints/FieldValueConstraint';
import { NAME as REQUIRED_RULE } from '../src/rules/RequiredRule';
import { NAME as MAXLENGTH_RULE } from '../src/rules/MaxLengthRule';
import { Data } from '../src';

const configuration: ValidatorConfiguration = {
  ruleSets: [
    {
      constraints: [
        {
          type: FIELD_VALUE_CONSTRAINT,
          path: 'key1.key11.key21',
          value: 'test',
        },
      ],
      fields: {
        'key1.key11.key22': [
          {
            type: REQUIRED_RULE,
          },
          {
            type: MAXLENGTH_RULE,
            maxlength: 7,
          },
        ],
      },
    },
    {
      constraints: [
        {
          type: FIELD_VALUE_CONSTRAINT,
          path: 'key1.key11.key21',
          value: 'test2',
        },
      ],
      fields: {
        'key1.key11.key22': [
          {
            type: REQUIRED_RULE,
          },
          {
            type: MAXLENGTH_RULE,
            maxlength: 2,
          },
        ],
      },
    },
  ],
};

describe('Validator', () => {
  it('Should success with length 7 - Key: test', () => {
    const data: Data = {
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
    const data: Data = {
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
      field: 'key1.key11.key22',
      message: "Maximum length exceeded for 'key1.key11.key22'",
    });
  });
});
