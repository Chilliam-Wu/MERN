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
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/dashboard/EditProfile';
import CreateProfile from './components/layout/CreateProfile';
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
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/create-profile' element={<CreateProfile />} />
            <Route exact path='/edit-profile' element={<EditProfile />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
