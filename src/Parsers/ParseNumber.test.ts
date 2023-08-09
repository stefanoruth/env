import { describe, test } from 'mocha'
import { parseNumber } from './ParseNumber'
import { expect } from 'chai'

describe('ParseNumber', () => {
    test('True values', () => {
        expect(parseNumber({ value: '80' })).to.eql(80)
        expect(parseNumber({ value: '', optional: true })).to.eql(null)
        expect(parseNumber({ value: undefined, optional: true })).to.eql(null)
    })

    test('False values', () => {
        expect(() => parseNumber({ value: '' })).to.throw
        expect(() => parseNumber({ value: undefined })).to.throw
    })
})
