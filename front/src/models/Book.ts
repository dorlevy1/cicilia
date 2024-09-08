import Joi from 'joi';
import firebase from "firebase/compat";

export class Book {
    id!: string;
    title!: string;
    price!: number;
    description!: string;
    category!: string;
    image!: string;
    isActive!: boolean;
    authorRef!: firebase.firestore.DocumentReference;
    createdAt!: firebase.firestore.Timestamp;

    constructor(data: {
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        isActive: boolean,
        authorId: string
    }) {
        this.title = data.title;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category;
        this.image = data.image;
        this.isActive = data.isActive;
        this.authorRef = firebase.firestore().doc(`authors/${data.authorId}`);  // Reference to the author document
        this.createdAt = firebase.firestore.Timestamp.now();
    }
}

// Validation schema for Book
export const bookSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().min(1).required(),
    authorId: Joi.string().required(),
    publishedYear: Joi.number().integer().min(1450).max(new Date().getFullYear()).required(),
});
