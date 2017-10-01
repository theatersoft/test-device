import {bus, proxy, log} from '../node_modules/@theatersoft/bus/bus.js'

export default function (context, callback) {
    log(process.version) // need v8, see https://tomasz.janczuk.org/2017/09/auth0-webtasks-and-node-8.html
    const
        {BUS: url, AUTH: auth} = context.secrets,
        {name = 'Home', id = '/'} = context.data
    bus.start({parent: {url, auth}})
        .then(() => proxy('PageView').pulse({name, id}))
        .then(bus.close)
        .catch(e => log(e))
        .then(() => callback(null))
}