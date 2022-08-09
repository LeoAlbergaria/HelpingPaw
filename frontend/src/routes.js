import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function Paths() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/home/new' element={<NewPost />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='*' element={<NotFound />} />
            </Routes>  
        </BrowserRouter>
    );
}