import { Validator } from "./Validator";

export class PropertyValidator extends Validator {
    protected static test = {
        test(propertyName: string){
            return propertyName.length > 2 && propertyName.slice(-1) !== '-' && propertyName.length < 64 && /^(--|-){0,1}[a-z]{1,20}[a-z-]{,40}(?!-)$/.test(propertyName);
        }
    };
    protected static strict = false;
    
    public isValid(propertyName: string): boolean {
        if (PropertyValidator.test.test(propertyName)) return true;
        if (PropertyValidator.strict) throw new Error(`Invalid property: ${propertyName}`);
        return false;
    }

}