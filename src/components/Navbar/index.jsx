import React from "react";
import { useHistory } from "react-router";

const Navbar = props => {
  const history = useHistory();

  return (
    <div>
      {
        props.user !== null ?
          <button onClick={() => history.push('/createPost')}>Create Post</button> :
          null
      }
    </div>
  );
}

export default Navbar;