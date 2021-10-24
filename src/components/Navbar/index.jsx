import axios from "axios";
import React from "react";
import { useHistory, useLocation } from "react-router";
import './index.scss';

const serverURL = process.env.REACT_APP_BE_URL;
const deletePostAPI = process.env.REACT_APP_Delete_Post;

const Navbar = props => {
  const history = useHistory();
  const location = useLocation();

  const deletePost = postId =>
    axios.post(serverURL + deletePostAPI,
      { postId: postId },
      { withCredentials: true }
    ).then(() => history.push('/'))
    .catch(err => console.log(err));

  return (
    <div className='Navbar-container'>
      <button onClick={() => history.goBack()} disabled={!props.postId}>Back</button>

      {
        props.user.name ?
          <p>Signed in as {props.user.name}</p> :
          null
      }

      {
        props.user.name ?
          <button onClick={() => history.push('/createPost')}>Create Post</button> :
          null
      }

      {
        props.user.name &&
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' ?
          <button onClick={() => history.push('/editPost/' + props.postId)}>Edit Post</button> :
          null
      }

      {
        props.user.name &&
        location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' &&
        props.user.id === props.postAuthor ?
          <button onClick={() => deletePost(props.postId)}>Delete Post</button> :
          null
      }

      <button onClick={props.setUser}>
        { props.user.name ? 'Sign out' : 'Sign in' }
      </button>
    </div>
  );
}

export default Navbar;