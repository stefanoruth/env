import { expect } from 'chai'
import { EnvConfig, envParser } from './EnvParser'

describe('EnvParser', () => {
    it('Custom env value', () => {
        expect(envParser({ port: { type: 'number', env: 'FOO' } }, { FOO: '80' })).eql({ port: 80 })
        expect(envParser({ port: { type: 'string', env: 'FOO' } }, { FOO: '80' })).eql({ port: '80' })
        expect(envParser({ port: { type: 'boolean', env: 'FOO' } }, { FOO: 'true' })).eql({ port: true })
        expect(envParser({ port: { type: 'number', env: 'FOO' } }, { FOO: '80', port: '81' })).eql({ port: 80 })
        expect(envParser({ port: { type: 'number' } }, { FOO: '80', port: '81' })).eql({ port: 81 })
    })

    describe('Number', () => {
        it('Parse Number', () => {
            expect(envParser({ port: { type: 'number' } }, { port: '80' })).eql({ port: 80 })
        })

        it('Optional Number', () => {
            expect(envParser({ port: { type: 'number', optional: true } }, {})).eql({ port: null })
        })
    })

    describe('String', () => {
        it('Parse String', () => {
            expect(envParser({ folder: { type: 'string' } }, { folder: 'images' })).eql({ folder: 'images' })
        })

        it('Optional String', () => {
            expect(envParser({ folder: { type: 'string', optional: true } }, {})).eql({ folder: null })
        })
    })

    describe('Boolean', () => {
        it('Parse Boolean', () => {
            const config: EnvConfig = { force: { type: 'boolean' } }

            expect(envParser(config, { force: 'true' })).eql({ force: true })
            expect(envParser(config, { force: 'false' })).eql({ force: false })
            expect(envParser(config, { force: '1' })).eql({ force: true })
            expect(envParser(config, { force: '0' })).eql({ force: false })
            expect(envParser(config, { force: 'TRUE' })).eql({ force: true })
            expect(envParser(config, { force: 'FALSE' })).eql({ force: false })
        })

        it('Optional Boolean', () => {
            expect(envParser({ force: { type: 'boolean', optional: true } }, {})).eql({ force: null })
        })
    })

    describe('Const', () => {
        it('Parse Const', () => {
            //
        })

        it('Optional Const', () => {
            //
        })
    })
})
