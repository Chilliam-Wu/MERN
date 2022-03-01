import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/userActions';

function ViewProfile({ userProfile: { profile }, getProfileById }) {
  const { id } = useParams();
  const { user, status, company, location, skills, bio } = profile;

  useEffect(
    () => {
      getProfileById(id);
    },
    [getProfileById],
    id
  );

  return (
    <Fragment>
      <section className='container'>
        <Link to='/profiles' className='btn btn-light'>
          Back To Profiles
        </Link>

        <div className='profile-grid my-1'>
          <div className='profile-top bg-primary p-2'>
            <img className='round-img my-1' src={user && user.avatar} alt='' />
            <h1 className='large'>{user && user.name}</h1>
            <p className='lead'>
              {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className='icons my-1'>
              <Link
                to={
                  profile.hasOwnProperty('social') &&
                  profile.social.hasOwnProperty('twitter')
                    ? `/${profile.social.twitter}`
                    : ''
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x'></i>
              </Link>
              <Link
                to={
                  profile.hasOwnProperty('social') &&
                  profile.social.hasOwnProperty('facebook')
                    ? `/${profile.social.facebook}`
                    : ''
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x'></i>
              </Link>
              <Link
                to={
                  profile.hasOwnProperty('social') &&
                  profile.social.hasOwnProperty('linkedin')
                    ? `/${profile.social.linkedin}`
                    : ''
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x'></i>
              </Link>
              <Link
                to={
                  profile.hasOwnProperty('social') &&
                  profile.social.hasOwnProperty('youtube')
                    ? `/${profile.social.youtube}`
                    : ''
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube fa-2x'></i>
              </Link>
              <Link
                to={
                  profile.hasOwnProperty('social') &&
                  profile.social.hasOwnProperty('instagram')
                    ? `/${profile.social.instagram}`
                    : ''
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x'></i>
              </Link>
            </div>
          </div>

          <div className='profile-about bg-light p-2'>
            <h2 className='text-primary'>
              {user && user.name && user.name.indexOf(' ') > 0
                ? user.name.split(' ')[0]
                : user.name}
              's Bio
            </h2>
            <p>{bio && bio}</p>
            <div className='line'></div>
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>
              {skills &&
                skills.map((skill) => (
                  <div className='p-1'>
                    <i className='fa fa-check'></i> {skill}
                  </div>
                ))}
            </div>
          </div>

          <div className='profile-exp bg-white p-2'>
            <h2 className='text-primary'>Experience</h2>
            {profile &&
              profile.experience &&
              profile.experience.map((item, index) => (
                <div key={index}>
                  <h3 className='text-dark'>{item.company}</h3>
                  <p>
                    {item.from.substring(0, 10)} -{' '}
                    {item.to ? item.to.substring(0, 10) : 'Current'}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {item.title}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {item.description && item.description}
                  </p>
                </div>
              ))}
          </div>

          <div className='profile-edu bg-white p-2'>
            <h2 className='text-primary'>Education</h2>
            {profile &&
              profile.education &&
              profile.education.map((item, index) => (
                <div key={index}>
                  <h3>{item.school}</h3>
                  <p>
                    {item.from.substring(0, 10)} -{' '}
                    {item.to && item.to.substring(0, 10)}
                  </p>
                  <p>
                    <strong>Degree: </strong>
                    {item.degree}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {item.fieldofstudy}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {item.description && item.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

ViewProfile.prototype = {
  getProfileById: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, { getProfileById })(ViewProfile);
