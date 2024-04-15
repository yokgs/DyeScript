export class VariableNameValidator {
    static test = /^[a-zA-Z][a-zA-Z0-9/]*$/
    static strict = false;
    public static isValid(variableName: string): void {
        if (!this.test.test(variableName) && this.strict) {
            throw new Error(`Invalid variable name: ${variableName}`);
        }
    }
}