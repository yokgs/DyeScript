import { Store } from "../store/store";

export abstract class FileBuilder {
    protected _buffer: string = '';
    protected header: string = '-- DyeScript Default Header --';

    abstract build(store: Store): string;

    protected initBuffer(): void {
        this._buffer = this.header;
    }

    protected getOutput(): string {
        return this._buffer.trim();
    }

    protected append(buffer: string): void {
        this._buffer = this._buffer.concat(buffer);
    }

    protected getDominantStyle(valuesOfProperty: Array<[string, number]>): string {
        let dominantScore = 0, dominantStyleIndex = 0;
        valuesOfProperty.forEach((weightedValue, index) => {
            let [value, score] = weightedValue;
            if (score > dominantScore) {
                dominantScore = score;
                dominantStyleIndex = index;
            }
        });
        let [value, score] = valuesOfProperty[dominantStyleIndex];
        return value;
    }
}