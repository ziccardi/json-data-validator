import {RuleBuilder} from '../rules/RuleBuilder';
import {validatorBuilder} from '../ValidatorBuilder';

let data = {
  platform: '', // can be MOBILE or DESKTOP
  os: '', // if platform is MOBILE, can be ANDROID, iOS or WINDOWS
  // if platform is DESKTOP, can be WINDOWS or LINUX
  programming_lang: '', // if os is ANDROID, can be Java or Kotlin
  // if os is iOS it can be SWIFT or OBJECTIVE-C
  // if platform is MOBILE and os is WINDOWS it can be C#
  // if platform is DESKTOP and os is LINUX, it can be Java or C/C++
  // if platform is DESKTOP and os is WIDNOWS, it can be Java, C/C++ or C#
};

const validator = validatorBuilder()
  .newRule()
  .withField('platform')
  .validate(RuleBuilder.isIn.withValues('MOBILE', 'DESKTOP'))
  .validate(RuleBuilder.required())
  .newRule()
  .withFieldValueConstraint('platform', 'mobile')
  .withField('os')
  .validate(RuleBuilder.isIn.withValues('ANDROID', 'iOS', 'WINDOWS'))
  .validate(RuleBuilder.required())
  .withField('programming_lang')
  .validate(
    RuleBuilder.composite
      .any()
      .withSubRule(
        RuleBuilder.composite
          .all()
          .withSubRule(RuleBuilder.exactValue.withPathAndValue('os', 'ANDROID'))
          .withSubRule(RuleBuilder.isIn.withValues('JAVA', 'KOTLIN'))
          .build()
      )
      .withSubRule(
        RuleBuilder.composite
          .all()
          .withSubRule(RuleBuilder.exactValue.withPathAndValue('os', 'iOS'))
          .withSubRule(RuleBuilder.isIn.withValues('SWIFT', 'OBJECTIVE-C'))
          .build()
      )
      .withSubRule(
        RuleBuilder.composite
          .all()
          .withSubRule(RuleBuilder.exactValue.withPathAndValue('os', 'WINDOWS'))
          .withSubRule(RuleBuilder.isIn.withValues('C#'))
          .build()
      )
      .build()
  )
  .newRule()
  .withFieldValueConstraint('platform', 'DESKTOP')
  .withField('os')
  .validate(RuleBuilder.isIn.withValues('WINDOWS', 'LINUX'))
  .withField('programming_lang')
  .validate(
    RuleBuilder.composite
      .any()
      .withSubRule(
        RuleBuilder.composite
          .all()
          .withSubRule(RuleBuilder.exactValue.withPathAndValue('os', 'WINDOWS'))
          .withSubRule(RuleBuilder.isIn.withValues('JAVA', 'C/C++', 'C#'))
          .build()
      )
      .withSubRule(
        RuleBuilder.composite
          .all()
          .withSubRule(RuleBuilder.exactValue.withPathAndValue('os', 'LINUX'))
          .withSubRule(RuleBuilder.isIn.withValues('JAVA', 'C/C++'))
          .build()
      )
      .build()
  )
  .build();

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = {...data, platform: 'DESKTOP', os: 'LINUX', programming_lang: 'Basic'}; // INVALID: programming_lang must be Java or C/C++

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = {...data, platform: 'DESKTOP', os: 'MACOS', programming_lang: 'Basic'}; // INVALID: os must be WINDOWS or LINUX

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = {...data, platform: 'MOBILE', os: 'iOS', programming_lang: 'Java'}; // INVALID programming_lang must be SWIFT or OBJECTIVE-C

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = {...data, platform: 'MOBILE', os: 'ANDROID', programming_lang: 'Java'}; // VALID

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));
