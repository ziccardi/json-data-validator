import {RuleConfig} from '../../config/RuleConfig';

export interface RequiredRuleBuilder {
  withPath: (path: string) => RequiredRuleBuilder;
  withErrorMessage: (errorMessage: string) => RequiredRuleBuilder;
  build: () => RuleConfig;
}

const createWithPath = (
  rule: RuleConfig
): ((path: string) => RequiredRuleBuilder) => {
  const withPath = (path: string) => {
    rule.path = path;
    return {
      withPath: createWithPath(rule),
      withErrorMessage: createWithErrorMessage(rule),
      build: createBuild(rule),
    };
  };

  return withPath;
};

const createWithErrorMessage = (
  rule: RuleConfig
): ((path: string) => RequiredRuleBuilder) => {
  const withErrorMessage = (errorMessage: string) => {
    rule.errorMessage = errorMessage;
    return {
      withPath: createWithPath(rule),
      withErrorMessage: createWithErrorMessage(rule),
      build: createBuild(rule),
    };
  };

  return withErrorMessage;
};

const createBuild = (rule: RuleConfig): (() => RuleConfig) => () => rule;

export const builder = {
  required: {
    withPath: createWithPath({type: 'REQUIRED'}),
    withErrorMessage: createWithErrorMessage({type: 'REQUIRED'}),
    build: createBuild({type: 'REQUIRED'}),
  },
};
