export function parseString(args: {
    value: string | undefined
    defaultValue?: string
    optional?: boolean
}): string | null {
    if (typeof args.value === 'undefined' || args.value?.trim().length === 0) {
        if (typeof args.defaultValue !== 'undefined' && args.defaultValue.trim().length > 0) {
            return args.defaultValue
        }

        if (args.optional) {
            return null
        }

        throw new Error(`Missing value`)
    }

    return args.value
}
