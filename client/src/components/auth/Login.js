import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('SUCCESS!');
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign intp Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              required
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              minLength='6'
              required
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

export default Login;
