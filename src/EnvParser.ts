import { parseBoolean, parseConst, parseNumber, parseString } from './TypeParser'

type EnvNumber = { type: 'number'; defaultValue?: number; env?: string; optional?: boolean }
type EnvString = { type: 'string'; defaultValue?: string; env?: string; optional?: boolean }
type EnvBoolean = { type: 'boolean'; defaultValue?: boolean; env?: string; optional?: boolean }
type EnvConst<T = readonly string[]> = {
    type: 'const'
    options: T
    defaultValue?: string
    env?: string
    optional?: boolean
}

type EnvInput = EnvNumber | EnvString | EnvBoolean | EnvConst

type ReturnType<T extends EnvInput> = T extends EnvNumber
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
    : T extends EnvConst
    ? T extends Omit<EnvConst, 'optional'> & { optional: true }
        ? T['options'][number] | null
        : T['options'][number]
    : unknown

export type EnvConfig = Record<string, EnvInput>
type Output<T extends EnvConfig> = { [k in keyof T]: ReturnType<T[k]> }

export function envParser<T extends EnvConfig>(config: T, args?: NodeJS.ProcessEnv): Output<T> {
    const env = { ...process.env, ...args }
    const parsedEnv: { [k: string]: string | number | boolean | null } = {}

    for (const [entry, options] of Object.entries(config)) {
        const key = options.env || entry
        const value = env[key]

        if (options.type === 'number') {
            parsedEnv[entry] = parseNumber({
                key,
                value,
                defaultValue: options.defaultValue,
                optional: options.optional,
            })
        } else if (options.type === 'string') {
            parsedEnv[entry] = parseString({
                key,
                value,
                defaultValue: options.defaultValue,
                optional: options.optional,
            })
        } else if (options.type === 'boolean') {
            parsedEnv[entry] = parseBoolean({
                key,
                value,
                defaultValue: options.defaultValue,
                optional: options.optional,
            })
        } else if (options.type === 'const') {
            parsedEnv[entry] = parseConst({
                key,
                value,
                defaultValue: options.defaultValue,
                options: options.options,
                optional: options.optional,
            })
        } else {
            throw new Error(`Env type not implemented`)
        }
    }

    return parsedEnv as Output<T>
}
