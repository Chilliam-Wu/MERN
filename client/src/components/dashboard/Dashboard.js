import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../actions/userActions';

function Dashboard({
  userAuth: { user },
  userProfile: { profile, loading },
  getUserProfile,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      getUserProfile();
    }
  }, [navigate, user]);

  return (
    !loading && (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {user && user.name}
          </p>
          {profile ? (
            <Fragment>
              <div className='dash-buttons'>
                <a href='/edit-profile' className='btn btn-light'>
                  <i className='fas fa-user-circle text-primary'></i> Edit
                  Profile
                </a>
                <a href='add-experience.html' className='btn btn-light'>
                  <i className='fab fa-black-tie text-primary'></i> Add
                  Experience
                </a>
                <a href='add-education.html' className='btn btn-light'>
                  <i className='fas fa-graduation-cap text-primary'></i> Add
                  Education
                </a>
              </div>

              <h2 className='my-2'>Experience Credentials</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {profile &&
                    profile.experience &&
                    profile.experience.map((item, index) => (
                      <tr key={index}>
                        <td>{item.company}</td>
                        <td>{item.title}</td>
                        <td>
                          {item.from.substring(0, 10)}{' '}
                          {item.to.substring(0, 10)}
                        </td>
                        <td>
                          <button className='btn btn-danger'>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <h2 className='my-2'>Education Credentials</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {profile &&
                    profile.education &&
                    profile.education.map((item, index) => (
                      <tr key={index}>
                        <td>{item.school}</td>
                        <td>{item.degree}</td>
                        <td>
                          {item.from.substring(0, 10)}{' '}
                          {item.to.substring(0, 10)}
                        </td>
                        <td>
                          <button className='btn btn-danger'>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className='my-2'>
                <button className='btn btn-danger'>
                  <i className='fas fa-user-minus'></i>
                  Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet set up a profile, please add your info.</p>
              <Link to='/create-profile'>
                <button className='btn btn-primary my-1'>Create Profile</button>
              </Link>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  );
}

Dashboard.prototype = {
  getUserProfile: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
