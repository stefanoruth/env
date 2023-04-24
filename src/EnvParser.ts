import { parseEnvironmentVariable } from './ParseVariable'
import { EnvInput, EnvResult } from './Types'

export type EnvConfig<T extends readonly string[]> = Record<string, EnvInput<T>>
type Output<T extends EnvConfig<I>, I extends readonly string[]> = { [k in keyof T]: EnvResult<T[k], I> }

// Prettier is ignored because of the usage of const here.
// prettier-ignore
export function envParser<T extends EnvConfig<I>, const I extends readonly string[]>(
    config: T,
    args?: NodeJS.ProcessEnv
): Output<T, I> {
    const env = { ...process.env, ...args }
    const parsedEnv: { [k: string]: string | number | boolean | null } = {}

    for (const [entry, options] of Object.entries(config)) {
        const key = options.env || entry
        const value = env[key]

        parsedEnv[entry] = parseEnvironmentVariable(key, value, options)
    }

    return parsedEnv as Output<T, I>
}
