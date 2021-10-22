import React from "react";
import { ListPosts } from "../../components";
// import { useHistory } from "react-router";

const HomePage = ({query}) => {
  // const history = useHistory();
  
  return (
    <div>
      <ListPosts passedQuery={query} />
    </div>
  );
}

export default HomePage;