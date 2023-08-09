type EnvNumber = { type: 'number'; defaultValue?: number; optional?: boolean }
type EnvString = { type: 'string'; defaultValue?: string; optional?: boolean }
type EnvBoolean = { type: 'boolean'; defaultValue?: boolean; optional?: boolean }
type EnvConst<T extends readonly string[]> = {
    type: 'const'
    options: T
    defaultValue?: string
    optional?: boolean
}

export type EnvInput<T extends readonly string[]> = (EnvNumber | EnvString | EnvBoolean | EnvConst<T>) & {
    env?: string
}

export type EnvResult<T extends EnvInput<I>, I extends readonly string[]> = T extends EnvNumber
    ? T extends Omit<EnvBoolean, 'optional'> & { optional: true }
        ? number | null
        : number
    : T extends EnvBoolean
    ? T extends Omit<EnvBoolean, 'optional'> & { optional: true }
        ? boolean | null
        : boolean
    : T extends EnvString
    ? T extends Omit<EnvString, 'optional'> & { optional: true }
        ? string | null
        : string
    : T extends EnvConst<I>
    ? T extends Omit<EnvConst<I>, 'optional'> & { optional: true }
        ? T['options'][number] | null
        : T['options'][number]
    : unknown
