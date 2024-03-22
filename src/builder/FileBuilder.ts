import { Store } from "../store/store";

export abstract class FileBuilder {
    protected _buffer: string = '';
    protected header: string = '-- DyeScript Default Header --';
    
    abstract build(store: Store): string;

    protected initBuffer(): void {
        this._buffer = this.header;
    }

    protected getOutput(): string {
        return this._buffer;
    }

    protected append(buffer: string): void {
        this._buffer = this._buffer.concat(buffer);
    }

    protected cleanStyles($: Array<[string, number]>): string {
        let max = 0, mi = 0;
        $.forEach((x, i) => {
            if (x[1] > max) {
                max = x[1];
                mi = i;
            }
        });
        return $[mi][0];
    }
}