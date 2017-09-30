import {Type, Interface, interfaceOfType} from '@theatersoft/device'
import {log, error} from './log'

export const
    INIT_DEVICES = 'INIT_DEVICES',
    initDevices = devices => ({type: INIT_DEVICES, devices}),
    ADD_DEVICE = 'ADD_DEVICE',
    addDevice = device => ({type: ADD_DEVICE, device})

import {switchActions} from '@theatersoft/device'
export const {ON, OFF, on, off} = switchActions

export const
    pulse = ({name, id, type = Type.BinarySensor} = {}) => (dispatch, getState) => {
        if (!name || !id) return Promise.reject('malformed device')
        if (!getState().devices[id])
            dispatch(addDevice({name, type, id}))
        dispatch(on(id))
        setTimeout(() => dispatch(off(id)), 5000)
    }
