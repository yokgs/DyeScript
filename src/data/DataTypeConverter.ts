import { VariableType } from "./DyeScope";

export class DataTypeConverter {
    static convert(data: string, type: VariableType){
        if(type == 'string') return data;
        if(type == "implicit") {
            return this.implicitConversion(data);
        }
        return data;
    }

    static implicitConversion(value: string) {
        if (value === 'true' || value === 'false') return value === 'true';
        if (/^[\d-]+$/.test(value)) return parseInt(value);
        if (/^[\d.-]+$/.test(value)) return parseFloat(value);
        if (value === 'undefined') return undefined;
        if (value === 'null') return null;
        return value;
    }
}
