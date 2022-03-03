import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAllPosts,
  createPost,
  deletePost,
  addLikes,
  removeLikes,
} from '../../actions/postActions';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alertActions';
import {
  CREATE_POST_RESET,
  DELETE_POST_RESET,
  LIKE_POST_RESET,
  UNLIKE_POST_RESET,
} from '../../constants/postConstants';

function Posts({
  userAuth: { user },
  post: {
    posts,
    create_success,
    like_success,
    unlike_success,
    delete_success,
    loading,
  },
  getAllPosts,
  createPost,
  deletePost,
  addLikes,
  removeLikes,
  setAlert,
}) {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (create_success) {
        setAlert('Post Successfully!', 'success');
        setText('');
        dispatch({ type: CREATE_POST_RESET });
      }
      if (like_success) {
        dispatch({ type: LIKE_POST_RESET });
      }
      if (unlike_success) {
        dispatch({ type: UNLIKE_POST_RESET });
      }
      if (delete_success) {
        setAlert('Delete post successfully!', 'success');
        dispatch({ type: DELETE_POST_RESET });
      }
      getAllPosts();
    }
  }, [
    navigate,
    user,
    getAllPosts,
    create_success,
    like_success,
    unlike_success,
    delete_success,
    setAlert,
    dispatch,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    createPost(text);
  };

  const deleteHandler = (post_id) => {
    deletePost(post_id);
  };

  const likeClickHandler = (post_id) => {
    // find the liked or unliked post
    let canLikeFlag = false;
    const post = posts.filter((post) => post._id === post_id)[0];
    if (post.likes) {
      if (post.likes.length > 0) {
        const like = post.likes.filter((like) => like.user === user._id)[0];
        if (like) {
          canLikeFlag = false;
        } else {
          canLikeFlag = true;
        }
      } else {
        canLikeFlag = true;
      }
    }

    if (canLikeFlag) {
      addLikes(post_id);
    } else {
      removeLikes(post_id);
    }
  };

  return (
    !loading && (
      <Fragment>
        <section className='container'>
          <Alert />
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community!
          </p>

          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Say Something...</h3>
            </div>
            <form className='form my-1' onSubmit={(e) => submitHandler(e)}>
              <textarea
                name='text'
                value={text}
                cols='30'
                rows='5'
                placeholder='Create a post'
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <input
                type='submit'
                className='btn btn-dark my-1'
                value='Submit'
              />
            </form>
          </div>

          <div className='posts'>
            {/* This is a test for getting expected result of likes array
          { posts &&
              console.log(
                posts.map((post) =>
                  post.likes.some((like) => like.user === user._id)
                )
              )
          } */}
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className='post bg-white p-1 my-1'>
                  <div>
                    <Link to={`/profile/${post.user}`}>
                      <img
                        className='round-img'
                        src={post.avatar && post.avatar}
                        alt=''
                      />
                      <h4>{post.name && post.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <p className='my-1'>{post.text && post.text}</p>
                    <p className='post-date'>
                      Posted on {post.date.substring(0, 10)}
                    </p>
                    <button
                      type='button'
                      className='btn btn-light'
                      onClick={() => likeClickHandler(post._id)}
                    >
                      {post.likes &&
                      post.likes.some((like) => like.user === user._id) ? (
                        <i className='fas fa-thumbs-up'></i>
                      ) : (
                        <i className='far fa-thumbs-up'></i>
                      )}
                      <span>
                        {' '}
                        {post.likes && post.likes.length > 0
                          ? post.likes.length
                          : 0}
                      </span>
                    </button>
                    <Link to={`/posts/${post._id}`} className='btn btn-primary'>
                      Discussion{' '}
                      <span className='comment-count'>
                        {post.comments && post.comments.length > 0
                          ? post.comments.length
                          : 0}
                      </span>
                    </Link>
                    {post.user === user._id && (
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteHandler(post._id)}
                      >
                        <i className='fas fa-times'></i>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h4> No posts found...</h4>
            )}
          </div>
        </section>
      </Fragment>
    )
  );
}

Posts.prototype = {
  userAuth: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getAllPosts,
  createPost,
  deletePost,
  addLikes,
  removeLikes,
  setAlert,
})(Posts);
