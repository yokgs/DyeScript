import path from "path";
import { DyeBuilderTarget } from "./common/Target";
import { DyeBundler } from "./core/DyeBundler";
import { DyeRuntime } from "./core/DyeRuntime";

class DyeScript {

    public static run(content: string): DyeRuntime {
        return DyeRuntime.createFromContent(content);
    }

    public static runFile(path: string): DyeRuntime {
        return DyeRuntime.createFromFile(path);
    }

    public static exec(source: string, output: string, targets: DyeBuilderTarget[]) {
        const sourceName = path.parse(source).name;
        const runtime = DyeScript.runFile(source);
        const compiledSource =runtime.build(targets);
        DyeBundler.save(compiledSource, output, sourceName);
    }
}

export default DyeScript;