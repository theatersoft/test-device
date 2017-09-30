import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import bus from '@theatersoft/bus'
import {initDevices, off, api} from './actions'

export class TestDevice {
    start ({name, config: {remotedev}}) {
        this.name = name
        return bus.registerObject(name, this)
            .then(obj => {
                this.store = createStore(reducer, {devices: {}},
                    (remotedev && composeWithDevTools({name: 'TestDevice', realtime: true, port: 6400, hostname: remotedev}) || (x => x))
                    (applyMiddleware(thunk.withExtraArgument({})))
                )
                this.store.subscribe(state => obj.signal('state', state))
                const register = () => bus.proxy('Device').registerService(this.name)
                bus.registerListener(`Device.start`, register)
                bus.on('reconnect', register)
                register()
            })
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    dispatch (action) {
        return this.store.dispatch(api(action))
    }

    getState () {
        return this.store.getState()
    }
}
