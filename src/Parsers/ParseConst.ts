export function parseConst<T extends readonly string[]>(args: {
    value: string | undefined
    options: T
    defaultValue?: T[number]
    optional?: boolean
}): string | null {
    if (typeof args.value === 'undefined' || args.value.trim().length === 0) {
        if (typeof args.defaultValue !== 'undefined') {
            if (!args.options.includes(args.defaultValue)) {
                throw new Error(`Invalid defaultValue "${args.defaultValue}"`)
            }

            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing value`)
    }

    if (!args.options.includes(args.value)) {
        throw new Error(`Invalid value "${args.value}"`)
    }

    return args.value
}
