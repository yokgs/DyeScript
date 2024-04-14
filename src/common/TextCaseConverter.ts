
export class TextCaseConverter {
    public static toKebabCase(text: string): string {
        return text.replace(/^([A-Z])/, '-$1').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    public static toCamelCase(text: string): string {
        return text.replace(/-([a-z])/g, x => x[1].toUpperCase());
    }
}