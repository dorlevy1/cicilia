import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '@scss/Header.scss';

const Header: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <h1>Book Management App</h1>
            <button className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <nav className={isOpen ? 'open' : ''}>
                <ul>
                    <li><Link to="/" onClick={toggleMenu}>Books</Link></li>
                    <li><Link to="/authors" onClick={toggleMenu}>Authors</Link></li>
                    <li><Link to="/create-author" onClick={toggleMenu}>Create Author</Link></li>
                    <li><Link to="/create-book" onClick={toggleMenu}>Create Book</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
