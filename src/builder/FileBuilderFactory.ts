import { DyeBuilderTarget } from "../common/Target";
import { Store } from "../store/store";
import { CSSBuilder } from "./CSSBuilder";
import { DyeGestBuilder } from "./DyeGestBuilder";
import { FileBuilder } from "./FileBuilder";
import { MinCSSBuilder } from "./MinCSSBuilder";

export class FileBuilderFactory {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }
    static create(target: DyeBuilderTarget): FileBuilder {
        switch (target) {
            case "dyegest":
                return new DyeGestBuilder();
            case "mincss":
                return new MinCSSBuilder();
            default:
                return new CSSBuilder();
        }
    }

    public build(target: DyeBuilderTarget): string {
        return FileBuilderFactory.create(target).build(this.store);
    }

}