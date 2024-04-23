import { Validator } from "./Validator";

export class PropertyValidator extends Validator {
    protected static test = {
        test(propertyName: string){
            return propertyName.length > 2 && propertyName.slice(-1) !== '-' && propertyName.length < 64 && /^(--|-)*[a-z]+[a-z-]*(?!-)$/.test(propertyName);
        }
    };
    protected static strict = false;
    
    public isValid(propertyName: string): boolean {
        if (PropertyValidator.test.test(propertyName)) return true;
        if (PropertyValidator.strict) throw new Error(`Invalid property: ${propertyName}`);
        return false;
    }

}