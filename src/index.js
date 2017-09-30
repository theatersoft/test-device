import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import bus from '@theatersoft/bus'
import {initDevices, pulse} from './actions'

export class TestDevice {
    start ({name, config: {remotedev}}) {
        this.name = name
        return bus.registerObject(name, this)
            .then(obj => {
                this.store = createStore(reducer, {devices: {}},
                    (remotedev && composeWithDevTools({name, realtime: true, port: 6400, hostname: remotedev}) || (x => x))
                    (applyMiddleware(thunk.withExtraArgument({})))
                )
                this.store.subscribe(state => obj.signal('state', this.store.getState()))
                const register = () => bus.proxy('Device').registerService(this.name)
                bus.registerListener(`Device.start`, register)
                bus.on('reconnect', register)
                register()
            })
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    getState () {
        return this.store.getState()
    }

    /*::
     type Device = {
        name: string,   // header
        id: string          // path
     }
     */
    pulse (device /*: Device */) {
        return this.store.dispatch(pulse(device))
    }
}
