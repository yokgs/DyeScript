import { Validator } from "./Validator";

export class VariableNameValidator extends Validator {
    protected static test = /^[a-zA-Z][a-zA-Z0-9/]*$/
    public isValid(variableName: string): void {
        if (!VariableNameValidator.test.test(variableName) && VariableNameValidator.strict) {
            throw new Error(`Invalid variable name: ${variableName}`);
        }
    }
}