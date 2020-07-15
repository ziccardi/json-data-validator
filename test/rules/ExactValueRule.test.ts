import {Data} from '../../src';
import {Validator, ValidatorConfig} from '../../src';

const validatorConfig: ValidatorConfig = {
  ruleSets: [
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

describe('ExactValueRule', () => {
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

  it('Should fail - add', () => {
    const data: Data = {
      num1: 5,
      num2: 6,
      op: 'add',
      result: 30,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      valid: false,
      field: 'result',
      message: "Value of 'result' must be '11'",
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

  it('Should fail - mul', () => {
    const data: Data = {
      num1: 5,
      num2: 6,
      op: 'mul',
      result: 11,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      valid: false,
      field: 'result',
      message: "Value of 'result' must be '30'",
    });
  });
});
