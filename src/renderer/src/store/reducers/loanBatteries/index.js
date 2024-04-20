import { createSlice } from "@reduxjs/toolkit"

const getData = async () => {
    try {
        const jsonData = await window.bridgeLoanBatteries.readDataLoanBatteries()
        return jsonData
    } catch (error) {
        console.error('Erro ao obter os dados:', error)
    }
}

const initialState = await getData()

const loanBatteriesSlice = createSlice({
    name: 'loanBatteries',
    initialState,
    reducers: {
        addNewLoanBattery: (state, { payload }) => {
            state.push(payload)
        },
        updateLoanBatteries: (state, { payload }) => {
            return payload
        },
        removeLoanBatteries: (state, { payload }) => {
            return state.filter(item => item.batteryCode !== payload.batteryCode)
        }
    }
})

export const { addNewLoanBattery, updateLoanBatteries, removeLoanBatteries } = loanBatteriesSlice.actions

export default loanBatteriesSlice.reducer