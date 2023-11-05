const DyeTarget = {
    r: 'r',
    a: 'a',
    c: 'c',
    m: 'm',
    s: 's',
    default: 'default',

} as const;

export type DyeTarget = keyof typeof DyeTarget;