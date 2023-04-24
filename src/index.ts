import { envParser } from './EnvParser'

export { envParser } from './EnvParser'

const args = envParser({ port: { type: 'const', options: ['foo'] }, portB: { type: 'const', options: ['as', 'prod'] } })

args.portB === 'prod'
