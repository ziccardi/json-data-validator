# Data Validator

A simple library to be used to validate JSON file content.
The validation can be configured using the JSON file format and different kind of validation can be performed when 
some `constraint` is evaluated.

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

```js
const validatorConfig = {
  result: [{
    constraints: [{
      type: 'FIELD_VALUE',
      path: 'op',
      value: 'add'
    }],
    rules: [{
      type: 'EXACT_VALUE',
      value: 11
    }]
  }, {
    constraints: [{
      type: 'FIELD_VALUE',
      path: 'op',
      value: 'mul'
    }],
    rules: [{
      type: 'EXACT_VALUE',
      value: 30
    }]
  }]
};
```

And the data could be validate by running:
```js
console.log(new Validator(validatorConfig).validate(data));
```

# Configuration
A validator configuration is composed of an array of RuleSet configuration and each RuleSet configuration is composed of a 
set of `constraints` (evaluate as 'AND' expression) and a set of validation rules (the first to fail will stop any further evaluation).

An example configuration could be:
```json
{
  "result": [{            
    "constraints": [{               
      "type": "FIELD_VALUE",
      "path": "op",
      "value": "add"
    }],
    "rules": [{
      "type": "EXACT_VALUE",
      "value": 11
    }]
  }, {
    "constraints": [{
      "type": "FIELD_VALUE",
      "path": "op",
      "value": "mul"
    }],
    "rules": [{
      "type": "EXACT_VALUE",
      "value": 30
    }]
  }]
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

### ExactValue Rule

Check that a key has a specified value.
Configuration
```json
{
  "type": "EXACT_VALUE",
  "value": "the value that the property should have"
}
```

### MaxLength Rule

This rule checks if the value at the specific path as a length less than or equal to the specified length.

Configuration
```json
{
  "type": "MAXLENGTH",
  "maxlength": 10
}
```

### Required Rule

This rule checks if the value at the specific path as a value.
Configuration
```json
{
  "type": "REQUIRED",
}
```

## Adding new custom constraints
Custom constraints can be added by extending the `AbstractConstraint` class and implementing the `isRespected` method.
The constraint configuration will be available as `this.config`.

The new constraint class must be registered into the `ConstraintFactory`class to make it visible to the `Validator`.
To do so, simply call `ConstraintFactory.register` passing your `constraint type` string and a factory function than 
will take the config as parameter and will return an instance of your constraint.

## Adding a new custom validation rule
Custom validation rules can be added by implementing the `RuleInterface`, then you will have to register your new rule into
the `RuleFactory` class by invoking the  `RuleFactory.register` method passing the string type of your new rule and a
factory function that will take the rule configuration as parameter.

