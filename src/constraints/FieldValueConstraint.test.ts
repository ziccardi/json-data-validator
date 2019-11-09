import {FieldValueContraint} from "./FieldValueContraint";

it('should return false', function () {

    const config = {
      name: 'variant',
      value: 'ios'
    };

    const data = {
        variant: 'android',
        appName: 'test123',
        serverKey: 'sdfsdfds'
    };

    const constraint = new FieldValueContraint(config);
    expect(constraint.isRespected(data)).toBe(false);
});