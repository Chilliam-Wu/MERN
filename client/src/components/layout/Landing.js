import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Landing({ userAuth: { user } }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  return (
    <div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Developer Connector</h1>
            <p className='lead'>
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Landing.prototype = {
  userAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

export default connect(mapStateToProps)(Landing);
