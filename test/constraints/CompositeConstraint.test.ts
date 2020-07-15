import {
  CompositeConstraint,
  NAME as COMPOSITE_CONSTRAINT,
} from '../../src/constraints/CompositeConstraint';
import {Data} from '../../src';
import {ConstraintConfig} from '../../src/config/ConstraintConfig';
import {NAME as FIELD_VALUE} from '../../src/constraints/FieldValueConstraint';

const data: Data = {
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

describe('CompositeConstraint', () => {
  it('ALL - should return false - nested.key2', () => {
    const config: ConstraintConfig = {
      type: COMPOSITE_CONSTRAINT,
      subRules: [
        {
          type: FIELD_VALUE,
          path: 'nested.key1',
          value: 'value1',
        },
        {
          type: FIELD_VALUE,
          path: 'nested.key2',
          value: 'value1',
        },
      ],
    };

    const constraint = new CompositeConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });

  it('ALL - should return false - nested.key1', () => {
    const config: ConstraintConfig = {
      type: COMPOSITE_CONSTRAINT,
      subRules: [
        {
          type: FIELD_VALUE,
          path: 'nested.key1',
          value: 'value2',
        },
        {
          type: FIELD_VALUE,
          path: 'nested.key2',
          value: 'value2',
        },
      ],
    };

    const constraint = new CompositeConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });

  it('ALL - should return true', () => {
    const config: ConstraintConfig = {
      type: COMPOSITE_CONSTRAINT,
      subRules: [
        {
          type: FIELD_VALUE,
          path: 'nested.key1',
          value: 'value1',
        },
        {
          type: FIELD_VALUE,
          path: 'nested.key2',
          value: 'value2',
        },
      ],
    };

    const constraint = new CompositeConstraint(config);
    expect(constraint.isRespected(data)).toBe(true);
  });

  it('ANY - should return true - nested.key2', () => {
    const config: ConstraintConfig = {
      type: COMPOSITE_CONSTRAINT,
      algorithm: 'any',
      subRules: [
        {
          type: FIELD_VALUE,
          path: 'nested.key1',
          value: 'value2',
        },
        {
          type: FIELD_VALUE,
          path: 'nested.key2',
          value: 'value2',
        },
      ],
    };

    const constraint = new CompositeConstraint(config);
    expect(constraint.isRespected(data)).toBe(true);
  });

  it('ANY - should return false', () => {
    const config: ConstraintConfig = {
      type: COMPOSITE_CONSTRAINT,
      algorithm: 'any',
      subRules: [
        {
          type: FIELD_VALUE,
          path: 'nested.key1',
          value: 'value3',
        },
        {
          type: FIELD_VALUE,
          path: 'nested.key2',
          value: 'value3',
        },
      ],
    };

    const constraint = new CompositeConstraint(config);
    expect(constraint.isRespected(data)).toBe(false);
  });
});
