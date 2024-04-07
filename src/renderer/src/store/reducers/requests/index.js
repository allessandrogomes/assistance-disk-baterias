import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

uuidv4()

const initialState = [
    {
        id: uuidv4(),
        request: 1,
        clientName: 'José',
        cpf: '24398744390',
        phoneNumber: '7499977884432',
        entryDate: '22/01/2024',
        returnDate: '23/01/2024',
        batteryModel: 'M60GD',
        batteryCode: 'A3-0911',
        loanBatteryModel: '',
        loanBatteryCode: '',
        loanedRouteBatteryRequestNumber: '',
        deadlineDays: 1,
        numberOfDaysPassed: 0,
        daysOfDelay: 0,
        numberOfTimesReturned: 0,
        status: 'PENDENTE',
        origin: 'REQUISIÇÃO',
        itHasALoanerBattery: false,
    },
    {
        id: uuidv4(),
        request: 2,
        clientName: 'Maria',
        cpf: '44426589645',
        phoneNumber: '74999632565',
        entryDate: '20/03/2024',
        returnDate: '22/03/2024',
        batteryModel: 'M60GD',
        batteryCode: 'A3-2964',
        loanBatteryModel: '',
        loanBatteryCode: '',
        loanedRouteBatteryRequestNumber: '',
        deadlineDays: 2,
        numberOfDaysPassed: 0,
        daysOfDelay: 1,
        numberOfTimesReturned: 0,
        status: 'PENDENTE',
        origin: 'REQUISIÇÃO',
        itHasALoanerBattery: false,
    }
]

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addNewData: (state, { payload }) => {
            const requestUpdated = [...state]
            requestUpdated.push(payload)
            return requestUpdated
        },
        updateData: (state, { payload }) => {
            const newRequests = payload
            return newRequests
        },
        removeData: (state, { payload }) => {
            const newRequests = state.filter(item => item.batteryCode !== payload.batteryCode)
            return newRequests;
        }
    }
})

export const { addNewData, updateData, removeData } = requestsSlice.actions

export default requestsSlice.reducer