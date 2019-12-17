import { Validator } from '../Validator';
import { ValidatorConfig } from '..';

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
              {
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
              {
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
              {
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
            // os can be only ANDROID, iOS or WINDOWS
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
                  {
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
                  {
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

const validator = new Validator(validatorConfig);

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = { ...data, platform: 'DESKTOP', os: 'LINUX', programming_lang: 'Basic' }; // INVALID: programming_lang must be Java or C/C++

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = { ...data, platform: 'DESKTOP', os: 'MACOS', programming_lang: 'Basic' }; // INVALID: os must be WINDOWS or LINUX

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = { ...data, platform: 'MOBILE', os: 'iOS', programming_lang: 'Java' }; // INVALID programming_lang must be SWIFT or OBJECTIVE-C

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));

data = { ...data, platform: 'MOBILE', os: 'ANDROID', programming_lang: 'Java' }; // VALID

console.log('========================================');
console.log('DATA: ', data);
console.log('VALIDATION: ', validator.validate(data));
