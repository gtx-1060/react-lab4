import {configureStore} from "@reduxjs/toolkit";
import pointsReducer from "./pointSlice"

export default configureStore({
    reducer: {
        points: pointsReducer
    }
});