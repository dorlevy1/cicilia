import React, {useEffect} from 'react';
import {Author} from '@/types';
import '@scss/Authors.scss'
import AuthorItem from "./AuthorItem.tsx";
import usePagination from "@/hooks/usePagination.ts";
import {useSelector} from "react-redux";

const AuthorsPage: React.FC = () => {
    const {authors, updatePagination} = useSelector(state => state.authors);  // Assuming you have these in your Redux state
    const {data, loading, load, error, loadMore} = usePagination<Author>({
        collection: 'authors',
        orderByField: 'name',
        limit: 5,
        updatePagination
    });

    useEffect(() => {
    }, [authors]);
    return (
        <div id="authors">
            <h2>Authors</h2>
            <ul className="uListAuthor">
                {data?.active?.map((author: Author) => (
                    <AuthorItem key={author.id} author={author}/>
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

export default AuthorsPage;
