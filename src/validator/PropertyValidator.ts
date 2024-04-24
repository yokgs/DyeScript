import { Validator } from "./Validator";

export class PropertyValidator extends Validator {
    protected static test = {
        test(propertyName: string) {
            return propertyName.length > 2 && !propertyName.endsWith('-') && propertyName.length < 64 && /^-{0,2}[a-z]{1,20}[a-z-]{0,40}(?!-)$/.test(propertyName);
        }
    };

    public isValid(propertyName: string): boolean {
        if (PropertyValidator.test.test(propertyName)) return true;
        if (PropertyValidator.strict) throw new Error(`Invalid property: ${propertyName}`);
        return false;
    }

}