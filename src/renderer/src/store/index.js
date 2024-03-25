import { configureStore } from "@reduxjs/toolkit";
import requestsSlice from "./reducers/requests";
import loanBatteriesSlice from "./reducers/loanBatteries";


const store = configureStore({
    reducer: {
        requests: requestsSlice,
        loanBatteries: loanBatteriesSlice
    }
})

export default store