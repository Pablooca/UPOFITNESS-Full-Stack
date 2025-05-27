import { configureStore } from '@reduxjs/toolkit'
import gymReducer from '../features/gyms/gymSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    gyms: gymReducer,
    auth: authReducer,
  },
})