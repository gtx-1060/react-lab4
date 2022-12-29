import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchPoints = createAsyncThunk(
    'points/fetchPoints',
    async () => {
        const response = await fetch('http://localhost:3030/api/points', {
            mode: 'cors'
        });
        return await response.json();
    }
);

export const sendPoint = createAsyncThunk(
    'points/sendPoint',
    async (_, {getState, rejectWithValue, dispatch}) => {
        const point = getState().points.currentPoint;
        console.log(point);
        const response = await fetch( 'http://localhost:3030/api/points', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(point)
        });
        if (!response.ok)
            return rejectWithValue("error");
        dispatch(addPoint(await response.json()))
    }
);

const pointSlice = createSlice({
    name: 'points',
    initialState: {
        points: [],
        currentPoint: {
            x: '-3',
            y: '0',
            r: '1'
        }
    },
    reducers: {
        addPoint(state, action) {
            console.log("addPoint")
            console.log(action.payload)
            state.points.unshift(action.payload);
        },
        changeCurrentX(state, action) {
            state.currentPoint.x = action.payload.x;
            console.log(`store: x changed to ${state.currentPoint.x}`);
        },
        changeCurrentY(state, action) {
            state.currentPoint.y = action.payload.y ?? "";
            console.log(`store: y changed to ${state.currentPoint.y}`);
        },
        changeCurrentR(state, action) {
            state.currentPoint.r = action.payload.r;
            console.log(`store: r changed to ${state.currentPoint.r}`);
        }
    },
    extraReducers: (builder) => { builder
        .addCase(fetchPoints.fulfilled, (state, action) => {
            state.points = action.payload;
        })
        .addCase(sendPoint.fulfilled, (state, action) => {})
    }
});

export const { addPoint, changeCurrentX, changeCurrentY, changeCurrentR } = pointSlice.actions;
export default pointSlice.reducer