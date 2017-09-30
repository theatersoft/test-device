import {Type, Interface, interfaceOfType} from '@theatersoft/device'
import {log, error} from './log'

export const
    INIT_DEVICES = 'INIT_DEVICES',
    initDevices = devices => ({type: INIT_DEVICES, devices})

import {switchActions} from '@theatersoft/device'
export const {ON, OFF, on, off} = switchActions

export const
    api = action => (dispatch, getState, {}) => {
    }