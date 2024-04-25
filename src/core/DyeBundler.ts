import { writeFileSync } from "fs";
import { DyeBuilderTarget } from "../common/Target";

export class DyeBundler {
    static save(output: { data: string, target: DyeBuilderTarget}[], targetDirectory: string, name: string){
        output.forEach(e=> {
            writeFileSync(`${targetDirectory}/${name}.${this.toExt(e.target)}`, e.data);
        })
    }

    static toExt(target: DyeBuilderTarget){
        return {
            "mincss": "min.css" as const,
            "dyegest": "s.dye" as const, 
            "default": "css" as const
        }[target];
    }
}