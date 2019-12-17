<!--ts-->
   * [JSON-DATA-VALIDATOR Rules](#json-data-validator-rules)
      * [Composite Rule](#composite-rule)
      * [ExactValue Rule](#exactvalue-rule)
      * [MaxLength Rule](#maxlength-rule)
      * [Required Rule](#required-rule)
      * [Contains Rule](#contains-rule)
      * [isAfter Rule](#isafter-rule)
      * [isAlpha Rule](#isalpha-rule)
      * [isAlphaNumeric Rule](#isalphanumeric-rule)
      * [isAscii Rule](#isascii-rule)
      * [isBase32 Rule](#isbase32-rule)
      * [isBase64 Rule](#isbase64-rule)
      * [isBefore Rule](#isbefore-rule)
      * [isBIC Rule](#isbic-rule)
      * [isBoolean Rule](#isboolean-rule)
      * [isCreditCard Rule](#iscreditcard-rule)
      * [isDataURI Rule](#isdatauri-rule)
      * [isDecimal Rule](#isdecimal-rule)
      * [isDivisibleBy Rule](#isdivisibleby-rule)
      * [isEmail Rule](#isemail-rule)
      * [isFQDN Rule](#isfqdn-rule)
      * [isHASH Rule](#ishash-rule)
      * [isHexadecimal Rule](#ishexadecimal-rule)
      * [isHexColor Rule](#ishexcolor-rule)
      * [isIn Rule](#isin-rule)
      * [isInt Rule](#isint-rule)
      * [isIP Rule](#isip-rule)
      * [isIPRange Rule](#isiprange-rule)
      * [isISBN Rule](#isisbn-rule)
      * [isISIN Rule](#isisin-rule)
      * [isISO31661Alpha2 Rule](#isiso31661alpha2-rule)
      * [isISO31661Alpha3 Rule](#isiso31661alpha3-rule)
      * [isISO8601 Rule](#isiso8601-rule)
      * [isISSN Rule](#isissn-rule)
      * [isISRC Rule](#isisrc-rule)
      * [isRFC3339 Rule](#isrfc3339-rule)
      * [isJSON Rule](#isjson-rule)
      * [isJWT Rule](#isjwt-rule)
      * [isLatLong Rule](#islatlong-rule)
      * [isMACAddress Rule](#ismacaddress-rule)
      * [isMagnetURI Rule](#ismagneturi-rule)
      * [isMD5 Rule](#ismd5-rule)
      * [isMimeType Rule](#ismimetype-rule)
      * [isMongoId Rule](#ismongoid-rule)
      * [isNumeric Rule](#isnumeric-rule)
      * [isOctal Rule](#isoctal-rule)
      * [isPort Rule](#isport-rule)
      * [matches Rule](#matches-rule)
<!--te-->

# JSON-DATA-VALIDATOR Rules
There are 2 properties that are common to all the rules configurations:
  * `errorMessage`:  use this key to provide a custom error message. If it is not provided, a default one is returned.
  * `path`: to enforce a fixed key to be evaluated by this rule. It can be useful when composing complex validation logics (see [this](../src/example/nestedRulesSample.ts) for an example)

## Composite Rule

A composite rule is a rule whose result depends on the executions of a list of subrules. Each subrule can be a composite rule too,
giving the ability to compose complex trees.

### Configuration

```json
{
   "type": "COMPOSITE",
   "algorithm": "all|any",
   "subrules": [
      ...
   ]
}
```

* **type**: Type must be **COMPOSITE**
* **algorithm**: this can be `all` or `any` with the behaviour below:
    * **all**: this rule will return `valid` if all of its sub-rules returns `valid`
    * **any**: this rule will return `valid` if any of its sub-rules returns `valid`
* **subrules**: the list of subrules composing this composite rule. A subrule can be a composite rule itself.

## ExactValue Rule

This rule returns valid only if the field to be evaluated has exactly the specified value.

### Configuration

```json
{
   "type": "EXACT_VALUE",
   "value": "value to be checked"
}
```

* **type**: Type must be **EXACT_VALUE**
* **value**: the value that we want to check

### Example

```typescript
// Validator configuration
const validatorConfig = {
  ruleSets: [{
    fields: {
      myfield: [{
        type: 'EXACT_VALUE',
        value: '11'
      }]
    }
  }]
}

const data = {
  myfield: '56'
}

const validationResult = new Validator(validatorConfig).validate(data);
console.log('Validation result:', validationResult);
```

## MaxLength Rule

Validates the length of the configured field

### Configuration

```json
{
   "type": "MAXLENGTH",
   "maxlength": "12"
}
```

* **type**: Type must be **MAXLENGTH**
* **value**: if the field value is longer than this value, this check will return `false`

The above configuration checks that the field has a maximum length of '12'

## Required Rule

Checks that a particular field has a value

### Configuration

```json
{
   "type": "REQUIRED",
}
```

### Example
```typescript
// Validator configuration
const validatorConfig = {
  ruleSets: [{
    fields: {
      myfield2: [{
        type: 'REQUIRED',
      }]
    }
  }]
}

const data = {
  myfield1: '56',
  myfield2: 'test'
}

const validationResult = new Validator(validatorConfig).validate(data);
console.log('Validation result:', validationResult);
```

## Contains Rule

Checks that a field value contains the configured value.

### Configuration

```json
{
  "type": "contains",
  "seed": "value that must be contained"
}
```

* **type**: Type must be **contains**
* **seed**: the value that must be contained by the field value

## isAfter Rule

Returns valid if the field value is a date that comes after the configured date.

### Configuration

```json
{
  "type": "isAfter",
  "value": "12/12/2020",
  "format": "DD/MM/YYYY"
}
```

* **type**: Type must be **isAfter**
* **value**: the reference date. The date format must comply with the value of the configured `format`
* **format**: the pattern to be used to parse the date. If not specified, defaults to 'DD/MM/YYY'

## isAlpha Rule

Returns a `valid` result if the field value is an alphabetic string.

### Configuration

```json
{
  "type": "isAlpha",
  "locale": "the locale" 
}
```

* **type**: Type must be **isAlpha**
* **locale**: the locale. Defaults to `en-US`. Check [here](https://github.com/validatorjs/validator.js#validators) for the allowed values

## isAlphaNumeric Rule

Returns a `valid` result if the field value is an alphanumeric string.

### Configuration

```json
{
  "type": "isAlphaNumeric",
  "locale": "the locale" 
}
```

* **type**: Type must be **isAlphaNumeric**
* **locale**: the locale. Defaults to `en-US`. Check [here](https://github.com/validatorjs/validator.js#validators) for the allowed values

## isAscii Rule

Returns a `valid` result if the field value is an ASCII string.

### Configuration

```json
{
  "type": "isAscii",
}
```

* **type**: Type must be **isAscii**

## isBase32 Rule

Returns a `valid` result if the field value is an Base32 string.

### Configuration

```json
{
  "type": "isBase32",
}
```

* **type**: Type must be **isBase32**

## isBase64 Rule

Returns a `valid` result if the field value is an Base64 string.

### Configuration

```json
{
  "type": "isBase64",
}
```

* **type**: Type must be **isBase64**

## isBefore Rule

Returns valid if the field value is a date that comes before the configured one.

### Configuration

```json
{
  "type": "isBefore",
  "value": "12/12/2020",
  "format": "DD/MM/YYYY"
}
```

* **type**: Type must be **isBefore**
* **value**: the reference date. The date format must comply with the value of the configured `format`
* **format**: the pattern to be used to parse the date. If not specified, defaults to 'DD/MM/YYY'

## isBIC Rule

Returns a `valid` result if the field value is a valid BIC string.

### Configuration

```json
{
  "type": "isBIC",
}
```

* **type**: Type must be **isBIC**

## isBoolean Rule

Returns a `valid` result if the field value is a valid boolean string (true/false).

### Configuration

```json
{
  "type": "isBoolean",
}
```

* **type**: Type must be **isBoolean**

## isCreditCard Rule

Returns a `valid` result if the field value is a valid credit card string.

### Configuration

```json
{
  "type": "isCreditCard",
}
```

* **type**: Type must be **isCreditCard**

## isDataURI Rule

Returns a `valid` result if the field value is a valid data URI string (example: `data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D`).

### Configuration

```json
{
  "type": "isDataURI",
}
```

* **type**: Type must be **isDataURI**

## isDecimal Rule

Returns a `valid` result if the field value is a valid decimal value.

### Configuration

```json
{
  "type": "isDecimal",
}
```

* **type**: Type must be **isDecimal**

## isDivisibleBy Rule

Returns a `valid` result if the field value is a number divisible by the specified number.

### Configuration

```json
{
  "type": "isDivisibleBy",
  "number": "3"
}
```

* **type**: Type must be **isDivisibleBy**
* **number**: the field value must be divisible by this number

## isEmail Rule

Returns a `valid` result if the field value is a valid email address.

### Configuration

```json
{
  "type": "isEmail",
}
```

* **type**: Type must be **isEmail**

## isFQDN Rule

Returns a `valid` result if the field value is a valid FQDN string.

### Configuration

```json
{
  "type": "isFQDN",
}
```

* **type**: Type must be **isFQDN**

## isHASH Rule

Returns a `valid` result if the field value is a valid HASH string. Supported algorithms are `sha1`, `sha256`, `sha512`, `MD5`.

### Configuration

```json
{
  "type": "isHASH",
  "algorithm": "sha1"
}
```

* **type**: Type must be **isHASH**
* **algorithm**: The hashing algorithm. Defaults to `sha1` if not specified

## isHexadecimal Rule

Returns a `valid` result if the field value is a valid HEX string.

### Configuration

```json
{
  "type": "isHexadecimal",
}
```

* **type**: Type must be **isHexadecimal**

## isHexColor Rule

Returns a `valid` result if the field value is a valid HEX color string.

### Configuration

```json
{
  "type": "isHexColor",
}
```

* **type**: Type must be **isHexColor**

## isIn Rule

Returns a `valid` result if the field value one of the specified values.

### Configuration

```json
{
  "type": "isIn",
  "values": "value1,value2,value3"
}
```

* **type**: Type must be **isIn**
* **values**: a string containing all the values (comma separated)

## isInt Rule

Returns a `valid` result if the field value is an Int.

### Configuration

```json
{
  "type": "isInt",
}
```

* **type**: Type must be **isInt**

## isIP Rule

Returns a `valid` result if the field value is an IP address (v4 or V6).

### Configuration

```json
{
  "type": "isIP",
}
```

* **type**: Type must be **isIP**

## isIPRange Rule

Returns a `valid` result if the field value is an IP Range address (v4).

### Configuration

```json
{
  "type": "isIPRange",
}
```

* **type**: Type must be **isIPRange**

## isISBN Rule

Returns a `valid` result if the field value is a valid ISBN.

### Configuration

```json
{
  "type": "isISBN",
}
```

* **type**: Type must be **isISBN**

## isISIN Rule

Returns a `valid` result if the field value is a valid ISIN.

### Configuration

```json
{
  "type": "isISIN",
}
```

* **type**: Type must be **isISIN**

## isISO31661Alpha2 Rule

Returns a `valid` result if the field value is a valid ISO31661 Alpha2 string.

### Configuration

```json
{
  "type": "isISO31661Alpha2",
}
```

* **type**: Type must be **isISO31661Alpha2**

## isISO31661Alpha3 Rule

Returns a `valid` result if the field value is a valid ISO31661 Alpha3 string.

### Configuration

```json
{
  "type": "isISO31661Alpha3",
}
```

* **type**: Type must be **isISO31661Alpha3**

## isISO8601 Rule

Returns a `valid` result if the field value is a valid ISO8601 string.

### Configuration

```json
{
  "type": "isISO8601",
}
```

* **type**: Type must be **isISO8601**

## isISSN Rule

Returns a `valid` result if the field value is a valid ISSN string.

### Configuration

```json
{
  "type": "isISSN",
}
```

* **type**: Type must be **isISSN**

## isISRC Rule

Returns a `valid` result if the field value is a valid ISRC string.

### Configuration

```json
{
  "type": "isISRC",
}
```

* **type**: Type must be **isISRC**

## isRFC3339 Rule

Returns a `valid` result if the field value is a valid RFC3339 date.

### Configuration

```json
{
  "type": "isRFC3339",
}
```

* **type**: Type must be **isRFC3339**

## isJSON Rule

Returns a `valid` result if the field value is a valid JSON string.

### Configuration

```json
{
  "type": "isJSON",
}
```

* **type**: Type must be **isJSON**

## isJWT Rule

Returns a `valid` result if the field value is a valid JWT string.

### Configuration

```json
{
  "type": "isJWT",
}
```

* **type**: Type must be **isJWT**

## isLatLong Rule

Returns a `valid` result if the field value is a valid Latitude/Longitude string.

### Configuration

```json
{
  "type": "isLatLong",
}
```

* **type**: Type must be **isLatLong**

## isMACAddress Rule

Returns a `valid` result if the field value is a valid MAC Address.

### Configuration

```json
{
  "type": "isMACAddress",
}
```

* **type**: Type must be **isMACAddress**

## isMagnetURI Rule

Returns a `valid` result if the field value is a valid magnet URI.

### Configuration

```json
{
  "type": "isMagnetURI",
}
```

* **type**: Type must be **isMagnetURI**

## isMD5 Rule

Returns a `valid` result if the field value is a valid MD5 string

### Configuration

```json
{
  "type": "isMD5",
}
```

* **type**: Type must be **isMD5**

## isMimeType Rule

Returns a `valid` result if the field value is a valid mime type

### Configuration

```json
{
  "type": "isMimeType",
}
```

* **type**: Type must be **isMimeType**

## isMongoId Rule

Returns a `valid` result if the field value is a valid mongo id string

### Configuration

```json
{
  "type": "isMongoId",
}
```

* **type**: Type must be **isMongoId**

## isNumeric Rule

Returns a `valid` result if the field value is a valid numeric string

### Configuration

```json
{
  "type": "isNumeric",
}
```

* **type**: Type must be **isNumeric**

## isOctal Rule

Returns a `valid` result if the field value is a valid octal string

### Configuration

```json
{
  "type": "isOctal",
}
```

* **type**: Type must be **isOctal**

## isPort Rule

Returns a `valid` result if the field value is a valid port number

### Configuration

```json
{
  "type": "isPort",
}
```

* **type**: Type must be **isPort**

## matches Rule

Returns a `valid` result if the field value matches the provided regexp

### Configuration

```json
{
  "type": "matches",
  "pattern": "abc"
}
```

* **type**: Type must be **matches**
* **pattern** a regexp to be matched