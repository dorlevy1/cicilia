import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './slices/authorsSlice';
import booksReducer from './slices/booksSlice';

export const store = configureStore({
    reducer: {
        authors: authorsReducer,
        books: booksReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;