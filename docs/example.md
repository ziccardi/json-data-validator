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
const validatorConfig: ValidatorConfig = {
  ruleSets: [
    {
      // This ruleset is always executed
      fields: {
        platform: [
          {
            // platform can be only MOBILE or DESKTOP
            type: 'isIn',
            values: 'MOBILE,DESKTOP',
          },
        ],
      },
    },
    {
      // execute these rulesets if platform is 'MOBILE'
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'platform',
          value: 'MOBILE',
        },
      ],
      fields: {
        os: [
          {
            // os can be only ANDROID, iOS or WINDOWS
            type: 'isIn',
            values: 'ANDROID,iOS,WINDOWS',
          },
        ],
        programming_lang: [
          {
            type: 'COMPOSITE',
            algorithm: 'any',
            subRules: [
              { // If os is android, programming_lang must be Java or Kotlin
                type: 'COMPOSITE',
                subRules: [
                  {
                    type: 'EXACT_VALUE',
                    path: 'os',
                    value: 'ANDROID',
                  },
                  {
                    type: 'isIn',
                    values: 'Java,Kotlin',
                  },
                ],
              },
              { // If os is iOS, programming_lang must be SWIFT or OBJECTIVE-C
                type: 'COMPOSITE',
                subRules: [
                  {
                    type: 'EXACT_VALUE',
                    path: 'os',
                    value: 'iOS',
                  },
                  {
                    type: 'isIn',
                    values: 'SWIFT,OBJECTIVE-C',
                  },
                ],
              },
              { // If os is WINDOWS, programming_lang must be C#
                type: 'COMPOSITE',
                subRules: [
                  {
                    type: 'EXACT_VALUE',
                    path: 'os',
                    value: 'WINDOWS',
                  },
                  {
                    type: 'isIn',
                    values: 'C#',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'platform',
          value: 'DESKTOP',
        },
      ],
      fields: {
        os: [
          {
            // on DESKTOP, os can be only WINDOWS or LINUX
            type: 'isIn',
            values: 'WINDOWS,LINUX',
          },
        ],
        programming_lang: [
          {
            type: 'COMPOSITE',
            algorithm: 'any',
            subRules: [
              {
                type: 'COMPOSITE',
                subRules: [
                  { // If os is WINDOWS, programming_lang must be JAVA, C/C++ or C#
                    type: 'EXACT_VALUE',
                    path: 'os',
                    value: 'WINDOWS',
                  },
                  {
                    type: 'isIn',
                    values: 'Java,C/C++,C#',
                  },
                ],
              },
              {
                type: 'COMPOSITE',
                subRules: [
                  { // If os is LINUX, programming_lang must be JAVA, C/C++
                    type: 'EXACT_VALUE',
                    path: 'os',
                    value: 'LINUX',
                  },
                  {
                    type: 'isIn',
                    values: 'Java,C/C++',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};
```

Then the validation can be performed with code like:

```typescript
const validator = new Validator(validatorConfig);
data = { ...data, platform: 'DESKTOP', os: 'LINUX', programming_lang: 'Basic' }; // INVALID: programming_lang must be Java or C/C++
console.log(validator.validate(data));

data = { ...data, platform: 'MOBILE', os: 'ANDROID', programming_lang: 'Java' }; // VALID
console.log(validator.validate(data));
```

For a complete example, look [here](../src/example/nestedRulesSample.ts).