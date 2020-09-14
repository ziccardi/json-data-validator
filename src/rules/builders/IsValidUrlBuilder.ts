import {RuleConfig} from '../../config/RuleConfig';
import * as ValidUrlRule from '../ValidUrlRule';

export interface IsValidUrlBuilder {
  requireTld(require: boolean): IsValidUrlBuilder;
  requireHost(require: boolean): IsValidUrlBuilder;
  requireProtocol(require: boolean): IsValidUrlBuilder;
  build: () => RuleConfig;
}

export const builder = {
  isValidUrl: () => {
    const rule: RuleConfig = {type: ValidUrlRule.NAME};

    const returnValue: IsValidUrlBuilder = {
      requireTld: (required = true) => {
        rule.require_tld = `${required}`;
        return returnValue;
      },
      requireHost: (required = true) => {
        rule.require_host = `${required}`;
        return returnValue;
      },
      requireProtocol: (required = false) => {
        rule.require_protocol = `${required}`;
        return returnValue;
      },
      build: () => rule,
    };

    return returnValue;
  },
};
