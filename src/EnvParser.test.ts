import { expect } from 'chai'
import { envParser } from './EnvParser'
import { test } from 'mocha'

describe('EnvParser', () => {
    test('it uses the correct enviroment key', () => {
        expect(envParser({ port: { type: 'string' } }, { port: '80' })).eql({ port: '80' })
        expect(envParser({ port: { type: 'string', env: 'PORT' } }, { PORT: '80' })).eql({ port: '80' })
        expect(() => envParser({ port: { type: 'string', env: 'PORT' } }, { port: '80' })).throw
    })
})
