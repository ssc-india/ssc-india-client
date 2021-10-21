import React from "react";
import { ListPosts } from "../../components";
// import { useHistory } from "react-router";

const HomePage = ({user}) => {
  // const history = useHistory();
  
  return (
    <div>
      <ListPosts />
    </div>
  );
}

export default HomePage;