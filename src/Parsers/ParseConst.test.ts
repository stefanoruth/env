import { describe, test } from 'mocha'
import { parseConst } from './ParseConst'
import { expect } from 'chai'

describe('ParseConst', () => {
    test('Empty value', () => {
        expect(parseConst({ value: '', options: ['foo', 'bar'], optional: true })).to.eql(null)
        expect(() => parseConst({ value: '', options: ['foo', 'bar'] })).to.throw
    })

    test('Invalid value', () => {
        expect(() => parseConst({ value: 'baz', options: ['FOO', 'BAR'] })).to.throw
        expect(() => parseConst({ value: 'baz', options: ['FOO', 'BAR'], optional: true })).to.throw
    })

    test('Valid value', () => {
        expect(parseConst({ value: 'foo', options: ['foo', 'bar'] })).to.eql('foo')
    })
})
