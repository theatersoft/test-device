//import {bus} from '@theatersoft/bus'
import {bus} from '../node_modules/@theatersoft/bus/bus.js'

export default function (context, callback) {
    console.log(context.secrets)
    const {url, auth} = context.secrets
    bus.start({parent: {url, auth}})
        .then(async () => log('PageView.pulse', await bus.proxy('PageView').pulse({name: 'Home', id: '/'})))
        .catch(e => log(e))
        .then(bus.close)
}