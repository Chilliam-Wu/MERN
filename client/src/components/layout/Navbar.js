import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';

function Navbar({ userAuth: { isAuthenticated, loading }, logout }) {
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevConnector
          </Link>
        </h1>
        {!loading && isAuthenticated ? (
          <ul>
            <li>
              <Link to='/' onClick={logout}>
                <i className='fas fa-sign-out-alt'></i> Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/profiles'>Developers</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  userAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
});

export default connect(mapStateToProps, { logout })(Navbar);
