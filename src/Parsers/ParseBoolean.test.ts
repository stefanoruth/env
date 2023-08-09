import { describe, test } from 'mocha'
import { parseBoolean } from './ParseBoolean'
import { expect } from 'chai'

describe('ParseBoolean', () => {
    test('errors out when value is not defined and the value is required', () => {
        expect(() => parseBoolean({ value: undefined })).to.throw
        expect(parseBoolean({ value: undefined, optional: true })).to.null
    })

    test('True values', () => {
        expect(parseBoolean({ value: '' })).to.be.true
        expect(parseBoolean({ value: '1' })).to.be.true
        expect(parseBoolean({ value: 'true' })).to.be.true
        expect(parseBoolean({ value: 'TRUE' })).to.be.true
    })

    test('False values', () => {
        expect(parseBoolean({ value: '0' })).to.be.false
        expect(parseBoolean({ value: 'false' })).to.be.false
        expect(parseBoolean({ value: 'FALSE' })).to.be.false
    })
})
