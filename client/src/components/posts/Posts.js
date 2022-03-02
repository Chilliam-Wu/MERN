import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPosts, createPost } from '../../actions/postActions';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alertActions';

function Posts({
  userAuth: { user },
  post: { posts, create_success },
  getAllPosts,
  createPost,
}) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (create_success) {
      setAlert('Post Successfully!', 'success');
      setText('');
    }
    getAllPosts();
  }, [navigate, user, getAllPosts, create_success, setAlert]);

  const submitHandler = (e) => {
    e.preventDefault();
    createPost(text);
  };

  //   const deleteHandler = (post_id) => {
  //     console.log('Delete post by id!');
  //   };

  return (
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
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
          </form>
        </div>

        <div className='posts'>
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
                  <button type='button' className='btn btn-light'>
                    <i className='fas fa-thumbs-up'></i>
                    <span>
                      {' '}
                      {post.like && post.like.length > 0 ? post.like.length : 0}
                    </span>
                  </button>
                  <button type='button' className='btn btn-light'>
                    <i className='fas fa-thumbs-down'></i>
                  </button>
                  <a href='post.html' className='btn btn-primary'>
                    Discussion{' '}
                    <span className='comment-count'>
                      {post.comment && post.comment.length > 0
                        ? post.comment.length
                        : 0}
                    </span>
                  </a>
                  <button
                    type='button'
                    className='btn btn-danger'
                    // onClick={() => deleteHandler(post_id)}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h4> No posts found...</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
}

Posts.prototype = {
  userAuth: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAuth: state.userAuth,
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts, createPost })(Posts);
