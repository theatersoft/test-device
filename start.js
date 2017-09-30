'use strict'
const
    {bus} = require('@theatersoft/bus').default,
    options = {
        module: '@theatersoft/test-device',
        export: 'TestDevice',
        name: 'TestDevice',
        config: {
            remotedev: 'localhost'
        }
    },
    service = new (require(options.module)[options.export])()

bus.start().then(() =>
    service.start(options))

process.on('SIGINT', () =>
    service.stop().then(() => process.exit()))

