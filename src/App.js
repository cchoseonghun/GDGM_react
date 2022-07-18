/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Login from './routes/Login.js';
import List from './routes/List.js';
// const Login = lazy(() => import('./routes/Login.js'));
// const List = lazy(() => import('./routes/List.js'));

function App() {
  let state = useSelector((state)=> state );
  let dispatch = useDispatch(); 

  return (
    <div className="App">
      { state.user._id.length > 0 && <p>로그인된 아이디: {state.user.id}</p> }
      <Routes>
        {
          state.user._id.length > 0 ?
          <Route path='/' element={ <List /> }></Route> : 
          <Route path='/' element={ <Login /> }></Route>
        }
      </Routes>
    </div>
  );
}

export default App;
