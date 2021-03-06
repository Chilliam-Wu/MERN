import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/userActions';

function ViewProfile({ userProfile: { profile, loading }, getProfileById }) {
  const { id } = useParams();
  // const { user, status, company, location, skills, bio } = profile;

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    !loading && (
      <Fragment>
        <section className='container'>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>

          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary p-2'>
              <img
                className='round-img my-1'
                src={profile && profile.user && profile.user.avatar}
                alt=''
              />
              <h1 className='large'>
                {profile && profile.user && profile.user.name}
              </h1>
              <p className='lead'>
                {profile && profile.status}{' '}
                {profile && profile.company && (
                  <span> at {profile && profile.company}</span>
                )}
              </p>
              <p>
                {profile && profile.location && <span>{profile.location}</span>}
              </p>
              <div className='icons my-1'>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('website') &&
                    profile.website
                      ? profile.website
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fas fa-globe fa-2x'></i>
                </a>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('social') &&
                    profile.social.hasOwnProperty('twitter')
                      ? profile.social.twitter
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-twitter fa-2x'></i>
                </a>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('social') &&
                    profile.social.hasOwnProperty('facebook')
                      ? profile.social.facebook
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook fa-2x'></i>
                </a>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('social') &&
                    profile.social.hasOwnProperty('linkedin')
                      ? profile.social.linkedin
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-linkedin fa-2x'></i>
                </a>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('social') &&
                    profile.social.hasOwnProperty('youtube')
                      ? profile.social.youtube
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-youtube fa-2x'></i>
                </a>
                <a
                  href={
                    profile &&
                    profile.hasOwnProperty('social') &&
                    profile.social.hasOwnProperty('instagram')
                      ? profile.social.instagram
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-instagram fa-2x'></i>
                </a>
              </div>
            </div>

            <div className='profile-about bg-light p-2'>
              <h2 className='text-primary'>
                {profile && profile.user && profile.user.name
                  ? profile.user.name.indexOf(' ') > 0
                    ? profile.user.name.split(' ')[0]
                    : profile.user.name
                  : ''}
                's Bio
              </h2>
              <p>{profile && profile.bio && profile.bio}</p>
              <div className='line'></div>
              <h2 className='text-primary'>Skill Set</h2>
              <div className='skills'>
                {profile &&
                  profile.skills &&
                  profile.skills.map((skill, index) => (
                    <div className='p-1' key={index}>
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
    )
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
