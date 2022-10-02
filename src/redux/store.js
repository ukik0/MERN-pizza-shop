import {configureStore} from '@reduxjs/toolkit'

import pizzaRouter from './slices/pizzaSlice'
import authRouter from './slices/authSLice'

export const store = configureStore({
    reducer: {
        pizza: pizzaRouter,
        auth: authRouter,
    }
})