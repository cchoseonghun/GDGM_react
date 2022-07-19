/* eslint-disable */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';

import Login from './routes/Login.js';
import List from './routes/List.js';
// const Login = lazy(() => import('./routes/Login.js'));
// const List = lazy(() => import('./routes/List.js'));

function App() {
  let state = useSelector((state)=> state );
  let dispatch = useDispatch(); 

  useEffect(()=>{
    if(localStorage.getItem('session_user') != null) {
      dispatch(setUser(1));
    }
  })

  return (
    <div className="App">
      <Routes>
        {
          state.user.isLogined === 0 ?
          <Route path='/' element={ <Login /> }></Route> : 
          <Route path='/' element={ <List /> }></Route>
        }
      </Routes>
    </div>
  );
}

export default App;
