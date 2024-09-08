import React, { useState } from 'react';
import '@scss/Form.scss';

interface FormProps {
    onSubmit: (formData: { title: string; description: string; price: number; author: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | undefined>();
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && description && price && author) {
            onSubmit({ title, description, price, author });
            setTitle('');
            setDescription('');
            setPrice(undefined);
            setAuthor('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Book Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label htmlFor="price">Price</label>
            <input
                id="price"
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />

            <label htmlFor="author">Author</label>
            <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />

            <button type="submit">Create Book</button>
        </form>
    );
};

export default Form;
