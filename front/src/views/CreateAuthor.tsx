import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuthor} from '@/store/slices/authorsSlice';
import {AppDispatch, RootState} from '@/store/rootStore';
import '@scss/CreateAuthor.scss';
import {useNavigate} from "react-router-dom";
import Spinner from "@/Components/Spinner.tsx"; // Import the SCSS file
const CreateAuthorPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [age, setAge] = useState(20);
    const [state, setState] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null); // New state for image

    const {success, loading} = useSelector((state: RootState) => state.authors);


    // Handle image file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Please select an image file.");
            return;
        }

        const authorData = {name, age, state};
        dispatch(addAuthor({authorData, imageFile}))
        setName('');
        setAge(20);
        setState('');
        setImageFile(null); // Reset the image file after submission
    };

    useEffect(() => {
        if (success) {
            navigate('/authors'); // Change the path to the target page after creation
        }
    }, [success, navigate]);

    return (
        <div className="container">
            <h2>Create Author</h2>
            <form onSubmit={handleSubmit}>
                <div className={'inputWrapper'}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>State/Country:</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} required/>
                </div>
                <div className={'inputWrapper'}>
                    <label>Author Image:</label>
                    <div className="fileWrapper">
                        <input type="file" accept="image/*" onChange={handleFileChange} required/>
                    </div>
                </div>
                {!loading && <button type="submit">Create Author</button>}
                {loading && <Spinner/>}
            </form>
        </div>
    );
};

export default CreateAuthorPage;
