import React from 'react';
import './App.scss';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Authors from "./views/Authors.tsx";
import CreateAuthor from "./views/CreateAuthor.tsx";
import Books from "./views/Books.tsx";
import CreateBooks from "./views/CreateBooks.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

interface Book {
    title: string;
    description: string;
    price: number;
    author: string;
}

const App: React.FC = () => {


    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Books/>}/>
                        <Route path="/authors" element={<Authors/>}/>
                        <Route path="/create-author" element={<CreateAuthor/>}/>
                        <Route path="/create-book" element={<CreateBooks/>}/>
                    </Routes>
                </div>
                <ToastContainer/>
            </div>
        </Router>
    );
};

export default App;
