import { Data } from '../../src';
import { Validator, ValidatorConfig } from '../../src';

const validatorConfig: ValidatorConfig = {
  ruleSets: [
    {
      fields: {
        op: [
          {
            type: 'COMPOSITE',
            algorithm: 'any',
            subRules: [
              {
                type: 'EXACT_VALUE',
                value: 'mul',
              },
              {
                type: 'EXACT_VALUE',
                value: 'add',
              },
            ],
          },
        ],
      },
    },
    {
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'add',
        },
      ],
      fields: {
        result: [
          {
            type: 'EXACT_VALUE',
            value: 11,
          },
        ],
      },
    },
    {
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'mul',
        },
      ],
      fields: {
        result: [
          {
            type: 'EXACT_VALUE',
            value: 30,
          },
        ],
      },
    },
  ],
};

describe('CompositeRule', () => {
  it('Should success - add', () => {
    const data: Data = {
      num1: 5,
      num2: 6,
      op: 'add',
      result: 11,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      valid: true,
    });
  });

  it('Should success - mul', () => {
    const data: Data = {
      num1: 5,
      num2: 6,
      op: 'mul',
      result: 30,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      valid: true,
    });
  });

  it('Should fail - power', () => {
    const data: Data = {
      num1: 5,
      num2: 6,
      op: 'power',
      result: 11,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      field: 'op',
      message: 'op is not valid',
      valid: false,
    });
  });
});
