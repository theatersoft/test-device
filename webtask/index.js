import {bus} from '../node_modules/@theatersoft/bus/bus.js'

export default function (context, callback) {
    const {url, auth} = context.secrets
    bus.start({parent: {url, auth}})
        .then(() => {
            log('PageView.pulse')
            return bus.proxy('PageView').pulse({name: 'Home', id: '/'})
        })
        .catch(e => log(e))
        .then(bus.close)
}