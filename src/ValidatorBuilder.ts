import {ConstraintConfig} from './config/ConstraintConfig';
import {RuleConfig} from './config/RuleConfig';
import {RuleSetConfig} from './config/RuleSetConfig';
import {Validator} from './Validator';

interface RuleConfigInterface {
  withConstraint: (constraintConfig: ConstraintConfig) => RuleConfigInterface;
  withFieldValueConstraint: (
    path: string,
    value: string | number,
    errorMessage?: string
  ) => RuleConfigInterface;
  withField: (fieldName: string) => RuleConfiguratorInterface;
}

interface RuleConfiguratorInterface {
  withConstraint: (constraintConfig: ConstraintConfig) => RuleConfigInterface;
  withFieldValueConstraint: (
    path: string,
    value: string | number,
    errorMessage?: string
  ) => RuleConfigInterface;
  withField: (fieldName: string) => RuleConfiguratorInterface;
  newRule: () => RuleConfigInterface;
  validate: (ruleConfig: RuleConfig) => RuleConfiguratorInterface;
  build: () => Validator;
}

export const validatorBuilder = (): {newRule: () => RuleConfigInterface} => {
  const ruleSets: RuleSetConfig[] = [];
  let currentRule: RuleSetConfig | undefined = undefined;

  const withField = (fieldName: string): RuleConfiguratorInterface => {
    currentRule!.fields[fieldName] = [];
    return fieldConfig(currentRule!.fields[fieldName]);
  };

  const withFieldValueConstraint = (
    path: string,
    value: string | number,
    errorMessage?: string
  ): RuleConfigInterface => {
    currentRule!.constraints = currentRule!.constraints || [];
    currentRule!.constraints.push({
      type: 'FIELD_VALUE',
      path,
      value,
      errorMessage,
    });
    return ruleConfig;
  };

  const withConstraint = (
    constraintConfig: ConstraintConfig
  ): RuleConfigInterface => {
    currentRule!.constraints = currentRule!.constraints || [];
    currentRule!.constraints.push(constraintConfig);
    return ruleConfig;
  };

  const fieldConfig = (rules: RuleConfig[]): RuleConfiguratorInterface => {
    const ruleConfigurator: RuleConfiguratorInterface = {
      withConstraint,
      withFieldValueConstraint,
      withField,
      newRule,
      validate(ruleConfig: RuleConfig): RuleConfiguratorInterface {
        rules.push(ruleConfig);
        return ruleConfigurator;
      },
      build: () => {
        return new Validator({ruleSets});
      },
    };
    return ruleConfigurator;
  };

  const ruleConfig: RuleConfigInterface = {
    withConstraint,
    withFieldValueConstraint,
    withField,
  };

  const newRule = (): RuleConfigInterface => {
    currentRule = {fields: {}};
    ruleSets.push(currentRule);
    return ruleConfig;
  };

  return {
    newRule,
  };
};
