import React from "react";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();
  
  return (
    <div>
      <button onClick={() => history.push('/createPost')}>BlogUpload</button>
    </div>
  );
}

export default HomePage;