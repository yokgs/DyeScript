import { DyeRuntime } from "./core/DyeRuntime";

class DyeScript {
    private static instance: DyeScript;
    private constructor() { }

    public run(source: string): DyeRuntime {
        return DyeRuntime.createFromContent(source);
    }

    public static getInstance(): DyeScript {
        if (!DyeScript.instance) {
            DyeScript.instance = new DyeScript();
        }
        return DyeScript.instance;
    }

}

export default DyeScript;