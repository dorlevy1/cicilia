import Joi from 'joi';
import firebase from "firebase/compat/app";

export class AuthorClass {
    id!: string;
    name!: string;
    age!: number;
    state!: string;
    picture!: string;
    isActive!: boolean;
    createdAt!: firebase.firestore.Timestamp;

    constructor(data: { name: string; id: string; state: string; isActive: boolean; age: number; picture: any }) {
        this.name = data.name;
        this.age = data.age;
        this.state = data.state;
        this.picture = data.picture;
        this.isActive = data.isActive;
        this.createdAt = firebase.firestore.Timestamp.now();
    }
}

// Validation schema for Author
export const authorSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().min(3).required(),
    age: Joi.number().min(18).max(120).required(),
    biography: Joi.string().optional().allow(''),
});
