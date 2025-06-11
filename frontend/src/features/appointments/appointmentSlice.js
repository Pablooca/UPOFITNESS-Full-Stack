import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appointmentService from './appointmentService';

const API_URL = '/api/appointment/';

const initialState = {
    appointments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAppointmentByUser = createAsyncThunk(
    'appointments/getByUser',
    async (_, thunkAPI) => {
        try {
            return await appointmentService.getAppointmetByUser();
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

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppointmentByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAppointmentByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.appointments = action.payload;
            })
            .addCase(getAppointmentByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;