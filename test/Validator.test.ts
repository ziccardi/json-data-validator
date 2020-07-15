import {Validator, ValidatorConfig} from '../src';
import {NAME as FIELD_VALUE_CONSTRAINT} from '../src/constraints/FieldValueConstraint';
import {NAME as REQUIRED_RULE} from '../src/rules/RequiredRule';
import {NAME as MAXLENGTH_RULE} from '../src/rules/MaxLengthRule';
import {Data} from '../src';

const configuration: ValidatorConfig = {
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
    {
      constraints: [
        {
          type: FIELD_VALUE_CONSTRAINT,
          path: 'key1.key11.key21',
          value: 'MULTI',
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
        key2: [
          {
            type: 'VALID_URL',
          },
        ],
        key3: [
          {
            type: 'isHexadecimal',
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
    expect(validator.validate(data)).toEqual({valid: true});
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

describe('Validator - MULTI', () => {
  it('Should fail key1.key11.key22, key2 and key3', () => {
    const data: Data = {
      key1: {
        key11: {
          key21: 'MULTI',
          key22: '1234567',
        },
      },
      key2: 'ABCDE',
      key3: 'PPPPP',
    };

    const validator: Validator = new Validator(configuration);

    const res = validator.validate(data, true);
    expect(res.details!.length).toEqual(3);
    expect(res).toEqual({
      details: [
        {
          field: 'key1.key11.key22',
          message: "Maximum length exceeded for 'key1.key11.key22'",
          valid: false,
        },
        {
          field: 'key2',
          message: 'Value key2 is not a valid URL string',
          valid: false,
        },
        {
          field: 'key3',
          message: "Value 'key3' is not a valid hexadecimal string",
          valid: false,
        },
      ],
      valid: false,
    });
  });

  it('Should fail key2 and key3', () => {
    const data: Data = {
      key1: {
        key11: {
          key21: 'MULTI',
          key22: '12',
        },
      },
      key2: 'ABCDE',
      key3: 'PPPPP',
    };

    const validator: Validator = new Validator(configuration);

    const res = validator.validate(data, true);
    expect(res.details!.length).toEqual(2);
    expect(res).toEqual({
      details: [
        {
          field: 'key2',
          message: 'Value key2 is not a valid URL string',
          valid: false,
        },
        {
          field: 'key3',
          message: "Value 'key3' is not a valid hexadecimal string",
          valid: false,
        },
      ],
      valid: false,
    });
  });
});
