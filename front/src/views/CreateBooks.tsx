import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addBook} from '@/store/slices/booksSlice';
import {AppDispatch, RootState} from '@/store/rootStore.ts';
import {fetchAuthors} from '@/store/slices/authorsSlice.ts';
import '@scss/CreateAuthor.scss';
import {useNavigate} from "react-router-dom";
import Spinner from "@/Components/Spinner.tsx"; // Import the SCSS file

const CreateBookPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const {authors} = useSelector((state: RootState) => state.authors);
    const {success, loading} = useSelector((state: RootState) => state.books);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(10);
    const [description, setDescription] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null); // New state for image

    // Handle image file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }
        const bookData = {title, price, category, description, authorRef: authorName};
        dispatch(addBook({bookData, imageFile}));
        setTitle('');
        setPrice(10);
        setDescription('');
        setAuthorName('');
        setImageFile(null); // Reset the image file after submission
    };

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            navigate('/');
        }
    }, [success, navigate]);

    return (
        <div className="container">
            <h2>Create Book</h2>
            <form onSubmit={handleSubmit}>
                <div className={'inputWrapper'}>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Author Name:</label>
                    <select
                        id="authorRef"
                        onChange={(e) => setAuthorName(e.target.value)}
                        value={authorName}
                        name="authorRef"
                        required
                    >
                        <option value="" disabled>
                            Select an author
                        </option>
                        {authors?.active?.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={'inputWrapper'}>
                    <label>Book Image:</label>
                    <div className="fileWrapper">
                        <input type="file" accept="image/*" onChange={handleFileChange} required/>
                    </div>
                </div>
                {!loading && <button type="submit">Create Book</button>}
                {loading && <Spinner/>}
            </form>
        </div>
    );
};

export default CreateBookPage;
