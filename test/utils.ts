import { Rule } from '../src/Rule';
import { Data } from '../src';
import { set } from 'lodash';

interface TestData {
  path: string;
  valid: string[];
  invalid: string[];
}

export function test(rule: Rule, { path, valid, invalid }: TestData) {
  valid.forEach(value => {
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

  invalid.forEach(value => {
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
