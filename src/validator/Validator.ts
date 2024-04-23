export abstract class Validator {
    protected static test: RegExp | DyeValidation = /^.*$/
    protected static strict = false;
    public abstract isValid(expression: string): void;
}

type DyeValidation = { 
    test: (value: string) => boolean;
}