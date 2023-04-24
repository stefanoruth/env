import { describe, test } from 'mocha'
import { parseString } from './ParseString'
import { expect } from 'chai'

describe('ParseString', () => {
    test('True values', () => {
        expect(parseString({ value: 'foo' })).to.eql('foo')
        expect(parseString({ value: 'foo ' })).to.eql('foo ')
        expect(parseString({ value: '', optional: true })).to.eql(null)
        expect(parseString({ value: undefined, optional: true })).to.eql(null)
    })

    test('False values', () => {
        expect(() => parseString({ value: '' })).to.throw
        expect(() => parseString({ value: undefined })).to.throw
    })
})
