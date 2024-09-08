import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {Book} from '@/types';
import {separateActiveDisabled} from "@/utils/utils.ts";
import {httpsCallable} from "firebase/functions";
import {db, functions, storage} from "@/confg/firebaseConfig.ts";
import useToast from "@/hooks/useToast.tsx";

interface BooksState {
    books: { active: Book[], disabled: Book[] };
    loading: boolean;
    success: boolean;
    updatePagination: boolean;
    error: string | null;
}

const initialState: BooksState = {
    books: {active: [], disabled: []},
    loading: false,
    success: false,
    error: null,
    updatePagination: false,

};

export const fetchBooks = createAsyncThunk<Book[]>('booksSlice/fetchBooks', async (limit) => {
    try {
        const snapshot = await db.collection('books').limit(<number>limit || 10).get();  // Get authors from Firestore
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Error fetching books');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
});

export const addBook = createAsyncThunk('booksSlice/addBook', async ({bookData, imageFile}: {
    bookData: Book,
    imageFile: File
}) => {
    try {
        const storageRef = storage.ref(`books/${imageFile.name}`);
        const uploadTask = await storageRef.put(imageFile);
        const imageUrl = await uploadTask.ref.getDownloadURL();  // Get the image URL from Firebase Storage

        const addBookFunction = httpsCallable(functions, 'addBook');

        const response = await addBookFunction({...bookData, picture: imageUrl})
        return response.data;

    } catch (error) {
        console.error("Error uploading image and adding book:", error);
        throw error;
    }
});

export const disableBook = createAsyncThunk('booksSlice/disableBook', async (id: string): Promise<Promise<Book> | Book> => {
    try {
        const toggleBookFunction = httpsCallable(functions, 'toggleBook');
        await toggleBookFunction({id});
        return {id} as Book;
    } catch (error) {
        console.error("Error uploading image and adding author:", error);
        throw error;
    }
});


const booksSlice = createSlice({
    name: 'booksSlice',
    initialState,
    reducers: {
        setUpdatePagination(state, action) {
            state.updatePagination = action.payload
        }
    },
    extraReducers: (builder) => {
        const {showToast} = useToast()
        builder.addCase(fetchBooks.pending, (state: BooksState) => {
            state.loading = true;
        }).addCase(fetchBooks.fulfilled, (state: BooksState, action) => {
            state.books = separateActiveDisabled<Book>(action.payload);
            state.loading = false;
            state.success = action.payload.success
        }).addCase(fetchBooks.rejected, (state: BooksState, action) => {
            state.loading = false;
            state.success = false
            state.error = action.error.message || 'Error fetching books';
        }).addCase(addBook.fulfilled, (state: BooksState, action) => {
            showToast(action.payload.message, 'success')
            state.loading = false;
            state.success = action.payload.success
        }).addCase(addBook.rejected, (state: BooksState) => {
            showToast('Failed to create book', 'success')
            state.success = false
            state.loading = false;
        }).addCase(addBook.pending, (state: BooksState) => {
            state.loading = true;
        }).addCase(disableBook.pending, (state: BooksState) => {
            state.loading = true;
        }).addCase(disableBook.fulfilled, (state: BooksState, action: PayloadAction<Book>) => {
            state.books.active = state.books.active.filter((book) => book.id !== action.payload.id);
            showToast('Book disabled successfully', 'success');
            state.updatePagination = true
            state.success = true
            state.loading = false;
        }).addCase(disableBook.rejected, (state: BooksState, action) => {
            state.loading = false;
            state.success = false
            state.error = action.error.message || 'Error disabling author';
        });
    },
});
export const {setUpdatePagination} = booksSlice.actions

export default booksSlice.reducer;
