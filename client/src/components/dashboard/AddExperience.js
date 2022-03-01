import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addExperience } from '../../actions/userActions';
import Alert from '../layout/Alert';

function AddExperience({
  addExperience,
  userProfile: { exp_success },
  userAuth: { user },
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { current } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (exp_success) {
      navigate('/dashboard');
    }
  }, [exp_success, navigate, user]);

  const onChangeHandler = (e) => {
    if (e.target.name === 'current') {
      setFormData({ ...formData, [e.target.name]: !current });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addExperience(formData);
  };

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => submitHandler(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              //   required
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              //   required
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value=''
                onChange={(e) => onChangeHandler(e)}
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' onChange={(e) => onChangeHandler(e)} />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Job Description'
              onChange={(e) => onChangeHandler(e)}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' value='Add' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

AddExperience.prototype = {
  addExperience: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  userAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  userAuth: state.userAuth,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
