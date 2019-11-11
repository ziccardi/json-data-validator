import { RulesetConfig, RuleSetFactory } from '../src/RuleSetFactory';
import { NAME as FIELD_VALUE_CONSTRAINT } from '../src/constraints/FieldValueConstraint';
import { NAME as REQUIRED_RULE } from '../src/rules/RequiredRule';
import { NAME as MAXLENGTH_RULE } from '../src/rules/MaxLengthRule';
import { DataInterface } from '../src/DataInterface';
import { RuleSet } from '../src/RuleSet';

const rulesetConfig: RulesetConfig = {
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
};

describe('RuleSet', () => {
  it('Should return success', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test',
          key22: 'testval',
        },
      },
    };

    const rs: RuleSet = RuleSetFactory.create(rulesetConfig);

    expect(rs.shouldEvaluate(data)).toBe(true);
    expect(rs.evaluate('key1.key11.key22', data)).toEqual({ valid: true });
  });

  it('Should not evaluate', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test1',
          key22: 'testval',
        },
      },
    };

    const rs: RuleSet = RuleSetFactory.create(rulesetConfig);

    expect(rs.shouldEvaluate(data)).toBe(false);
  });

  it('Should return required failed', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test',
          key22: '',
        },
      },
    };

    const rs: RuleSet = RuleSetFactory.create(rulesetConfig);
    expect(rs.shouldEvaluate(data)).toBe(true);
    expect(rs.evaluate('key1.key11.key22', data)).toEqual({
      message: "Value 'key1.key11.key22' is required",
      valid: false,
    });
  });

  it('Should return value too long', () => {
    const data: DataInterface = {
      key1: {
        key11: {
          key21: 'test',
          key22: '0123456789',
        },
      },
    };

    const rs: RuleSet = RuleSetFactory.create(rulesetConfig);
    expect(rs.shouldEvaluate(data)).toBe(true);
    expect(rs.evaluate('key1.key11.key22', data)).toEqual({
      message: "Maximum length exceeded for 'key1.key11.key22'",
      valid: false,
    });
  });
});
