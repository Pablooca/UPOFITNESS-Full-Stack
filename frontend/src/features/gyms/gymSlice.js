import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gymService from './gymService'

const API_URL = '/api/gym/';

const initialState = {
    gyms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getGym = createAsyncThunk(
    'gyms/getAll',
    async (_, thunkAPI) => {
        try {
            return await gymService.getGyms()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const gymSlice = createSlice({
    name: 'gym',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGym.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGym.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gyms = action.payload
            })
            .addCase(getGym.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = gymSlice.actions
export default gymSlice.reducer