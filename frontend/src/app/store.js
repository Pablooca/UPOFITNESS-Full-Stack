import { configureStore } from '@reduxjs/toolkit'
import gymReducer from '../features/gyms/gymSlice'

export const store = configureStore({
  reducer: {
    gyms: gymReducer,
  },
})