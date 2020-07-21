import {RuleConfig} from '../../config/RuleConfig';

export interface IsInBuilderInterface {
  withValues(...values: string[]): IsInBuilderFinalInterface;
  withValue(value: string): IsInBuilderFinalInterface;
}

export interface IsInBuilderFinalInterface {
  withValues(...values: string[]): IsInBuilderFinalInterface;
  withValue(value: string): IsInBuilderFinalInterface;
  build(errorMessage?: string): RuleConfig;
}

function createWithValueFunction(
  rule: RuleConfig
): (value: string) => IsInBuilderFinalInterface {
  const withValue = (value: string): IsInBuilderFinalInterface => {
    (rule.values as string[]).push(value);

    return {
      withValues: createWithValuesFunction(rule),
      withValue: createWithValueFunction(rule),
      build: createBuildFunction(rule),
    };
  };
  return withValue;
}

function createWithValuesFunction(
  rule: RuleConfig
): (value: string) => IsInBuilderFinalInterface {
  const withValues = (...values: string[]): IsInBuilderFinalInterface => {
    (rule.values as string[]) = [...(rule.values as string[]), ...values];

    return {
      withValues: createWithValuesFunction(rule),
      withValue: createWithValueFunction(rule),
      build: createBuildFunction(rule),
    };
  };

  return withValues;
}

function createBuildFunction(
  rule: RuleConfig
): (errorMessage: string) => RuleConfig {
  const build = (errorMessage?: string) => {
    return {
      type: rule.type,
      values: (rule.values as string[]).join(),
      errorMessage,
    };
  };

  return build;
}

export const builder: IsInBuilderInterface = {
  withValues: (...values: string[]): IsInBuilderFinalInterface => {
    const rule: RuleConfig = {
      type: 'isIn',
      values: values || [],
    };

    return {
      withValues: createWithValuesFunction(rule),
      withValue: createWithValueFunction(rule),
      build: createBuildFunction(rule),
    };
  },
  withValue: (value: string): IsInBuilderFinalInterface => {
    const rule: RuleConfig = {
      type: 'isIn',
      values: [value],
    };

    return {
      withValues: createWithValuesFunction(rule),
      withValue: createWithValueFunction(rule),
      build: createBuildFunction(rule),
    };
  },
};
