import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../utils";

export const fetchPoints = createAsyncThunk(
    'points/fetchPoints',
    async (_, {getState, rejectWithValue, dispatch}) => {
        const response = await fetch(`${apiHost}/api/points`, {
            credentials: 'include',
            method: 'GET'
        });
        if (!response.ok)
                return rejectWithValue({text: await response.text(), code: response.status});
        return await response.json();
    }
);

export const fetchUsersPoints = createAsyncThunk(
    'points/fetchUsersPoints',
    async (username, {getState, rejectWithValue, dispatch}) => {
        const response = await fetch(`${apiHost}/api/users/${username}/points`, {
            credentials: 'include',
            method: 'GET'
        });
        if (!response.ok)
            return rejectWithValue({text: await response.text(), code: response.status});
        return await response.json();
    }
);

export const sendPoint = createAsyncThunk(
    'points/sendPoint',
    async (_, {getState, rejectWithValue, dispatch}) => {
        const point = getState().points.currentPoint;
        console.log(point);
        const response = await fetch( `${apiHost}/api/points`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(point)
        });
        if (!response.ok)
            return rejectWithValue({text: await response.text(), code: response.status});
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
            r: '1',
        },
        windowWidth: 0,
        error: null
    },
    reducers: {
        clearError(state, action) {
            state.error = null;
        },
        addPoint(state, action) {
            console.log("addPoint")
            console.log(action.payload)
            state.points.unshift(action.payload);
        },
        changeCurrentX(state, action) {
            console.log(`store: x before ${state.currentPoint.x}`);
            state.currentPoint.x = action.payload.x;
            console.log(`store: x changed to ${state.currentPoint.x}`);
        },
        changeCurrentY(state, action) {
            console.log(`store: y before ${state.currentPoint.y}`);
            state.currentPoint.y = action.payload.y ?? "";
            console.log(`store: y changed to ${state.currentPoint.y}`);
        },
        changeCurrentR(state, action) {
            console.log(`store: r before ${state.currentPoint.r}`);
            state.currentPoint.r = action.payload.r;
            console.log(`store: r changed to ${state.currentPoint.r}`);
        },
        changeWindowWidth(state, action) {
            state.windowWidth = action.payload.windowWidth;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPoints.fulfilled, (state, action) => {
            state.points = action.payload;
            state.fetchingError = null;
        })
        builder.addCase(fetchPoints.rejected, (state, action) => {
            state.error = action.payload;
        })

        builder.addCase(sendPoint.rejected, (state, action) => {
            state.error = action.payload
        })

        builder.addCase(fetchUsersPoints.rejected, (state, action) => {
            state.error = action.payload;
        })
        builder.addCase(fetchUsersPoints.fulfilled, (state, action) => {
            state.points = action.payload;
            state.fetchingError = null;
        })
    }
});

export const { addPoint, changeCurrentX, changeCurrentY, changeCurrentR, changeWindowWidth, clearError } = pointSlice.actions;
export default pointSlice.reducer