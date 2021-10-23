import React from "react";
import { useHistory, useLocation } from "react-router";
import './index.scss';

const Navbar = props => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className='Navbar-container'>
      <button onClick={() => history.goBack()}>Back</button>
      {
        props.user ?
          <p>Signed in as {props.user}</p> :
          null
      }
      {
        props.user ?
          <button onClick={() => history.push('/createPost')}>Create Post</button> :
          null
      }
      {
        props.user && location.pathname.slice(0, location.pathname.lastIndexOf('/')) === '/viewPost' ?
          <button onClick={() => history.push('/editPost/' + props.postId)}>Edit Post</button> :
          null
      }
      <button onClick={props.setUser}>
        { props.user ? 'Sign out' : 'Sign in' }
      </button>
    </div>
  );
}

export default Navbar;