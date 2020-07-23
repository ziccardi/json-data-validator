import {Rule} from '../src/Rule';
import {Data, Validator} from '../src';
import {set} from 'lodash';

interface TestData {
  path: string;
  valid: string[] | [undefined];
  invalid: string[] | [undefined];
}

export function test(rule: Rule, {path, valid, invalid}: TestData) {
  valid.forEach((value: unknown) => {
    const data: Data = {};
    set(data, path, value);
    const res = rule.evaluate(path, data);
    if (!res.valid) {
      throw Error(
        `${rule.type()} failed but should have passed: ${
          res.message
        } (value: '${value}')`
      );
    }
  });

  invalid.forEach((value: unknown) => {
    const data: Data = {};
    set(data, path, value);
    const res = rule.evaluate(path, data);
    if (res.valid) {
      throw Error(
        `${rule.type()} passed but should have failed (value: '${value}')`
      );
    }
  });
}

interface ValidatorTestData {
  valid: Data[];
  invalid: Data[];
}

export function testValidator(
  validator: Validator,
  {valid, invalid}: ValidatorTestData
) {
  valid.forEach(value => {
    const res = validator.validate(value);
    if (!res.valid) {
      throw Error(
        `Failed but should have passed: ${
          res.message
        } (value: '${JSON.stringify(value)}')`
      );
    }
  });

  invalid.forEach((value: Data) => {
    const res = validator.validate(value);
    if (res.valid) {
      throw Error(
        `Passed but should have failed (value: '${JSON.stringify(value)}')`
      );
    }
  });
}
