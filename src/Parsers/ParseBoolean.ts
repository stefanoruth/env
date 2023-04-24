export function parseBoolean(args: {
    value: string | undefined
    defaultValue?: boolean
    optional?: boolean
}): boolean | null {
    if (typeof args.value === 'undefined') {
        if (typeof args.defaultValue !== 'undefined') {
            return args.defaultValue
        }

        if (args.optional === true) {
            return null
        }

        throw new Error(`Value was not defined`)
    }

    if (args.value.trim().length === 0) {
        return true // If the value is defined but not set to anything specific we treat it as true.
    }

    switch (args.value.trim().toLowerCase()) {
        case 'true':
        case '1':
            return true

        case 'false':
        case '0':
            return false

        default:
            throw new Error(`Unable to parse value`)
    }
}
