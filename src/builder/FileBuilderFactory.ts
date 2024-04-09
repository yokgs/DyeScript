import { CSSBuilder } from "./CSSBuilder";
import { DyeSwiftBuilder } from "./DyeSwiftBuilder";
import { FileBuilder } from "./FileBuilder";

export class FileBuilderFactory {
    static create(target: string): FileBuilder {
        switch (target) {
            case "dyeScript":
                return new DyeSwiftBuilder();
            default:
                return new CSSBuilder();
        }
    }
}