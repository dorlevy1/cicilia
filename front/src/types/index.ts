import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Author {
    id: string;
    name: string;
    age: number;
    state: string;
    picture: string,
    isActive: boolean;
    createdAt?: Timestamp;
}

export type AuthorsState = {
    authors: { active: Author[], disabled: Author[] };
    loading: boolean;
    updatePagination: boolean;
    success: boolean;
    error: string | null;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    picture: string;
    authorRef: object | string;
    isActive: boolean;
    createdAt?: Timestamp;
}
