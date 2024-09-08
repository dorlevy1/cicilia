import React from 'react';
import '@scss/BookItem.scss';
import {Book} from '@/types';
import Switch from "@/Components/Switch.tsx";
import {useDispatch} from "react-redux";
import {disableBook} from "@/store/slices/booksSlice.ts";


interface BookItemProps {
    book: Book;
}

const BookItem: React.FC<BookItemProps> = ({book}) => {

    const dispatch = useDispatch()
    const onDisabledSwitch = (e) => {
        console.log(e)
        dispatch(disableBook(book.id))
    }

    return (
        <div className='liWrapper'>
            <Switch onDisabled={onDisabledSwitch}/>
            <li className='lIListAuthor' key={book.id}>
                <div className={`image ${!book.picture && 'no_picture'}`}>
                    {book.picture ? <img src={book.picture} alt="Author Pic"/> : <h1>No Picture Saved</h1>}
                </div>
                <div className="author-details">
                    <p><strong>Book Name:</strong> {book.title}</p>
                    <p><strong>Book Description:</strong> {book.description}</p>
                    <p><strong>Price:</strong> {book.price}</p>
                    <p><strong>Author:</strong> {book.authorRef?.name}</p>
                    <p><strong>Category:</strong> {book.category}</p>
                    <p><strong>Active:</strong> {book.isActive ? 'Yes' : 'No'}</p>
                </div>
            </li>
        </div>
    );
};

export default BookItem;
