import { FieldValueConstraint } from '../../src/constraints/FieldValueConstraint';

const data = {
  variant: 'android',
  appName: 'test123',
  serverKey: 'sdfsdfds',
  nested: {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
    nested: {
      key11: 'value11',
      key22: 'value22',
      key33: 'value33',
    },
  },
};

describe('FieldValueConstraint', () => {
  it('should return false - key', () => {
    const config = {
      name: 'variant',
      value: 'ios',
    };

    const constraint = new FieldValueConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });
  it('should return false - path', () => {
    const config = {
      name: 'nested.key1',
      value: 'value2',
    };

    const constraint = new FieldValueConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });
  it('should return true - key', () => {
    const config = {
      name: 'variant',
      value: 'android',
    };

    const constraint = new FieldValueConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });
  it('should return true - path', () => {
    const config = {
      name: 'nested.key1',
      value: 'value1',
    };

    const constraint = new FieldValueConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });
});
