import React, {useEffect} from 'react';
import {Book} from '@/types';
import '@scss/Books.scss'
import BookItem from "./BookItem.tsx";
import usePagination from "@/hooks/usePagination.ts";
import {useSelector} from "react-redux";

const BooksPage: React.FC = () => {
    const {books, updatePagination} = useSelector(state => state.books);  // Assuming you have these in your Redux state

    const {data, loading, error, load, loadMore} = usePagination<Book>({
        collection: 'books',
        orderByField: 'title',
        limit: 5,
        updatePagination
    });

    useEffect(() => {

    }, [books]);
    return (
        <div id="books">
            <h2>Books</h2>
            <ul className="uListAuthor">
                {data?.active?.map((book: Book) => (
                    <BookItem key={book.id} book={book}/>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && load && (
                <button onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default BooksPage;
