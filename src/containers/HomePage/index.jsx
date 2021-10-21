import React from "react";
import { ListPosts } from "../../components";
// import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";

const HomePage = ({user}) => {
  // const history = useHistory();
  
  return (
    <div>
      <Navbar user={user} />
      <ListPosts />
    </div>
  );
}

export default HomePage;