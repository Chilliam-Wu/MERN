import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Alert from '../layout/Alert';

function Register({ setAlert, register, isAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              // required
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              // required
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              minLength='6'
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              minLength='6'
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
}

// use prop-types to document the intended types
// of properties passed to components
Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuth.isAuthenticated,
});

// connect() function connects a React component to a Redux store.
// Inject setAlert without subscribing to the store
// connect(null, { setAlert }) means we do not have mapStateToProps
// we just need setAlert function
export default connect(mapStateToProps, { setAlert, register })(Register);
