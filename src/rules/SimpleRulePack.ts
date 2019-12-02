import HashAlgorithm = ValidatorJS.HashAlgorithm;
import { RuleConfig } from '../config/RuleConfig';
import { GenericValidator } from './GenericValidator';

import * as moment from 'moment';

const validator = require('validator');

const contains = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.contains(value, config.seed!),
    `Value '%s' does not contains '${config.seed}'`
  );

const isAfter = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => {
      const date = moment(value, config.format as string || 'DD/MM/YYYY');
      const referenceDate =  config.date ? moment(config.date as string, config.format as string || 'DD/MM/YYYY') : moment();
      return date.isAfter(referenceDate);
    },
    `Date at '%s' is not after '${config.date || new Date()}'`
  );

const isAlpha = (config: RuleConfig) =>
  new GenericValidator(
    config,
    // tslint:disable-next-line:no-any
    (value: string) => validator.isAlpha(value, config.locale as any),
    `Value '%s' is not alpha'`
  );

const isAlphaNumeric = (config: RuleConfig) =>
  new GenericValidator(
    config,
    // tslint:disable-next-line:no-any
    (value: string) => validator.isAlphanumeric(value, config.locale as any),
    `Value '%s' is not alphanumeric'`
  );

const isAscii = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isAscii(value),
    `Value '%s' is not ascii'`
  );

const isBase32 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isBase32(value),
    `Value '%s' is not BASE32'`
  );

const isBase64 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isBase64(value),
    `Value '%s' is not BASE64'`
  );

const isBefore = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => {
      const date = moment(value, config.format as string || 'DD/MM/YYYY');
      const referenceDate =  config.date ? moment(config.date as string, config.format as string || 'DD/MM/YYYY') : moment();
      return date.isBefore(referenceDate);
    },
    `Date at '%s' is not before '${config.date || new Date()}'`
  );


const isBIC = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isBIC(value),
    `Value '%s' is not a valid BIC or SWIFT code`
  );

const isBoolean = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isBoolean(value),
    `Value '%s' is not a boolean`
  );

const isCreditCard = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isCreditCard(value),
    `Value '%s' is not a valid credit card number`
  );

const isDataURI = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isDataURI(value),
    `Value '%s' is not a valid credit data URI`
  );

const isDecimal = (config: RuleConfig) =>
  new GenericValidator(
    config,
    // tslint:disable-next-line:no-any
    (value: string) => validator.isDecimal(value, config.locale as any),
    `Value '%s' is not a decimal number`
  );

const isDivisibleBy = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isDivisibleBy(value, config.number as number),
    `Value '%s' is not divisible by ${config.number}`
  );

const isEmail = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isEmail(value),
    `Value '%s' is not a valid email address`
  );

const isFQDN = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isFQDN(value),
    `Value '%s' is not a valid FQDN`
  );

const isHash = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) =>
      validator.isHash(value, config.algorithm! as HashAlgorithm),
    `Value '%s' is not a valid ${config.algorithm} hash`
  );

const isHexadecimal = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isHexadecimal(value),
    `Value '%s' is not a valid hexadecimal string`
  );

const isHexColor = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isHexColor(value),
    `Value '%s' is not a valid hex color string`
  );

const isIn = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isIn(value, config.values as string[]),
    `Value '%s' is not in ${config.values}`
  );

const isInt = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isInt(value),
    `Value '%s' is not an int`
  );

const isIP = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isIP(value, config.version as number),
    `Value '%s' is not a valid IP address`
  );

const isIPRange = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isIPRange(value),
    `Value '%s' is not a valid IP Range`
  );

const isISBN = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISBN(value, config.version as number),
    `Value '%s' is not a valid ISBN`
  );

const isISIN = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISIN(value),
    `Value '%s' is not a valid ISIN`
  );

const isISO31661Alpha2 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISO31661Alpha2(value),
    `Value '%s' is not a valid ISO 3166-1 alpha-2 string`
  );

const isISO31661Alpha3 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISO31661Alpha3(value),
    `Value '%s' is not a valid ISO 3166-1 alpha-3 string`
  );

const isISO8601 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISO8601(value),
    `Value '%s' is not a valid ISO 8601 string`
  );

const isISSN = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISSN(value),
    `Value '%s' is not a valid ISSN`
  );

const isISRC = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isISRC(value),
    `Value '%s' is not a valid ISRC`
  );

const isRFC3339 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isRFC3339(value),
    `Value '%s' is not a valid RFC 3339 date`
  );

const isJSON = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isJSON(value),
    `Value '%s' is not a valid JSON string`
  );

const isJWT = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isJWT(value),
    `Value '%s' is not a valid JWT token string`
  );

const isLatLong = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isLatLong(value),
    `Value '%s' is not a valid latitude-longitude string`
  );

const isMACAddress = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isMACAddress(value),
    `Value '%s' is not a valid MAC Address`
  );

const isMagnetURI = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isMagnetURI(value),
    `Value '%s' is not a valid magnet uri`
  );

const isMD5 = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isMD5(value),
    `Value '%s' is not a valid MD5`
  );

const isMimeType = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isMimeType(value),
    `Value '%s' is not a valid mime type`
  );

const isMongoId = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isMongoId(value),
    `Value '%s' is not a valid mongo object id`
  );

const isNumeric = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isNumeric(value),
    `Value '%s' is not a valid numeric string`
  );

const isOctal = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isOctal(value),
    `Value '%s' is not a valid octal string`
  );

const isPort = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.isPort(value),
    `Value '%s' is not a valid port number`
  );

const matches = (config: RuleConfig) =>
  new GenericValidator(
    config,
    (value: string) => validator.matches(value, config.pattern! as string),
    `Value '%s' does not match '${config.pattern}'`
  );

export const PACK = {
  contains,
  isAfter,
  isAlpha,
  isAlphaNumeric,
  isAscii,
  isBase32,
  isBase64,
  isBefore,
  isBIC,
  isBoolean,
  isCreditCard,
  isDataURI,
  isDecimal,
  isDivisibleBy,
  isEmail,
  isFQDN,
  isHash,
  isHexadecimal,
  isHexColor,
  isIn,
  isInt,
  isIP,
  isIPRange,
  isISBN,
  isISIN,
  isISO8601,
  isISO31661Alpha2,
  isISO31661Alpha3,
  isISRC,
  isISSN,
  isJSON,
  isJWT,
  isLatLong,
  isMACAddress,
  isMagnetURI,
  isMD5,
  isMimeType,
  isMongoId,
  isNumeric,
  isOctal,
  isPort,
  isRFC3339,
  matches,
};
