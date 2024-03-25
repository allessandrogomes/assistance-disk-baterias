import { createSlice } from "@reduxjs/toolkit"


const initialState = [
    {
        batteryModel: 'M60GD',
        batteryCode: 'C2-4832',
        batteryIsAvailable: true
    },
    {
        batteryModel: 'M72HD',
        batteryCode: 'D5-7291',
        batteryIsAvailable: false
    },
    {
        batteryModel: 'M45FD',
        batteryCode: 'A8-1023',
        batteryIsAvailable: true
    },
    {
        batteryModel: 'M80RD',
        batteryCode: 'F3-6217',
        batteryIsAvailable: true
    },
    {
        batteryModel: 'M55SD',
        batteryCode: 'B4-3765',
        batteryIsAvailable: false
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
            return payload
        }
    }
})

export const { addNewLoanBattery, updateLoanBatteries } = loanBatteriesSlice.actions

export default loanBatteriesSlice.reducer