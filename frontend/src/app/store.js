import { configureStore } from '@reduxjs/toolkit'
import gymReducer from '../features/gyms/gymSlice'
import authReducer from '../features/auth/authSlice'
import dietReducer from '../features/diets/dietSlice'

export const store = configureStore({
  reducer: {
    gyms: gymReducer,
    auth: authReducer,
    diet: dietReducer,
  },
})