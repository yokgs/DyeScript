export interface IStyle {
    [key: string]: Array<WeightedValue>;
}

export type WeightedValue = [string, number];