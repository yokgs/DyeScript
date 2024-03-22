import { CSSBuilder } from "./CSSBuilder";
import { FileBuilder } from "./FileBuilder";

export class FileBuilderFactory {
    static create(target: string): FileBuilder {
        switch (target) {
            case "dyeScript":
                return new CSSBuilder();
            default:
                return new CSSBuilder();
        }
    }
}