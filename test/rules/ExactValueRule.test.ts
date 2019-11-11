import { DataInterface } from '../../src/DataInterface';
import { Validator, ValidatorConfiguration } from '../../src/Validator';

const validatorConfig: ValidatorConfiguration = {
  result: [
    {
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'add',
        },
      ],
      rules: [
        {
          type: 'EXACT_VALUE',
          value: 11,
        },
      ],
    },
    {
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'mul',
        },
      ],
      rules: [
        {
          type: 'EXACT_VALUE',
          value: 30,
        },
      ],
    },
  ],
};

describe('ExactValueRule', () => {
  it('Should success - add', () => {
    const data: DataInterface = {
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
    const data: DataInterface = {
      num1: 5,
      num2: 6,
      op: 'mul',
      result: 30,
    };

    expect(new Validator(validatorConfig).validate(data)).toEqual({
      valid: true,
    });
  });
});
