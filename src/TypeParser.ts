export function parseNumber(args: {
    key: string
    value: string | undefined
    defaultValue: number | undefined
    optional: boolean | undefined
}): number | null {
    if (typeof args.value === 'undefined') {
        if (typeof args.defaultValue !== 'undefined') {
            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing env "${args.key}"`)
    }

    const data = parseFloat(args.value)

    if (isNaN(data)) {
        throw new Error(`Unable to parse value for "${args.key}"`)
    }

    return data
}

export function parseString(args: {
    key: string
    value: string | undefined
    defaultValue: string | undefined
    optional: boolean | undefined
}): string | null {
    if (typeof args.value === 'undefined') {
        if (typeof args.defaultValue !== 'undefined' && args.defaultValue.trim().length > 0) {
            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing env "${args.key}"`)
    }

    return args.value
}

export function parseBoolean(args: {
    key: string
    defaultValue: boolean | undefined
    value: string | undefined
    optional: boolean | undefined
}): boolean | null {
    if (typeof args.value === 'undefined') {
        if (typeof args.defaultValue !== 'undefined') {
            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing env "${args.key}"`)
    }

    switch (args.value.toLowerCase()) {
        case 'true':
        case '1':
            return true

        case 'false':
        case '0':
            return false

        default:
            throw new Error(`Unable to parse value for "${args.key}"`)
    }
}

export function parseConst<T extends readonly string[]>(args: {
    key: string
    value: string | undefined
    options: T
    defaultValue: T[number] | undefined
    optional: boolean | undefined
}): string | null {
    if (typeof args.value === 'undefined') {
        if (typeof args.defaultValue !== 'undefined') {
            if (!args.options.includes(args.defaultValue)) {
                throw new Error(`Invalid defaultValue for key "${args.key}", value "${args.defaultValue}"`)
            }

            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing env "${args.key}"`)
    }

    if (!args.options.includes(args.value)) {
        throw new Error(`Invalid value for key "${args.key}", value "${args.value}"`)
    }

    return args.value
}
