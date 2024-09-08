import Switch from "@/Components/Switch.tsx";
import React, {useEffect} from "react";
import {Author} from "@/types";
import {useDispatch, useSelector} from "react-redux";
import '@/confg/firebaseConfig.ts'
import {disableAuthor} from "@/store/slices/authorsSlice.ts";


interface AuthorItemProps {
    author: Author;
}

const AuthorItem: React.FC<AuthorItemProps> = ({author}) => {

    const dispatch = useDispatch();
    const {authors} = useSelector((state) => state.authors)
    const onDisabledSwitch = async (e) => {
        dispatch(disableAuthor(author.id));
    }

    useEffect(() => {
    }, [authors]);
    return (
        <div className='liWrapper'>
            <Switch onDisabled={onDisabledSwitch}/>
            <li className='lIListAuthor' key={author.id}>
                <div className={`image ${!author.picture && 'no_picture'}`}>
                    {author.picture ? <img src={author.picture} alt="Author Pic"/> :
                        <h1>No Picture Saved</h1>}
                </div>
                <div className="author-details">
                    <p><strong>Author Name:</strong> {author.name}</p>
                    <p><strong>Age:</strong> {author.age}</p>
                    <p><strong>State:</strong> {author.state}</p>
                    <p><strong>Active:</strong> {author.isActive ? 'Yes' : 'No'}</p>
                </div>
            </li>
        </div>
    )
}

export default AuthorItem