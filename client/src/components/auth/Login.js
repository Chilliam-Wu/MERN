import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Alert from '../layout/Alert';

function Login({ login, userAuth: { user } }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              // required
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              required
              minLength='6'
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
      </section>
    </Fragment>
  );
}

Login.prototype = {
  login: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

export default connect(mapStateToProps, { login })(Login);
