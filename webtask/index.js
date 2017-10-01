import {bus, proxy, log} from '../node_modules/@theatersoft/bus/bus.js'

export default function (context, callback) {
    const
        {BUS: url, AUTH: auth} = context.secrets,
        {name = 'Home', id = '/'} = context.data
    bus.start({parent: {url, auth}})
        .then(() => proxy('PageView').pulse({name, id}))
        .catch(e => log(e))
        .then(bus.close)
}