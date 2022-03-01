import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/dashboard/EditProfile';
import AddExperience from './components/dashboard/AddExperience';
import AddEducation from './components/dashboard/AddEducation';
import CreateProfile from './components/layout/CreateProfile';
import Profiles from './components/profiles/Profiles';
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
          <Route path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Routes>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='create-profile' element={<CreateProfile />} />
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='add-experience' element={<AddExperience />} />
            <Route path='add-education' element={<AddEducation />} />
            <Route path='profiles' element={<Profiles />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
