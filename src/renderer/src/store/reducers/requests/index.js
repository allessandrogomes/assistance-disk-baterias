import { createSlice } from "@reduxjs/toolkit"

const getData = async () => {
    try {
        const jsonData = await window.bridgeRequests.readDataRequests();
        return jsonData
    } catch (error) {
        console.error('Erro ao obter os dados:', error)
    }
}

const initialState = await getData()

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addNewData: (state, { payload }) => {
            state.push(payload)
        },
        updateData: (state, { payload }) => {
            return payload
        },
        removeData: (state, { payload }) => {
            return state.filter(item => item.id !== payload.id)
        }
    }
})

export const { addNewData, updateData, removeData } = requestsSlice.actions

export default requestsSlice.reducer