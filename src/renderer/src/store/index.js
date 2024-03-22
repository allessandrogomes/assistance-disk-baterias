import { configureStore } from "@reduxjs/toolkit";
import requestsSlice from "./reducers/requests";


const store = configureStore({
    reducer: {
        requests: requestsSlice
    }
})

export default store