const DyeTarget = {
    r: 'r',
    a: 'a',
    c: 'c',
    m: 'm',
    s: 's',
    default: 'default',

} as const;

const DyeBuilderTarget = {
    mincss: 'mincss',
    dyeswift: 'dyeswift',
    default: 'default'

} as const;

export type DyeCompilerTarget = keyof typeof DyeTarget;
export type DyeBuilderTarget = keyof typeof DyeBuilderTarget;