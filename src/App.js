import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from "mobx-react";

import './App.css'
import User from './User'
import Stores from './Stores';
import Category from "./Category";

const App = () => (
    <Provider stores={Stores}>
        <BrowserRouter>
            <header className='app-header'>
                <ul className='menu-bar'>
                    <li> <Link to='/'>Home</Link> </li>
                    <li> <Link to='/user'>내정보</Link> </li>
                </ul>
            </header>

            <section className='app-body'>
                <Route path='/user/:command?' exact component={User}/>
                <Category />
            </section>
        </BrowserRouter>
    </Provider>
);

export default App;