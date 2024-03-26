import { createSlice } from "@reduxjs/toolkit"


const initialState = [
    {
        request: 1,
        clientName: 'José',
        cpf: '24398744390',
        phoneNumber: '7499977884432',
        entryDate: '22/03/2024',
        returnDate: '23/03/2024',
        batteryModel: 'M60GD',
        batteryCode: 'A3-0911',
        loanBatteryModel: 'Z60D',
        loanBatteryCode: 'B2-8732',
        deadlineDays: 1,
        numberOfDaysPassed: 0,
        daysOfDelay: 0,
        numberOfTimesReturned: 0,
        status: 'PENDENTE'
    },
    {
        request: 2,
        clientName: 'Maria',
        cpf: '44426589645',
        phoneNumber: '74999632565',
        entryDate: '20/03/2024',
        returnDate: '22/03/2024',
        batteryModel: 'M60GD',
        batteryCode: 'A3-2964',
        loanBatteryModel: 'Z60D',
        loanBatteryCode: 'B2-8732',
        deadlineDays: 2,
        numberOfDaysPassed: 0,
        daysOfDelay: 1,
        numberOfTimesReturned: 0,
        status: 'PENDENTE'
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
            return payload
        }
    }
})

export const { addNewData, updateData } = requestsSlice.actions

export default requestsSlice.reducer