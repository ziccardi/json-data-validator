import {RuleConfig} from '../config/RuleConfig';
import {GenericValidator} from './GenericValidator';
import {Data} from '../Data';
import {get} from 'lodash';

export const rule = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string, config: RuleConfig, data: Data) => {
      const isEmpty = (val: string): boolean => !val || val.length === 0;

      const parentValue = get(data, config.parent as string) as string;
      return isEmpty(parentValue) || !isEmpty(value);
    },
    `'%s' is required by ${config.parent}`,
    true
  );

export const NAME = 'REQUIREDBY';
