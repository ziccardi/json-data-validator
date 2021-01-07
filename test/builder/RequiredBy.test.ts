import {testValidator} from '../utils';
import {RuleBuilder, Validator, validatorBuilder} from '../../src';

const validator: Validator = validatorBuilder()
  .newRule()
  .withField('webpushVapidPublicKey')
  .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
  .withField('webpushVapidPrivateKey')
  .validate(
    RuleBuilder.isRequiredBy.withParent('webpushVapidPublicKey').build()
  )
  .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
  .withField('webpushAlias')
  .validate(
    RuleBuilder.required()
      .withErrorMessage('Please enter a valid URL or mailto address')
      .build()
  )
  .validate(
    RuleBuilder.composite
      .any()
      .withSubRule(
        RuleBuilder.matches(
          '^mailto: ?(?:[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$'
        )
      )
      .withSubRule(
        RuleBuilder.isValidUrl()
          .requireTld(true)
          .requireHost(true)
          .requireProtocol(true)
          .build()
      )
      .build('Please enter a valid URL or mailto address')
  )
  .build();

describe('RequiredBy Validator Builder', () => {
  it('Only name and alias', () => {
    testValidator(validator, {
      valid: [{name: 'test', webpushAlias: 'mailto:testmail@test.org'}],
      invalid: [{name: 'test'}],
    });
  });
  it('Only name and alias and public key', () => {
    testValidator(validator, {
      valid: [
        {
          name: 'test',
          webpushAlias: 'mailto:testmail@test.org',
          webpushVapidPublicKey: 'aaa',
          webpushVapidPrivateKey: 'aaa',
        },
      ],
      invalid: [
        {
          name: 'test',
          webpushAlias: 'mailto:testmail@test.org',
          webpushVapidPublicKey: 'aaa',
        },
      ],
    });
  });
});
