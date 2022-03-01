import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createAndUpdateProfile } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alertActions';
import { CREATE_PROFILE_RESET } from '../../constants/userConstants';

function EditProfile({
  userAuth: { user },
  userProfile: { profile, create_success },
  createAndUpdateProfile,
  setAlert,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socialLinksFlag, setSocialLinksFlag] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (profile) {
      setFormData({
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills,
        githubusername: profile.githubusername,
        bio: profile.bio,

        twitter:
          profile.hasOwnProperty('social') &&
          profile.social.hasOwnProperty('twitter')
            ? profile.social.twitter
            : '',
        facebook:
          profile.hasOwnProperty('social') &&
          profile.social.hasOwnProperty('facebook')
            ? profile.social.facebook
            : '',
        linkedin:
          profile.hasOwnProperty('social') &&
          profile.social.hasOwnProperty('linkedin')
            ? profile.social.linkedin
            : '',
        youtube:
          profile.hasOwnProperty('social') &&
          profile.social.hasOwnProperty('youtube')
            ? profile.social.youtube
            : '',
        instagram:
          profile.hasOwnProperty('social') &&
          profile.social.hasOwnProperty('instagram')
            ? profile.social.instagram
            : '',
      });
    } else {
      navigate('/dashboard');
    }
    if (create_success) {
      setAlert('Edit Profile Successfully!', 'success');
      dispatch({ type: CREATE_PROFILE_RESET });
    }
  }, [create_success, navigate, profile, dispatch, setAlert, user]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    createAndUpdateProfile(formData);
  };

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Edit Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => submitHandler(e)}>
          <div className='form-group'>
            <select
              name='status'
              value={status}
              onChange={(e) => changeHandler(e)}
            >
              <option value='0' disabled>
                * Select Professional Status
              </option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={company}
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              value={skills}
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              name='githubusername'
              value={githubusername}
              onChange={(e) => changeHandler(e)}
            />
            <small className='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={(e) => changeHandler(e)}
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='my-2'>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => setSocialLinksFlag(!socialLinksFlag)}
            >
              Edit Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {socialLinksFlag && (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={(e) => changeHandler(e)}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
            </Fragment>
          )}

          <input
            type='submit'
            className='btn btn-primary my-1'
            value='Update Profile'
          ></input>
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
}

EditProfile.prototype = {
  createAndUpdateProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, {
  createAndUpdateProfile,
  setAlert,
})(EditProfile);
