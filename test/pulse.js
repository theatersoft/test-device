'use strict'

const
    {bus, proxy, log} = require('@theatersoft/bus'),
    PageView = proxy('PageView')

bus.start()
    .then(async () => {
        log('PageView.pulse', await PageView.pulse({name: 'Home', id: '/'}))
    })
    .catch(e => log(e))
