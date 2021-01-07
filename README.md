# Data Validator

A simple library to be used to validate JSON file content.
The validation can be configured using the JSON file format and different kind of validation can be performed when 
some `constraint` is evaluated.
Alternatively, the validator can be configured using fluent API.

Suppose we have to validate this data:
```js
const data = {
  num1: 5,
  num2: 6,
  op: 'add',
  result: 11
};
```

And we want, to ensure that result is `11` if `op` is `add` and result is `30` if `op` is `mul`.

The configuration for the validator would be:

```typescript
const validator = validatorBuilder()
    .newRule()
    .withFieldValueConstraint('op', 'add')
    .withField('result')
    .validate(RuleBuilder.exactValue.withValue(11).build())
    .newRule()
    .withFieldValueConstraint('op', 'mul')
    .withField('result')
    .validate(RuleBuilder.exactValue.withValue(30).build())
    .build();
```

or, if using a json configuration:

```js
const validatorConfig = {
  ruleSets: [
    { // We specify a constraint here: this ruleset is to be executed only if `op` is `add`
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'add',
        },
      ],
      fields: {
        result: [
          {
            type: 'EXACT_VALUE',
            value: 11,
          },
        ],
      },
    },
    { // Here another ruleset. This time, we want this to be executed only if `op` is `mul`
      constraints: [
        {
          type: 'FIELD_VALUE',
          path: 'op',
          value: 'mul',
        },
      ],
      fields: {
        result: [
          {
            type: 'EXACT_VALUE',
            value: 30,
          },
        ],
      },
    },
  ],
};

const validator = new Validator(validatorConfig);
```

And the data could be validated by running:
```js
console.log(validator.validate(data));
```

The validator will stop at the first error. If that is not the desired behaviour, it should be called as:

```js
console.log(validator.validate(data, true));

```

This way it will return an object like:

```javascript
{
   valid: false,
   details: [{
      field: 'field1',
      message: 'error message'
   },{
      field: 'field2',
      message: 'error message2'
   }]
}
```

# Configuration
A validator configuration is composed of an array of `RuleSet` configuration.
Each RuleSet configuration is composed of 2 elements:
 * constraints - is a set of constraints that must evaluate to `true` for the ruleset to be executed
 * fields - a dictionary of all the fields to be validated. For each field, a set of validation rules can be specified

The configuration could be saved into a JSON file or into a JS/ts file as in the above examples.

For example, using e JSON file the configuration would be:
```json
{
  "ruleSets": [
    { 
      "constraints": [
        {
          "type": "FIELD_VALUE",
          "path": "op",
          "value": "add",
        }
      ],
      "fields": {
        "result": [
          {
            "type": "EXACT_VALUE",
            "value": 11,
          }
        ]
      }
    },
    {
      "constraints": [
        {
          "type": "FIELD_VALUE",
          "path": "op",
          "value": "mul",
        },
      ],
      "fields": {
        "result": [
          {
            "type": "EXACT_VALUE",
            "value": 30
          }
        ]
      }
    }
  ]
}
```

## RuleSets Constraints

### FieldValue Constraints
Executes the RuleSet only if the value at the specified path has the specified value.

Configuration
```json
{
  "type": "FIELD_VALUE",
  "path": "path to the value to be evaluated (keys must be separated with a dot)",
  "value": "the value to be checked"
}
```

## Validation Rules

The list of the supported rules can be found [here](./docs/rules.md)

## Adding new custom constraints
Custom constraints can be added by extending the `AbstractConstraint` class and implementing the `isRespected` method.
The constraint configuration will be available as `this.config`.

The new constraint class must be registered into the `ConstraintFactory`class to make it visible to the `Validator`.
To do so, simply call `ConstraintFactory.register` passing your `constraint type` string and a factory function than 
will take the config as parameter and will return an instance of your constraint.

## Adding a new custom validation rule
Custom validation rules can be added by implementing the `Rule`, then you will have to register your new rule into
the `RuleFactory` class by invoking the  `RuleFactory.register` method passing the string type of your new rule and a
factory function that will take the rule configuration as parameter.

## Examples

All the examples can be found [here](./src/example)
