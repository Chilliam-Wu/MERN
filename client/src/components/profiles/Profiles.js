import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/userActions';
import ProfileItem from './ProfileItem';

function Profiles({ getAllProfiles, userProfile: { profiles, loading } }) {
  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    !loading && (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </section>
      </Fragment>
    )
  );
}

Profiles.prototype = {
  getAllProfiles: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
