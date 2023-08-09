export function parseNumber(args: {
    value: string | undefined
    defaultValue?: number
    optional?: boolean
}): number | null {
    const value = args.value?.trim()

    if (typeof value === 'undefined' || value.length === 0) {
        if (typeof args.defaultValue !== 'undefined') {
            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing value"`)
    }

    const data = parseFloat(value)

    if (isNaN(data)) {
        throw new Error(`Unable to parse value`)
    }

    return data
}
