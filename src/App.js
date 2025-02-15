/* eslint-disable */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';

import Login from './routes/Login.js';
import Groups from './routes/Groups.js';
import Raid from './routes/Raid.js';
import Navs from './routes/Navs.js';

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
      { state.user.isLogined === 1 && <Navs /> }
      <Routes>
        {
          state.user.isLogined === 0 ?
          <Route path='/' element={ <Login /> }></Route> : 
          <Route path='/' element={ <Groups /> }></Route>
        }
        <Route path='/raid' element={ <Raid /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
