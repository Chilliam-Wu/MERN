import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { loadUser } from './actions/userActions';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Routes>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
