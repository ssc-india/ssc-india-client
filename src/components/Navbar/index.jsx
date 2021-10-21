import React from "react";
import { useHistory } from "react-router";

const Navbar = props => {
  const history = useHistory();

  return (
    <div>
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