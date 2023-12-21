import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';

export const IsUserType = (validationOptions?: ValidationOptions): PropertyDecorator => {
    return ValidateBy(
        {
            name: 'isUserType',
            validator: {
                validate(value, args): boolean {
                    return value === 'customer' || value === 'vendor';
                },
                defaultMessage: buildMessage(
                    (eachPrefix) => `${eachPrefix} $property must be either 'customer' or 'vendor'`,
                    validationOptions
                ),
            },
        },
        validationOptions
    );
};
