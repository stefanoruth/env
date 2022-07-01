# Typescript Env Parser

## Installation

```
yarn add @stefanoruth/env
```

## Example

```ts
import { envParser } from '@stefanoruth/env'

const config = envParser({
    port: { type: 'number', defaultValue: 3000, env: 'PORT' },
    domain: { type: 'string', env: 'DOMAIN' },
    secret: { type: 'string', env: 'JWT_SECRET', optional: true },
    mode: { type: 'const', options: ['development', 'production'] as const, env: 'NODE_ENV' },
})

config.port // number
config.domain // string
config.secret // string | undefined
config.mode // 'development' | 'production'
```

## Documentation

Supported types

| Type    | Notes                                                                                                                                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number  |                                                                                                                                                                                                                                                             |
| string  |                                                                                                                                                                                                                                                             |
| boolean |                                                                                                                                                                                                                                                             |
| const   | Const takes in an array of allowed values, the system with throw errors if the value from runtime or default value has not been set, (Note the return will be strict if you cast the array as const else, the array will be treated as an array of strings) |

Each type has a the options:

| Option       | Description                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------- |
| env          | Determines which key should be used when extracting the value from `process.env`                  |
| optional     | If a value is not marked as optional the system will automaticly throw an error when being called |
| defaultValue | Each type has a default value that relates to the chosen type                                     |
