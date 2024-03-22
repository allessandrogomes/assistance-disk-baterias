import { createSlice } from "@reduxjs/toolkit"


const initialState = []

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addNewData: (state, { payload }) => {
            if (state.some(item => item.id === payload.id)) {
                console.log("Já existe uma requisição com esse ID.");
            } else {
                state.push(payload);
                console.log("Requisição adicionada.");
            }
        }
    }
})

export const { addNewData } = requestsSlice.actions

export default requestsSlice.reducer