import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dietService from './dietService';

const API_URL = '/api/diets/';

const initialState = {
    diets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getDiet = createAsyncThunk(
    'diets/getAll',
    async (_, thunkAPI) => {
        try {
            return await dietService.getDiets();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const DietSlice = createSlice ({
    name: 'diet',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDiet.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDiet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.diets = action.payload;
            })
            .addCase(getDiet.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
})

export const { reset } = DietSlice.actions;
export default DietSlice.reducer;