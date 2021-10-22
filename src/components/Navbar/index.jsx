import React from "react";
import { useHistory } from "react-router";
import './index.scss';

const Navbar = props => {
  const history = useHistory();

  return (
    <div className='Navbar-container'>
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
      <button onClick={props.setUser}>
        { props.user ? 'Sign out' : 'Sign in' }
      </button>
    </div>
  );
}

export default Navbar;