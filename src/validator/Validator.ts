export abstract class Validator {
    protected static test = /^.*$/
    protected static strict = false;
    public abstract isValid(variableName: string): void;
}