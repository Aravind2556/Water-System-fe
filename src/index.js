import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css'
import './css/main.css'

import { BrowserRouter } from 'react-router-dom';

import DContext from './context/Datacontext';
import App from './App';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <DContext>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </DContext>

);


