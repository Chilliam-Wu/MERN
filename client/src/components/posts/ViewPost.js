import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getPostById,
  addComment,
  deleteComment,
} from '../../actions/postActions';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alertActions';
import {
  ADD_COMMENT_RESET,
  DELETE_COMMENT_RESET,
} from '../../constants/postConstants';

function ViewPost({
  userAuth: { user },
  post: { post, comment_success, delComment_success },
  getPostById,
  addComment,
  setAlert,
  deleteComment,
}) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (comment_success) {
      setAlert('Comment successfully!', 'success');
      setComment('');
      dispatch({ type: ADD_COMMENT_RESET });
    }
    if (delComment_success) {
      setAlert('Delete comment successfully!', 'success');
      dispatch({ type: DELETE_COMMENT_RESET });
    }
    getPostById(id);
  }, [
    id,
    getPostById,
    dispatch,
    setAlert,
    comment_success,
    delComment_success,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(id, comment);
  };

  const deleteClickHandler = (id, comment_id) => {
    deleteComment(id, comment_id);
  };

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img
                className='round-img'
                src={post && post.avatar && post.avatar}
                alt=''
              />
              <h4>{post && post.name && post.name}</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>{post && post.text && post.text}</p>
          </div>
        </div>

        <div className='post-form'>
          <div className='bg-primary p'>
            <h3>Leave A Comment</h3>
          </div>
          <form className='form my-1' onSubmit={(e) => submitHandler(e)}>
            <textarea
              name='comment'
              value={comment}
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <input type='submit' className='btn btn-dark my-1' value='Submit' />
          </form>
        </div>

        <div className='comments'>
          {post && post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index}>
                {' '}
                <div className='post bg-white p-1 my-1'>
                  <div>
                    <Link to={`/profile/${comment.user}`}>
                      <img
                        className='round-img'
                        src={comment.avatar && comment.avatar}
                        alt=''
                      />
                      <h4>{comment.name && comment.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <p className='my-1'>{comment.text && comment.text}</p>
                    <p className='post-date'>
                      Posted on {comment.date && comment.date.substring(0, 10)}
                    </p>
                    {post.user === user._id && (
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteClickHandler(id, comment._id)}
                      >
                        <i className='fas fa-times'></i>
                      </button>
                    )}
                    {post.user !== user._id && comment.user === user._id && (
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteClickHandler(id, comment._id)}
                      >
                        <i className='fas fa-times'></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4>No comments found...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
}

ViewPost.prototype = {
  userAuth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPostById,
  addComment,
  setAlert,
  deleteComment,
})(ViewPost);
