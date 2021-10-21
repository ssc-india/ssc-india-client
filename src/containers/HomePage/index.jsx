import React from "react";
// import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";

const HomePage = ({user}) => {
  // const history = useHistory();
  
  return (
    <div>
      <Navbar user={user} />
    </div>
  );
}

export default HomePage;