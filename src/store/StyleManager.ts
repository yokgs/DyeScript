import { IStyle, WeightedValue } from "../common/style.interface";

export class StyleManager {

    private styles: Map<string, IStyle>;

    constructor(styles: Map<string, IStyle>) {
        this.styles = styles;
    }

    getStyle(selector: string): IStyle | undefined {
        return this.styles.get(selector);
    }

    addStyle(selector: string, property: string, value: WeightedValue) {
        let style = this.styles.get(selector) || {};
        if (!(property in style)) style[property] = [];
        style[property].push(value);
        this.styles.set(selector, style);
    }

}