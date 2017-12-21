require('@theatersoft/server/lib').startLocalService({
    module: '@theatersoft/test-device',
    export: 'TestDevice',
    name: 'PageView',
    config: {
        remotedev: 'localhost'
    }
})