import { createSlice } from "@reduxjs/toolkit"


const initialState = [
    {
        batteryModel: 'M60GD',
        batteryCode: 'C2-4832',
        batteryIsAvailable: true,
        origin: 'SOS'
    },
    {
        batteryModel: 'M72HD',
        batteryCode: 'D5-7291',
        batteryIsAvailable: false,
        origin: 'SOS'
    },
    {
        batteryModel: 'M45FD',
        batteryCode: 'A8-1023',
        batteryIsAvailable: true,
        origin: 'SOS'
    },
    {
        batteryModel: 'M80RD',
        batteryCode: 'F3-6217',
        batteryIsAvailable: true,
        origin: 'SOS'
    },
    {
        batteryModel: 'M55SD',
        batteryCode: 'B4-3765',
        batteryIsAvailable: false,
        origin: 'SOS'
    }
]

const loanBatteriesSlice = createSlice({
    name: 'loanBatteries',
    initialState,
    reducers: {
        addNewLoanBattery: (state, { payload }) => {
            const loanBatteriesUpdated = [...state]
            loanBatteriesUpdated.push(payload)
            return loanBatteriesUpdated
        },
        updateLoanBatteries: (state, { payload }) => {
            const newLoanBatteries = payload
            return newLoanBatteries
        },
        removeLoanBatteries: (state, { payload }) => {
            const newLoanBatteries = state.filter(item => item.batteryCode !== payload.batteryCode)
            return newLoanBatteries;
        }
    }
})

export const { addNewLoanBattery, updateLoanBatteries, removeLoanBatteries } = loanBatteriesSlice.actions

export default loanBatteriesSlice.reducer