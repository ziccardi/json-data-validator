# JSON-DATA-VALIDATOR Examples

## Programming language example

In this example, we will have a JSON as below to be validated:

```typescript
let data = {
  platform: '', // can be MOBILE or DESKTOP
  os: '', // if platform is MOBILE, can be ANDROID, iOS or WINDOWS
  // if platform is DESKTOP, can be WINDOWS or LINUX
  programming_lang: '', // if os is ANDROID, can be Java or Kotlin
  // if os is iOS it can be SWIFT or OBJECTIVE-C
  // if platform is MOBILE and os is WINDOWS it can be C#
  // if platform is DESKTOP and os is LINUX, it can be Java or C/C++
  // if platform is DESKTOP and os is WINDOWS, it can be Java, C/C++ or C#
};
```

The rule for the JSON to be valid will be:
* **platform** can be only MOBILE or DESKTOP
* **os** can be ANDROID,iOS or WINDOWS if `platform` is `MOBILE`, otherwise it can be `LINUX` or `WINDOWS`.
* **programming_lang** can be:
    * SWIFT or OBJECTIVE-C if `os` is `iOS`
    * Java or Kotlin if `os` is `ANDROID`
    * C# if `os` is `WINDOWS` and `platform` is `MOBILE`
    * Java or C/C++ if `os` is `LINUX`
    * Java, C/C++ or C# if `os` is `WINDOWS` and `platform` is `DESKTOP`

Below the validator configuration:

```typescript
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
```

Then the validation can be performed with code like:

```typescript
data = { ...data, platform: 'DESKTOP', os: 'LINUX', programming_lang: 'Basic' }; // INVALID: programming_lang must be Java or C/C++
console.log(validator.validate(data));

data = { ...data, platform: 'MOBILE', os: 'ANDROID', programming_lang: 'Java' }; // VALID
console.log(validator.validate(data));
```

For the complete example, look [here](../src/example/nestedRulesSample.ts).
