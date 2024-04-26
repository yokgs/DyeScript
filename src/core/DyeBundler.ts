import { writeFileSync } from "fs";
import { DyeBuilderTarget } from "../common/Target";
import path from "path";

export class DyeBundler {
    static save(output: { data: string, target: DyeBuilderTarget }[], targetDirectory: string, name: string) {
        output.forEach(e => {
            writeFileSync(path.join(targetDirectory, `${name}.${this.toExt(e.target)}`), e.data);
        })
    }

    static toExt(target: DyeBuilderTarget) {
        return {
            "mincss": "min.css" as const,
            "dyegest": "dyex" as const,
            "default": "css" as const
        }[target];
    }
}