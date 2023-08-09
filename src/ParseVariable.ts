import { parseBoolean, parseConst, parseNumber, parseString } from './Parsers'
import { EnvInput } from './Types'

export function parseEnvironmentVariable<T extends readonly string[]>(
    argKey: string,
    argValue: string | undefined,
    config: EnvInput<T>
) {
    try {
        if (config.type === 'boolean') {
            return parseBoolean({ value: argValue, defaultValue: config.defaultValue, optional: config.optional })
        } else if (config.type === 'number') {
            return parseNumber({ value: argValue, defaultValue: config.defaultValue, optional: config.optional })
        } else if (config.type === 'const') {
            return parseConst({
                value: argValue,
                options: config.options,
                defaultValue: config.defaultValue,
                optional: config.optional,
            })
        } else if (config.type === 'string') {
            return parseString({ value: argValue, defaultValue: config.defaultValue, optional: config.optional })
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unable to parse variable "${argKey}"`, { cause: error })
        } else {
            throw new Error('An invalid error happened')
        }
    }

    throw new Error('Option type not implemented')
}
