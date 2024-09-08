import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Author, AuthorsState} from '@/types';
import {separateActiveDisabled} from "@/utils/utils.ts";
import {db, functions, storage} from "@/confg/firebaseConfig.ts";
import {httpsCallable} from "firebase/functions";
import useToast from "@/hooks/useToast.tsx";

const initialState: {
    success: boolean;
    updatePagination: boolean;
    loading: boolean;
    error: null;
    authors: { active: any[]; disabled: any[] }
} = {
    authors: {active: [], disabled: []},
    loading: false,
    success: false,
    error: null,
    updatePagination: false,
};

export const fetchAuthors = createAsyncThunk<Author[]>('authors/fetchAuthors', async (limit): Author[] => {
    try {
        const snapshot = await db.collection('authors').limit(<number>limit || 10).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
            };
        });
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching authors');
    }
});

export const addAuthor = createAsyncThunk('authorsSlice/addAuthor', async ({authorData, imageFile}: {
    authorData: Author,
    imageFile: File
}) => {
    try {

        const storageRef = storage.ref(`authors/${imageFile.name}`);
        const uploadTask = await storageRef.put(imageFile);
        const imageUrl = await uploadTask.ref.getDownloadURL();  // Get the image URL from Firebase Storage

        const addAuthorFunction = httpsCallable(functions, 'addAuthor');

        const response = await addAuthorFunction({...authorData, picture: imageUrl})

        return response.data;

    } catch (error) {
        console.error("Error uploading image and adding author:", error);
        throw error;
    }
});

export const disableAuthor = createAsyncThunk('authorsSlice/disableAuthor', async (id: string): Promise<Promise<Author> | Author> => {
    try {
        const toggleAuthorFunction = httpsCallable(functions, 'toggleAuthor');
        await toggleAuthorFunction({id});
        return {id} as Author;
    } catch (error) {
        console.error("Error uploading image and adding author:", error);
        throw error;
    }
});

const authorsSlice = createSlice({
    name: 'authorsSlice',
    initialState,
    reducers: {
        setUpdatePagination(state, action) {
            state.updatePagination = action.payload
        }
    },
    extraReducers: (builder) => {
        const {showToast} = useToast();
        builder
            //fetch
            .addCase(fetchAuthors.pending, (state: AuthorsState) => {
                state.loading = true;
            }).addCase(fetchAuthors.fulfilled, (state: AuthorsState, action: PayloadAction<Author[]>) => {
            const separate = separateActiveDisabled<Author>(action.payload)
            state.authors.active = separate.active;
            state.authors.disabled = separate.disabled;
            state.loading = false;
            state.success = action.payload.success
        }).addCase(fetchAuthors.rejected, (state: AuthorsState, action) => {
            state.loading = false;
            state.success = false
            showToast('Error fetching authors', 'error')
            state.error = action.error.message || 'Error fetching authors';
        })
            //add
            .addCase(addAuthor.fulfilled, (state: AuthorsState, action: PayloadAction<Author>) => {
                state.success = action.payload.success
                state.loading = false
                showToast(action.payload.message, 'success')
            }).addCase(addAuthor.rejected, (state: AuthorsState, action: PayloadAction) => {
            showToast('Failed to create author', 'error')
            state.success = false
        }).addCase(addAuthor.pending, (state: AuthorsState, action: PayloadAction) => {
            state.loading = true
        })
            //disable
            .addCase(disableAuthor.pending, (state: AuthorsState) => {
                state.loading = true;
            }).addCase(disableAuthor.fulfilled, (state: AuthorsState, action: PayloadAction<Author>) => {
            state.authors.active = state.authors.active.filter((author) => author.id !== action.payload.id);
            showToast('Author disabled successfully', 'success');
            state.updatePagination = true
            state.success = true
            state.loading = false;
        }).addCase(disableAuthor.rejected, (state: AuthorsState, action) => {
            state.loading = false;
            state.success = false
            showToast('Failed to disable author', 'error');
            state.error = action.error.message || 'Error disabling author';
        });
    },
});

export const {setUpdatePagination} = authorsSlice.actions
export default authorsSlice.reducer;
