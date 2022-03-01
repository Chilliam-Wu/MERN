import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/userActions';
import Alert from '../layout/Alert';

function AddEducation({
  userAuth: { user },
  userProfile: { edu_success },
  addEducation,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
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
    if (edu_success) {
      navigate('/dashboard');
    }
  }, [navigate, user, edu_success]);

  const onChangeHandler = (e) => {
    if (e.target.name === 'current') {
      setFormData({ ...formData, [e.target.name]: !current });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addEducation(formData);
  };

  return (
    <Fragment>
      <section class='container'>
        <Alert />
        <h1 class='large text-primary'>Add Your Education</h1>
        <p class='lead'>
          <i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form class='form' onSubmit={(e) => submitHandler(e)}>
          <div class='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              onChange={(e) => onChangeHandler(e)}
              //   required
            />
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              onChange={(e) => onChangeHandler(e)}
              //   required
            />
          </div>
          <div class='form-group'>
            <input
              type='text'
              placeholder='Field Of Study'
              name='fieldofstudy'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div class='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div class='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value=''
                onChange={(e) => onChangeHandler(e)}
              />{' '}
              Current School or Bootcamp
            </p>
          </div>
          <div class='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' onChange={(e) => onChangeHandler(e)} />
          </div>
          <div class='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              onChange={(e) => onChangeHandler(e)}
            ></textarea>
          </div>
          <input type='submit' class='btn btn-primary my-1' value='Add' />
          <Link class='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

AddEducation.prototype = {
  userAuth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
